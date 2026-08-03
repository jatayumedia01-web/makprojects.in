$ErrorActionPreference = 'Stop'
$ftpHost = '147.93.99.94'
$ftpUser = 'u364394781.makprojects.in'
$ftpPass = $env:FTP_PASS

function List-Dir($remoteDir) {
  $uri = "ftp://$ftpHost$remoteDir"
  $req = [System.Net.FtpWebRequest]::Create($uri)
  $req.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
  $req.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
  $req.UsePassive = $true
  $resp = $req.GetResponse()
  $reader = New-Object System.IO.StreamReader($resp.GetResponseStream())
  $out = $reader.ReadToEnd()
  $reader.Close(); $resp.Close()
  Write-Host "=== $remoteDir ==="
  Write-Host $out
}

List-Dir '/public_html'
List-Dir '/'
