---
description: How to configure CIPP after you've completed installation.
---

# Post-Install Configuration

At this point you should have completed all the steps in the installation guide and your deployment has succeeded. Any Red cross means your deployment has failed and you will need to delete the resource group and try deployment again.

you must now follow the rest of these steps to allow yourself to access CIPP, and finish setup.

### Add yourself as a user

* Go to the Azure Portal.
* Go to your CIPP Resource Group.
* Select your CIPP Static Web App `CIPP-SWA-XXXX`.
* Select **Role Management** (Not IAM Role Management).
* Select **invite user**.
* Enter the UPN for your user. This must match your M365 UPN.
* Add the `admin` role for your user.

After logging in succesfully, you may move on to the next part of setup by clicking the button below.

{% hint style="info" %} It is completely normal to see errors when you first log into the portal. Please continue following the documentation step by step.  {% endhint %}
