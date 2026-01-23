# PowerShell script to run the website locally and open in browser

Write-Host "Starting Ankita Sharma portfolio site..." -ForegroundColor Cyan

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Check if node_modules exists, if not install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

# Start a background job to open browser after server starts
Write-Host "Starting development server on http://localhost:8080..." -ForegroundColor Cyan
$browserJob = Start-Job -ScriptBlock {
    Start-Sleep -Seconds 4
    Start-Process "http://localhost:8080"
}

# Run npm run dev (this will block and show output)
Write-Host "Opening browser in a few seconds..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev

# Cleanup browser job if still running
if ($browserJob.State -eq "Running") {
    Stop-Job -Job $browserJob
    Remove-Job -Job $browserJob
}

