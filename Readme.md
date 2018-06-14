# PnP-PowerShell VSTS build step

This build step allows you to easily run [PnP-PowerShell](https://github.com/SharePoint/PnP-PowerShell) script against your SharePoint Online site. 

## Setup  

1. Add `PnP-PowerShell` Script step into your build pipeline:  

    ![image](https://raw.githubusercontent.com/s-KaiNet/vsts-pnp-powershell/master/images/1.png)
2. Some settings are required and need your attention. Leave it as is for now and go to Variables Tab. There you need to enter your username and password information. Click on a 'lock' icon next to the password to hide it from UI:  

    ![image](https://raw.githubusercontent.com/s-KaiNet/vsts-pnp-powershell/master/images/2.png)  
3. When done, go to Tasks tab and fill in missing information (SharePoint site url, credentials, script type). Your resulting configuration should look like in the image below:    

   ![image](https://raw.githubusercontent.com/s-KaiNet/vsts-pnp-powershell/master/images/3.png)  

    **HINT:** You can use your Variables with `$()` special syntax. For example `$(sp_user)` will pass username configured under Variables tab.
4. Use inline script or script file with your [PnP-PowerShell](https://github.com/SharePoint/PnP-PowerShell) code.