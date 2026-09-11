# FTP deploy dist/ -> GoDaddy hosting (public_html)
# Credentials via env only - do not commit.
#
# Usage:
#   $env:GODADDY_FTP_HOST = 'sg2plzcpnl487135.prod.sin2.secureserver.net'
#   $env:GODADDY_FTP_USER = 'your-cpanel-user'
#   $env:GODADDY_FTP_PASS = 'your-password'
#   .\deploy-godaddy.ps1

$ErrorActionPreference = 'Stop'
$ftpHost = $env:GODADDY_FTP_HOST
$ftpUser = $env:GODADDY_FTP_USER
$ftpPass = $env:GODADDY_FTP_PASS
$remoteRoot = if ($env:GODADDY_FTP_ROOT) { $env:GODADDY_FTP_ROOT } else { '/public_html' }
$localRoot = Join-Path $PSScriptRoot 'dist'

if (-not $ftpHost) { throw 'GODADDY_FTP_HOST env var is required (e.g. ftp.makprojects.com)' }
if (-not $ftpUser) { throw 'GODADDY_FTP_USER env var is required' }
if (-not $ftpPass) { throw 'GODADDY_FTP_PASS env var is required' }
if (-not (Test-Path $localRoot)) { throw "Missing build folder: $localRoot - run npm run build first" }

function Get-FtpRequest([string]$uri, [string]$method) {
  $req = [System.Net.FtpWebRequest]::Create($uri)
  $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
  $req.Method = $method
  $req.UseBinary = $true
  $req.UsePassive = $true
  $req.KeepAlive = $false
  $req.Timeout = 120000
  return $req
}

function Ensure-FtpDir([string]$remoteDir) {
  if (-not $remoteDir -or $remoteDir -eq '/') { return }
  $parts = $remoteDir.Trim('/').Split('/') | Where-Object { $_ }
  $path = ''
  foreach ($p in $parts) {
    $path = "$path/$p"
    $uri = "ftp://$ftpHost$path"
    try {
      $req = Get-FtpRequest $uri ([System.Net.WebRequestMethods+Ftp]::MakeDirectory)
      $resp = $req.GetResponse()
      $resp.Close()
    } catch {
      # exists
    }
  }
}

function Upload-File([string]$localFile, [string]$remoteFile) {
  $uri = "ftp://$ftpHost$remoteFile"
  $ok = $false
  for ($try = 1; $try -le 3; $try++) {
    try {
      $req = Get-FtpRequest $uri ([System.Net.WebRequestMethods+Ftp]::UploadFile)
      $bytes = [System.IO.File]::ReadAllBytes($localFile)
      $req.ContentLength = $bytes.Length
      $stream = $req.GetRequestStream()
      $stream.Write($bytes, 0, $bytes.Length)
      $stream.Close()
      $resp = $req.GetResponse()
      $resp.Close()
      $ok = $true
      break
    } catch {
      if ($try -eq 3) { throw }
      Start-Sleep -Seconds 2
    }
  }
}

Write-Host "GoDaddy deploy: $localRoot -> ftp://$ftpHost$remoteRoot"
$files = Get-ChildItem -Path $localRoot -Recurse -File
$total = $files.Count
$i = 0
foreach ($f in $files) {
  $i++
  $rel = $f.FullName.Substring($localRoot.Length).Replace('\', '/')
  if (-not $rel.StartsWith('/')) { $rel = "/$rel" }
  $remotePath = "$remoteRoot$rel"
  $remoteDir = Split-Path $remotePath -Parent
  Ensure-FtpDir $remoteDir.Replace('\', '/')
  Write-Host "[$i/$total] $rel"
  Upload-File $f.FullName ($remotePath.Replace('\', '/'))
}
Write-Host "DONE - uploaded $total files to GoDaddy ($remoteRoot)"
