---
title: Policy based access control for SAML IdP
updated: true
---
This page describes how to protect a SAML IdP with policies.

## Setup steps

### Enabling the feature

This function is disabled by default. Follow the steps below to enable it.

1. Display the administrator console.
2. Move to `FEDERATION` tab -> `Target IdP` -> `Advanced` tab.
3. Set the following class in the `IDP Adapter Class`.
~~~
jp.co.osstech.oam.saml2.plugins.PolicyCheckIDPAdapter
~~~

![IDP Adapter Class](../images/en/saml2/saml2-policy-idpadapter.png "IDP Adapter Class")

### Defining a new resource type

1. Display the administrator console.
2. Move to `Target realm` -> `Authorization` -> `Resource Types`.
3. Enter each parameter and click the `Create` button. You can set any name for the `Name` (other items are fixed).

| Item | Setting |
|:---------------------|:---------------------------------------------|
| Name | (any) |
| Pattern | idpEntityID=\*&spEntityID=\* |
| Action | IssueAssertion |

![New Resource Type](../images/en/saml2/saml2-policy-resource-type.png "New Resource Type")

### Defining a new policy set

1. Display the administrator console.
2. Move to `Target realm` -> `Authorization` -> `Policy Sets`.
3. Click the `New Provider Policy Set` button.

   ![New Provider Policy Set button](../images/en/saml2/saml2-policy-policyset1.png "New Provider Policy Set button")

4. Enter each parameter and click the `Create` button.

| Item | Setting |
|:---------------------|:---------------------------------------------|
| Id | SAML2ProviderService |
| Name | (any) |
| Resource Types | (The name of the resource type you created) |

![New Provider Policy Set](../images/en/saml2/saml2-policy-policyset2.png "New Provider Policy Set")

### Adding policies to the policy set

1. Display `SAML2ProviderService` created in step of [Defining a new policy set](#Defining-a-new-policy-set).
2. Click the `New Policy` button.
3. Enter each parameter and click the `Create` button.

   | Item | Setting |
   |:---------------------|:---------------------------------------------|
   | Name | (any) |
   | Resource Types | (The name of the resource type you created) |
   | Resources | (Enter entity ID of target IdP and SP) |

   ![New Policy](../images/en/saml2/saml2-policy-policy1.png "New Policy")

4. Set `Actions`, `Subjects`, and `Environments` for the created policy.


