export function initPnP(contents: string[]): void {
    contents.push('$nugetProvider = Get-PackageProvider -Name "NuGet" -ErrorAction SilentlyContinue')
    contents.push('if($nugetProvider -eq $null) { Write-Host "NuGet package provider has not found. Installing..."; Install-PackageProvider -Name NuGet -Force -Scope CurrentUser -Verbose }')
    contents.push('$pnpModule = Get-InstalledModule -Name "SharePointPnPPowerShellOnline" -ErrorAction SilentlyContinue')
    contents.push('if($pnpModule -eq $null) { Write-Host "PnP-PowerShell module has not installed. Installing...";Install-Module SharePointPnPPowerShellOnline -Force -Scope CurrentUser -Verbose }')
}