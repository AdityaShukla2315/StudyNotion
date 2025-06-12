# MongoDB Installation Script for Windows
$mongodbVersion = "7.0.5"
$downloadUrl = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-$mongodbVersion-signed.msi"
$installerPath = "$env:TEMP\mongodb-installer.msi"

Write-Host "Downloading MongoDB $mongodbVersion..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

Write-Host "Installing MongoDB..."
Start-Process msiexec.exe -ArgumentList "/i $installerPath /quiet /norestart" -Wait

Write-Host "Creating data directory..."
New-Item -ItemType Directory -Force -Path "C:\data\db"

Write-Host "Starting MongoDB service..."
Start-Service MongoDB

Write-Host "MongoDB installation completed!" 