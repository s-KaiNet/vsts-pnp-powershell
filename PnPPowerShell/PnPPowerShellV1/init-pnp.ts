import tl = require('vsts-task-lib/task')

export function initPnP(contents: string[]): void {
    let siteUrl = tl.getInput('spSiteUrl', true)
    let user = tl.getInput('spUser', true)
    let password = tl.getInput('spPassword', true)

    contents.push('$nugetProvider = Get-PackageProvider -Name "NuGet" -ErrorAction SilentlyContinue')
    contents.push('if($nugetProvider -eq $null) {')
    contents.push(' Write-Host "NuGet package provider has not found. Installing..."')
    contents.push(' Install-PackageProvider -Name NuGet -Force -Scope CurrentUser -Verbose')
    contents.push('}')
    contents.push('$pnpModule = Get-InstalledModule -Name "SharePointPnPPowerShellOnline" -ErrorAction SilentlyContinue')
    contents.push('if($pnpModule -eq $null) {')
    contents.push(' Write-Host "PnP-PowerShell module has not installed. Installing..."')
    contents.push(' Install-Module SharePointPnPPowerShellOnline -Force -Scope CurrentUser -Verbose')
    contents.push('}')

    contents.push('Write-Host $siteUrl')
    contents.push('Write-Host $user')
    contents.push('Write-Host $password')

    contents.push('$secstr = New-Object -TypeName System.Security.SecureString')
    contents.push('$password.ToCharArray() | ForEach-Object {$secstr.AppendChar($_)}')
    contents.push('$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $secstr')
    contents.push('Write-Host "Connecting to SharePoint Online. Site url: $($siteUrl). Username: $($username)"')
    contents.push('Connect-PnPOnline -Url $siteUrl -Credentials $cred')
    contents.push('Connected.')
}