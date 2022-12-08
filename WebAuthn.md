---
title: WebAuthn
---
This page describes how to use the WebAuthn authentication module.

## Introduction

### Module Structure

In FIDO2, there are two sequences: `Registration` of authentication device and `Authentication` using authentication device.

WebAuthn authentication follows these sequences and is divided into two modules: WebAuthn (Registration) and WebAuthn (Authentication).

By including them in the authentication chain of OpenAM, it is possible to combine different authentication for "registration" and "authentication".

### LDAP Directory Structure

Traditionally, OpenAM stores authentication device information as user attributes (such as FR OATH authentication).

However, WebAuthn authentication stores the authentication device in a different directory than the user.

~~~
ou=example,ou=com
 │
 ├─ou=Users <- User storage location
 │  ├─uid=user1
 │  ├─uid=user2
 │  └─uid=user3
 │  
 └─ou=Credentials <- Authentication device storage location
    ├─fido2CredentialID=XXXXXXXXXXX
    ├─fido2CredentialID=XXXXXXXXXXX
    └─fido2CredentialID=XXXXXXXXXXX
~~~

The entryUUID attribute associates the user entry with the authentication device entry.

The following example shows that user1 has two authenticating devices and user3 has one authenticating device (user2 does not own).

~~~
ou=example,ou=com
 │
 ├─ou=Users
 │  ├─uid=user1
 │  │  └─entryUUID: 1f23ab57-8391-4d81-8799-6538fe6d06c7
 │  ├─uid=user2
 │  │  └─entryUUID: 639c7d57-ac06-3493-8faf-54650b3a383c
 │  └─uid=user3
 │     └─entryUUID: f01f029a-4908-48da-96e1-28171a98f423
 │  
 └─ou=Credentials
    ├─fido2CredentialID=XXXXXXXXXXX <- user1
    │  └─fido2UserID: 1f23ab57-8391-4d81-8799-6538fe6d06c7
    ├─fido2CredentialID=XXXXXXXXXXX <- user1
    │  └─fido2UserID: 1f23ab57-8391-4d81-8799-6538fe6d06c7
    └─fido2CredentialID=XXXXXXXXXXX <- user3
       └─fido2UserID: f01f029a-4908-48da-96e1-28171a98f423
~~~

## Use Case

The use cases for WebAuthn authentication are shown below. Authentication module settings vary depending on the use case.

