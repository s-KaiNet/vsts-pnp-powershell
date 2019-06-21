import tl = require('vsts-task-lib/task')

export function initPnP(contents: string[]): void {
  let siteUrl = tl.getInput('spSiteUrl', true)
  let user = tl.getInput('spUser', true)
  let password = tl.getInput('spPassword', true)
  let pnpVersion = tl.getInput('pnpVersion')
  let spVersion = tl.getInput('spVersion', true)

  contents.push('$nugetProvider = Get-PackageProvider -Name "NuGet" -ErrorAction SilentlyContinue')

  contents.push('if($nugetProvider -eq $null) {')
  contents.push(' Write-Host "NuGet package provider has not found. Installing..."')
  contents.push(' Install-PackageProvider -Name NuGet -Force -Scope CurrentUser -Verbose')
  contents.push('} else {')
  contents.push(' Write-Host "Found NuGet package provider"')
  contents.push('}')

  contents.push(`$pnpModule = Get-InstalledModule -Name ${getModuleName(spVersion)} -ErrorAction SilentlyContinue`)

  contents.push('if($pnpModule -eq $null) {')
  contents.push(' Write-Host "PnP-PowerShell module has not installed. Installing..."')

  // install specific version if provided
  if (pnpVersion) {
    contents.push(` Install-Module ${getModuleName(spVersion)} -Force -Scope CurrentUser -RequiredVersion ${pnpVersion} -Verbose`)
  } else {
    contents.push(` Install-Module ${getModuleName(spVersion)} -Force -Scope CurrentUser -Verbose`)
  }

  contents.push('} else {')
  contents.push(` Write-Host "Found ${getModuleName(spVersion)} module"`)
  contents.push(` Write-Host "Importing ${getModuleName(spVersion)} module"`)
  contents.push(` Import-Module ${getModuleName(spVersion)}`)
  contents.push('}')

  contents.push(`$siteUrl = '${siteUrl}'`)
  contents.push(`$username = '${user}'`)
  contents.push(`$password = '${password}'`)

  contents.push('$secstr = New-Object -TypeName System.Security.SecureString')
  contents.push('$password.ToCharArray() | ForEach-Object {$secstr.AppendChar($_)}')
  contents.push('$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist $username, $secstr')
  contents.push('Write-Host "Connecting to SharePoint Online. Site url: $($siteUrl). Username: $($username)"')
  contents.push('Connect-PnPOnline -Url $siteUrl -Credentials $cred')
  contents.push('Write-Host "Connected."')
}

function getModuleName(spVersion: string): string {
  switch (spVersion) {
    case 'sponline':
      return 'SharePointPnPPowerShellOnline'
    case 'sp2013':
      return 'SharePointPnPPowerShell2013'
    case 'sp2016':
      return 'SharePointPnPPowerShell2016'
    case 'sp2019':
      return 'SharePointPnPPowerShell2019'
  }
}
