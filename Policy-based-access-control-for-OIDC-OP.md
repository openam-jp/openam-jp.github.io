---
title: Policy based access control for OIDC OP
---
This page describes how to protect OIDC OP with policies.

## Setup steps

### Enabling the feature

This function is disabled by default. Follow the steps below to enable it.

1. Display the administrator console.
2. Move to `Target realm` -> `Agents` -> `OAuth 2.0/OpenID Connect Client` tab -> `Target client`.
3. Check `Policy Based Endpoint Protection` and click the` Save` button.

![Enabling OIDC policy protection](../images/en/oidc-oauth2/oidc-policy-enable.png "Enabling OIDC policy protection")

### Defining a new resource type

1. Display the administrator console.
2. Move to `Target realm` -> `Authorization` -> `Resource Types`.
3. Enter each parameter and click the `Create` button. You can set any name for the `Name` (other items are fixed).

| Item | Setting |
|:---------------------|:---------------------------------------------|
| Name | (any) |
| Pattern | client_id=\* |
| Action | IssueToken |

![New Resource Type](../images/en/oidc-oauth2/oidc-policy-resource-type.png "New Resource Type")

### Defining a new policy set

1. Display the administrator console.
2. Move to `Target realm` -> `Authorization` -> `Policy Sets`.
3. Click the `New Provider Policy Set` button.

   ![New Provider Policy Set button](../images/en/oidc-oauth2/oidc-policy-policyset1.png "New Provider Policy Set button")

4. Enter each parameter and click the `Create` button.

| Item | Setting |
|:---------------------|:---------------------------------------------|
| Id | OAuthClientService |
| Name | (any) |
| Resource Types | (The name of the resource type you created) |

![New Provider Policy Set](../images/en/oidc-oauth2/oidc-policy-policyset2.png "New Provider Policy Set")


### Adding policies to the policy set

1. Display `OAuthClientService` created in step of [Defining a new policy set](#Defining-a-new-policy-set).
2. Click the `New Policy` button.
3. Enter each parameter and click the `Create` button.

   | Item | Setting |
   |:---------------------|:---------------------------------------------|
   | Name | (any) |
   | Resource Types | (The name of the resource type you created) |
   | Resources | (Client ID of target RP) |

   ![New Policy](../images/en/oidc-oauth2/oidc-policy-policy1.png "New Policy")

4. Set `Actions`, `Subjects`, and `Environments` for the created policy.


