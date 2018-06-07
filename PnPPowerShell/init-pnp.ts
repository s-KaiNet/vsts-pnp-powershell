export function initPnP(contents: string[]): void {
    contents.push('Install-PackageProvider -Name NuGet -Force -Scope CurrentUser')
    contents.push('Install-Module SharePointPnPPowerShellOnline -Force -Verbose -Scope CurrentUser')
}