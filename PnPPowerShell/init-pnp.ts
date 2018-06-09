export function initPnP(contents: string[]): void {
    contents.push('$nugetProvider = Get-PackageProvider -Name "NuGet" -ErrorAction SilentlyContinue')
    contents.push('if($nugetProvider -eq $null) { Install-PackageProvider -Name NuGet -Force -Scope CurrentUser }')
    contents.push('$pnpModule = Get-InstalledModule -Name "SharePointPnPPowerShellOnline" -ErrorAction SilentlyContinue')
    contents.push('if($pnpModule -eq $null) { Install-Module SharePointPnPPowerShellOnline -Force -Scope CurrentUser }')
}