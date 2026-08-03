# FTP deploy dist/ -> FTP home (Hostinger web root for this account)
# This FTP user already lands in the site root; do NOT nest under /public_html.
# Credentials via env only — do not commit.

$ErrorActionPreference = 'Stop'
$ftpHost = '147.93.99.94'
$ftpUser = 'u364394781.makprojects.in'
$ftpPass = $env:FTP_PASS
$localRoot = Join-Path $PSScriptRoot 'dist'
$remoteRoot = ''

if (-not $ftpPass) { throw 'FTP_PASS env var is required' }
if (-not (Test-Path $localRoot)) { throw "Missing build folder: $localRoot" }

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
  $parts = $remoteDir.Trim('/').Split('/') | Where-Object { $_ }
  $path = ''
  foreach ($p in $parts) {
    $path = "$path/$p"
    $uri = "ftp://$ftpHost$path"
    try {
      $req = Get-FtpRequest $uri ([System.Net.WebRequestMethods+Ftp]::MakeDirectory)
      $resp = $req.GetResponse()
      $resp.Close()
      Write-Host "MKDIR $path"
    } catch {
      # exists
    }
  }
}

function Upload-File([string]$localFile, [string]$remoteFile) {
  $uri = "ftp://$ftpHost$remoteFile"
  $req = Get-FtpRequest $uri ([System.Net.WebRequestMethods+Ftp]::UploadFile)
  $bytes = [System.IO.File]::ReadAllBytes($localFile)
  $req.ContentLength = $bytes.Length
  $stream = $req.GetRequestStream()
  $stream.Write($bytes, 0, $bytes.Length)
  $stream.Close()
  $resp = $req.GetResponse()
  $resp.Close()
}

Write-Host "Uploading from $localRoot to ftp://$ftpHost$remoteRoot ..."
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
Write-Host "DONE - uploaded $total files"