| Use Case | Description |
|:---------------------|:---------------------------------------------|
| [Passwordless authentication](#Set-up-as-passwordless-authentication) | Authenticate with ID and authentication device by FIDO2. |
| [Multi-factor authentication](#Set-up-as-multi-factor-authentication) | FIDO2 is used as a multi-factor authentication in combination with ID / password authentication. |
| [Usernameless authentication](#Set-up-as-usernameless-authentication) | Authenticate only with the FIDO2 authentication device (Resident Key) that stores the user handle. |

The use cases shown here are for the `authentication` sequence. This document does not mention the use case of the `registration` sequence.
In this document, WebAuthn (registration) is used in combination with data store authentication (ID / password authentication).


## Preparation

Before introducing WebAuthn authentication, the following preparations are required on the OpenAM server.

* OpenAM server is running over HTTPS.
* OpenAM initial settings are complete.
* The LDAP attribute used for WebAuthn authentication is permitted in the user data store setting.
* Prepare directory server for authentication device.

### The user data store setting

As already mentioned, user entry and authentication device entry are linked by entryUUID attribute. Therefore, entryUUID must be allowed in the user data store.

Note that this setting is not required when using embeded OpenDJ as a user data store for test purposes.

1. Log in to OpenAM as an administrator user.
2. Move to `the target realm` -> `Data Stores` -> `The target data store`.
3. Add entryUUID to `LDAP User Attributes` and click `Save` button.

### The Directory server for authentication devices

Prepare a directory server for the authentication device. Usually, it is assumed to be used together with an LDAP server for users.

The authentication device directory server must implement an LDAP schema for the authentication device. By default, [this schema](https://github.com/osstech-jp/fido2-ldap-demo/blob/master/ldap/fido2.schema) is assumed to be used.

Note that this setting is not required when using the embeded OpenDJ as an authentication device directory server for test purposes.

### The authentication device storage location

Prepare an entry for the authentication device storage location.

In this document, `ou=Credentials,dc=openam,dc=jp` is used.

## Set up as passwordless authentication

This chapter shows the procedure for introducing WebAuthn authentication as passwordless authentication.

### Set up WebAuthn Authenticator Service

In order to operate the WebAuthn authentication module, it is necessary to create a WebAuthn Authenticator service and specify the directory server and LDAP object / attribute to store the authentication device.

1. Log in to OpenAM as an administrator user.
2. Move to `the target realm` -> `Services`.
3. Click `Add a Service` button.
4. Select `WebAuthn Authenticator Service` for `Service Type` and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters. When using the embeded OpenDJ, be sure to enter the `Bind User Password`.

| Item | Example |
|:---------------------|:---------------------------------------------|
| Authenticator Object Class | fido2Credential, top |
| Credential ID Attribute | fido2CredentialID |
| Credential Public Key Attribute | fido2PublicKey |
| Credential Name Attribute | fido2CredentialName |
| Signature Counter Attribute | fido2SignCount |
| User Handle Attribute | fido2UserID |
| Primary LDAP Server | ldap.example.co.jp:389 |
| Base DN | ou=Credentials,dc=openam,dc=jp |
| Bind User DN | cn=amuser,dc=openam,dc=jp |
| Bind User Password | `Enter the bind user password` |
| LDAP Connection Mode | LDAP |

### Configure the WebAuthn (Registration) module

Create an instance of the WebAuthn (Registration) module and create an authentication chain for registration.

1. Log in to OpenAM as an administrator user.
2. Move to `Target realm` -> `Authentication` -> `Modules`
3. Click `Add Module` button
4. Here, enter `registerModule` in Name, select `WebAuthn (Registration)` in Type, and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters.

   | Item | Example |
   |:---------------------|:---------------------------------------------|
   | Relying Party Name | OpenAM |
   | Origin | https://openam.example.co.jp:443 |
   | Attestation | none |
   | Attachment | undefined |
   | Require Resident Key | false |
   | User Verification | preferred |
   | Timeout(milliseconds) | 60000 |
   | Display Name Attribute | cn |
   | Maximum number of authentication devices | 3 |
   | Authentication Level | 0 |

6. Move to `Authentication` -> `Chains` from the left menu.
7. Click `Add Chain` button.
8. Enter `registerService` in Name here, and click the `Create` button.
9. The authentication chain setting screen is displayed. Click the `Add a module` button.
10. Select `DataStore` from the `Select Module` pull-down, select `Requisuite` for `Select Criteria`, and click the `OK` button.
11. Click the `Add a Module` button again.
12. Select `registerModule` from the `Select Module` pull-down, select `Required` for `Select Criteria` and click the `OK` button.
13. When you return to the authentication chain setting screen, click the `Save Changes` button.

### Configure the WebAuthn (Authentication) module

Create an instance of the WebAuthn (Authenticaton) module and create an authentication chain for authentication.

1. Log in to OpenAM as an administrator user.
2. Move to `Target realm` -> `Authentication` -> `Modules`
3. Click `Add Module` button
4. Here, enter `pwdLessModule` in Name, select `WebAuthn (Authentication)` in Type, and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters.

   | Item | Example |
   |:---------------------|:---------------------------------------------|
   | Relying Party Name | OpenAM |
   | Origin | https://openam.example.co.jp:443 |
   | Use for Resident Key | false |
   | User Verification | preferred |
   | Timeout(milliseconds) | 60000 |
   | Use for MFA | false |
   | Display Name Attribute | cn |
   | Authentication Level | 0 |

6. Move to `Authentication` -> `Chains` from the left menu.
7. Click `Add Chain` button.
8. Enter `pwdLessService` in Name here, and click the `Create` button.
9. The authentication chain setting screen is displayed. Click the `Add a module` button.
10. Select `pwdLessModule` from the `Select Module` pull-down, select `Required` for `Select Criteria` and click the `OK` button.
11. When you return to the authentication chain setting screen, click the `Save Changes` button.

### Operation (passwordless authentication)

#### Register an authentication device

Register the authentication device by running the authentication chain for registration.

1. Access the following URL in a browser that supports WebAuthn:
  * https://openam.example.co.jp/openam/UI/Login?service=registerService

2. The login screen will be displayed. Enter your `user name` / `password` and click the "LOG IN" button.

3. A pop-up appears in the browser. Follow the instructions on the browser to operate the authentication device.

4. If the registration process is successful, the message `PublicKey Registration Complete. Enter Credential DisplayName(optional)` will be displayed. Enter the identification name of the authentication device and click the `NEXT` button.

5. An user session is created and the user profile screen is displayed.

#### Authenticate with an authentication device

Authenticate with the authentication device by operating the authentication chain for authentication.

1. Access the following URL in a browser that supports WebAuthn:
  * https://openam.example.co.jp/openam/UI/Login?service=pwdLessService

2. The login screen will be displayed. Enter the user name and click the "LOG IN" button.

3. A pop-up appears in the browser. Follow the instructions on the browser to operate the authentication device.

4. If the authentication is successful, an user session is issued and the user profile screen is displayed.

## Set up as multi-factor authentication

This chapter shows the procedure for introducing WebAuthn authentication as multi-factor authentication.

### Set up WebAuthn Authenticator Service

In order to operate the WebAuthn authentication module, it is necessary to create a WebAuthn Authenticator service and specify the directory server and LDAP object / attribute to store the authentication device.

The procedure and settings are the same as 「[Set up WebAuthn Authenticator Service](#Set-up-WebAuthn-Authenticator-Service)」.
If you have already done so, go to the next step.

### Configure the WebAuthn (Registration) module

Create an instance of the WebAuthn (Registration) module and create an authentication chain for registration.

The procedure and settings are the same as 「[Configure the WebAuthn (Registration) module](#Configure-the-WebAuthn-(Registration)-module)」.
If you have already done so, go to the next step.

### Configure the WebAuthn (Authentication) module

Create an instance of the WebAuthn (Authenticaton) module and create an authentication chain for authentication.

1. Log in to OpenAM as an administrator user.
2. Move to `Target realm` -> `Authentication` -> `Modules`
3. Click `Add Module` button
4. Here, enter `mfaModule` in Name, select `WebAuthn (Authentication)` in Type, and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters.

   | Item | Example |
   |:---------------------|:---------------------------------------------|
   | Relying Party Name | OpenAM |
   | Origin | https://openam.example.co.jp:443 |
   | Use for Resident Key | false |
   | User Verification | preferred |
   | Timeout(milliseconds) | 60000 |
   | Use for MFA | true |
   | Display Name Attribute | cn |
   | Authentication Level | 0 |

6. Move to `Authentication` -> `Chains` from the left menu.
7. Click `Add Chain` button.
8. Enter `mfaService` in Name here, and click the `Create` button.
9. The authentication chain setting screen is displayed. Click the `Add a module` button.
10. Select `DataStore` from the `Select Module` pull-down, select `Requisuite` for `Select Criteria` and click the `OK` button.
11. Click the `Add a module` button again.
12. Select `mfaModule` from the `Select Module` pull-down, select `Required` for `Select Criteria` and click the `OK` button.
13. When you return to the authentication chain setting screen, click the `Save Changes` button.

### Operation (Multi-factor authentication)

#### Register an authentication device

Register the authentication device by running the authentication chain for registration.

The procedure and settings are the same as 「[Register an authentication device](#Register-an-authentication-device)」.
If you have already done so, go to the next step.

#### Authenticate with an authentication device

Authenticate with the authentication device by operating the authentication chain for authentication.

1. Access the following URL in a browser that supports WebAuthn:
  * https://openam.example.co.jp/openam/UI/Login?service=mfaService

2. The login screen will be displayed. Enter your `user name` / `password` and click the "LOG IN" button.

3. A pop-up appears in the browser. Follow the instructions on the browser to operate the authentication device.

4. If the authentication is successful, an user session is issued and the user profile screen is displayed.

## Set up as usernameless authentication

This chapter shows the procedure for introducing WebAuthn authentication as usernameless authentication.

### Set up WebAuthn Authenticator Service

In order to operate the WebAuthn authentication module, it is necessary to create a WebAuthn Authenticator service and specify the directory server and LDAP object / attribute to store the authentication device.

The procedure and settings are the same as 「[Set up WebAuthn Authenticator Service](#Set-up-WebAuthn-Authenticator-Service)」.
If you have already done so, go to the next step.

### Configure the WebAuthn (Registration) module

Create an instance of the WebAuthn (Registration) module and create an authentication chain for registration.

1. Log in to OpenAM as an administrator user.
2. Move to `Target realm` -> `Authentication` -> `Modules`
3. Click `Add Module` button
4. Here, enter `residentRegisterModule` in Name, select `WebAuthn (Registration)` in Type, and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters.

   | Item | Example |
   |:---------------------|:---------------------------------------------|
   | Relying Party Name | OpenAM |
   | Origin | https://openam.example.co.jp:443 |
   | Attestation | none |
   | Attachment | undefined |
   | Require Resident Key | true |
   | User Verification | preferred |
   | Timeout(milliseconds) | 60000 |
   | Display Name Attribute | cn |
   | Maximum number of authentication devices | 3 |
   | Authentication Level | 0 |

6. Move to `Authentication` -> `Chains` from the left menu.
7. Click `Add Chain` button.
8. Enter `residentRegisterService` in Name here, and click the `Create` button.
9. The authentication chain setting screen is displayed. Click the `Add a module` button.
10. Select `DataStore` from the `Select Module` pull-down, select `Requisuite` for `Select Criteria`, and click the `OK` button.
11. Click the `Add a Module` button again.
12. Select `residentRegisterModule` from the `Select Module` pull-down, select `Required` for `Select Criteria` and click the `OK` button.
13. When you return to the authentication chain setting screen, click the `Save Changes` button.

### Configure the WebAuthn (Authentication) module

Create an instance of the WebAuthn (Authenticaton) module and create an authentication chain for authentication.

1. Log in to OpenAM as an administrator user.
2. Move to `Target realm` -> `Authentication` -> `Modules`
3. Click `Add Module` button
4. Here, enter `residentModule` in Name, select `WebAuthn (Authentication)` in Type, and click the `Create` button.
5. Enter each parameter and click `Save Changes`. The following are examples of parameters.

   | Item | Example |
   |:---------------------|:---------------------------------------------|
   | Relying Party Name | OpenAM |
   | Origin | https://openam.example.co.jp:443 |
   | Use for Resident Key | true |
   | User Verification | preferred |
   | Timeout(milliseconds) | 60000 |
   | Use for MFA | false |
   | Display Name Attribute | cn |
   | Authentication Level | 0 |

6. Move to `Authentication` -> `Chains` from the left menu.
7. Click `Add Chain` button.
8. Enter `residentService` in Name here, and click the `Create` button.
9. The authentication chain setting screen is displayed. Click the `Add a module` button.
10. Select `residentModule` from the `Select Module` pull-down, select `Required` for `Select Criteria` and click the `OK` button.
11. When you return to the authentication chain setting screen, click the `Save Changes` button.

### Operation (usernameless authentication)

#### Register an authentication device

Register the authentication device by running the authentication chain for registration.
It is the same as 「[Register an authentication device](#Register-an-authentication-device)」 except URL to access.

* https://openam.example.co.jp/openam/UI/Login?service=residentRegisterService

#### Authenticate with an authentication device

Authenticate with the authentication device by operating the authentication chain for authentication.

1. Access the following URL in a browser that supports WebAuthn:
  * https://openam.example.co.jp/openam/UI/Login?service=residentService

2. A pop-up appears in the browser. Select the user to authenticate or the authentication device to use.

3. Follow the instructions on the browser to operate the authentication device.

4. If the authentication is successful, an user session is issued and the user profile screen is displayed.

## Manage authentication devices

This chapter describes how to manage authentication devices.

### Display authenticated devices

The authentication device can be displayed on the user's dashboard screen.

1. Authenticate with OpenAM and display the user profile screen.

2. Click on `DASHBOARD` at the top left of the screen.

3. Scroll the dashboard screen, there is `FIDO2(WebAuthn) Authentication Devices` section, then you can check the registered authentication device.

### Check the authentication device information

In addition to the name of the authentication device, you can check the registration date and time.
Please refer to this when deleting an authentication device.

1. The authentication device is displayed by the procedure of 「[Display authenticated devices](#Display-authenticated-devices)」.

2. Click the device icon, you can display the device name and registration date and time.

### Deleting authentication devices

Authentication devices can be deleted on the user's dashboard screen.

1. The authentication device is displayed by the procedure of 「[Display authenticated devices](#Display-authenticated-devices)」.

2. Click on the upper right corner of the device icon and click on the Delete menu.

