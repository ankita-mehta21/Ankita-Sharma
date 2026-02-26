# Runs the portfolio website locally in development mode.

Write-Host "Starting local development server..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..." -ForegroundColor Yellow
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Dependency installation failed." -ForegroundColor Red
    exit 1
  }
}

$localUrl = "http://localhost:8080"
Write-Host "Launching browser at $localUrl ..." -ForegroundColor Green

$browserJob = Start-Job -ScriptBlock {
  param($url)
  Start-Sleep -Seconds 4
  Start-Process $url
} -ArgumentList $localUrl

Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
npm run dev

if ($browserJob.State -eq "Running") {
  Stop-Job -Job $browserJob | Out-Null
}
Remove-Job -Job $browserJob -Force -ErrorAction SilentlyContinue
