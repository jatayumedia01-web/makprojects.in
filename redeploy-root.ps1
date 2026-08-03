$ErrorActionPreference = 'Stop'
$ftpHost = '147.93.99.94'
$ftpUser = 'u364394781.makprojects.in'
$ftpPass = $env:FTP_PASS
if (-not $ftpPass) { throw 'FTP_PASS required' }

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

# Remove Hostinger default landing so index.html wins
try {
  $req = Get-FtpRequest "ftp://$ftpHost/default.php" ([System.Net.WebRequestMethods+Ftp]::DeleteFile)
  $resp = $req.GetResponse(); $resp.Close()
  Write-Host 'Deleted /default.php'
} catch {
  Write-Host "default.php delete: $($_.Exception.Message)"
}

Write-Host 'Redeploying dist to FTP root...'
& "$PSScriptRoot\deploy-ftp.ps1"
