---
title: OpenAM 14.0.0
---
リリース日 : 2019 年 12 月 23 日

## 新機能

### WebAuthn 認証モジュール

OpenAM 14 では WebAuthn 準拠の認証モジュールを新たに提供します。この認証モジュールは登録用のモジュールである`WebAuthn(登録)`と認証用のモジュールである`WebAuthn(認証)`の 2 つで構成されています。`WebAuthn(登録)`で登録したデバイスを`WebAuthn(認証)`に対して利用することでパスワードレス認証を実現できます。

詳細は[WebAuthn](../../ja/WebAuthn/)をご確認下さい。

なお、本機能は以下の Issue と関連しています。

 - [#62](https://github.com/openam-jp/openam/issues/62) WebAuthn Authentication Module

### SAML2 / OIDC 認可機能

OpenAM 14 では SAML 2.0 の IdP や OpenID Connect の OP のエンドポイントに対してポリシーによるアクセス制御機能が追加されました。従来、一部のサービスプロバイダーやリライングパーティに対してより強固な認証を求める要件では、サービスプロバイダーやリライングパーティ自身が対応する要求を行う必要があり、IdP 側で一貫した制御は困難でした。本機能を利用することで OpenAM が各 SP、RP に対する認証強度を制御することができます。

詳細は[SAML IdP のポリシーベースアクセス制御](../../ja/Policy-based-access-control-for-SAML-IdP/)もしくは[OIDC OP のポリシーベースアクセス制御](../../ja/Policy-based-access-control-for-OIDC-OP/)をご覧ください。

なお、本機能は以下の Issue と関連しています。

 - [#90](https://github.com/openam-jp/openam/issues/90) Policy based access control for OIDC OP
 - [#89](https://github.com/openam-jp/openam/issues/89) Policy based access control for SAML IdP

### OpenJDK 11 対応

OpenAM 14 ではビルド環境／実行環境として OpenJDK 11 を新たにサポートします。

なお、本機能は以下の Issue と関連しています。

 - [#33](https://github.com/openam-jp/openam/issues/33) Upgrade unit testing frameworks to support Java 11
 - [#32](https://github.com/openam-jp/openam/issues/32) Java11 Support

## バグ修正及びエンハンス

 - [#195](https://github.com/openam-jp/openam/issues/195) Tab UI selection is not highlighted on some screens
 - [#188](https://github.com/openam-jp/openam/issues/188) Broken layout of setup screen 
 - [#187](https://github.com/openam-jp/openam/issues/187) Document URL
 - [#186](https://github.com/openam-jp/openam/issues/186) Japanese localization of upgrade screen
 - [#137](https://github.com/openam-jp/openam/issues/137) Display of authentication failure screen is unstable
 - [#135](https://github.com/openam-jp/openam/issues/135) Branding
 - [#131](https://github.com/openam-jp/openam/issues/131) OATH authentication module(not FR OATH) does not work in Japanese locale
 - [#121](https://github.com/openam-jp/openam/issues/121) Can not create a new realm when using IE11
 - [#115](https://github.com/openam-jp/openam/issues/115) Audit Event Handler ignores realm-based log configurations
 - [#110](https://github.com/openam-jp/openam/issues/110) ForgeRock AM/OpenAM Security Advisory #201901-08: Open Redirect and Potential XSS
 - [#109](https://github.com/openam-jp/openam/issues/109) ForgeRock AM/OpenAM Security Advisory #201901-07: Business Logic Vulnerability
 - [#108](https://github.com/openam-jp/openam/issues/108) ForgeRock AM/OpenAM Security Advisory #201901-06: Open Redirect
 - [#106](https://github.com/openam-jp/openam/issues/106) ForgeRock AM/OpenAM Security Advisory #201901-04: Security Misconfiguration
 - [#105](https://github.com/openam-jp/openam/issues/105) ForgeRock AM/OpenAM Security Advisory #201901-03: Cross Site Scripting
 - [#92](https://github.com/openam-jp/openam/issues/92) AMUncaughtException occurs in Google Apps settings if there are host IDPs and COTs only in other realms
 - [#91](https://github.com/openam-jp/openam/issues/91) AMUncaughtException occurs in the configuration screen for Google Apps
 - [#88](https://github.com/openam-jp/openam/issues/88) Expired Token remains in CTS
 - [#87](https://github.com/openam-jp/openam/issues/87) XUI accesses authentication REST API with `=undefined`
 - [#85](https://github.com/openam-jp/openam/issues/85) Some JSPs redirect to showServerConfig.jsp
 - [#84](https://github.com/openam-jp/openam/issues/84) Authentication chaining does not work if the user search attribute of the LDAP authentication module does not match that of the data store
 - [#83](https://github.com/openam-jp/openam/issues/83) OpenID Connect authentication fails if jwks_uri content contains x5c
 - [#82](https://github.com/openam-jp/openam/issues/82) Support RS384/RS512 signature algorithm for ID token
 - [#81](https://github.com/openam-jp/openam/issues/81) Unable to change settings due to changelogDb issue of embedded DJ
 - [#80](https://github.com/openam-jp/openam/issues/80) Authentication bypass
 - [#77](https://github.com/openam-jp/openam/issues/77) ForgeRock AM/OpenAM Security Advisory #201801-12: Content Spoofing Vulnerability
 - [#76](https://github.com/openam-jp/openam/issues/76) ForgeRock AM/OpenAM Security Advisory #201801-11: Business Logic Vulnerability
 - [#75](https://github.com/openam-jp/openam/issues/75) ForgeRock AM/OpenAM Security Advisory #201801-10: LDAP Injection Vulnerability
 - [#74](https://github.com/openam-jp/openam/issues/74) ForgeRock AM/OpenAM Security Advisory #201801-09: Business Logic Vulnerability
 - [#73](https://github.com/openam-jp/openam/issues/73) ForgeRock AM/OpenAM Security Advisory #201801-08: Business Logic Vulnerability
 - [#72](https://github.com/openam-jp/openam/issues/72) ForgeRock AM/OpenAM Security Advisory #201801-07: Information Leakage
 - [#71](https://github.com/openam-jp/openam/issues/71) ForgeRock AM/OpenAM Security Advisory #201801-06: Business Logic Vulnerability
 - [#70](https://github.com/openam-jp/openam/issues/70) ForgeRock AM/OpenAM Security Advisory #201801-05: Business Logic Vulnerability
 - [#69](https://github.com/openam-jp/openam/issues/69) ForgeRock AM/OpenAM Security Advisory #201801-04: Open Redirect
 - [#68](https://github.com/openam-jp/openam/issues/68) ForgeRock AM/OpenAM Security Advisory #201801-03: Cross Site Scripting
 - [#67](https://github.com/openam-jp/openam/issues/67) ForgeRock AM/OpenAM Security Advisory #201801-02: Configuration password stored in plain text
 - [#66](https://github.com/openam-jp/openam/issues/66) ForgeRock AM/OpenAM Security Advisory #201801-01: Business Logic Vulnerability
 - [#64](https://github.com/openam-jp/openam/issues/64) ForgeRock OpenAM Security Advisory #201608-01: Open Redirect
 - [#61](https://github.com/openam-jp/openam/issues/61) OAuth2 consent page ignores Accept-Language
 - [#60](https://github.com/openam-jp/openam/issues/60) Support RSA-OAEP for SAML Assertion Encryption
 - [#58](https://github.com/openam-jp/openam/issues/58) Unexpected screen is displayed when the authentication chain fails
 - [#57](https://github.com/openam-jp/openam/issues/57) Session is destroyed when session upgrade fails
 - [#55](https://github.com/openam-jp/openam/issues/55) Make issuing FR OATH recovery code optional
 - [#54](https://github.com/openam-jp/openam/issues/54) Can not edit policy using IE11
 - [#53](https://github.com/openam-jp/openam/issues/53) Groovy script causes infinite loop
 - [#52](https://github.com/openam-jp/openam/issues/52) Japanese localization of OATH authentication (FR OATH)
 - [#50](https://github.com/openam-jp/openam/issues/50) Deleting an instance of the authentication module registered by default also deletes the authentication modules of the same type
 - [#49](https://github.com/openam-jp/openam/issues/49) When using client secret for signature in OAuth2/OIDC authentication module, it is necessary to set client secret in two fields
 - [#47](https://github.com/openam-jp/openam/issues/47) Local authentication ignores Accept-Language
 - [#45](https://github.com/openam-jp/openam/issues/45) Authentication process can not continue if local authentication fails in SAML2 authentication
 - [#44](https://github.com/openam-jp/openam/issues/44) OAuth 2.0 client should support client_secret_basic
 - [#43](https://github.com/openam-jp/openam/issues/43) Japanese localization of admin screen
 - [#42](https://github.com/openam-jp/openam/issues/42) acr_values not working if the user is login in more than one chain
 - [#41](https://github.com/openam-jp/openam/issues/41) Add option to use local time zone instead of UTC in audit logging
 - [#40](https://github.com/openam-jp/openam/issues/40) SAML2 authentication does not work when SAML2 failover is enabled.
 - [#39](https://github.com/openam-jp/openam/issues/39) Information for single logout stored in CTS is not updated
 - [#36](https://github.com/openam-jp/openam/issues/36) Remove dependency on ForgeRock Maven repositories
 - [#34](https://github.com/openam-jp/openam/issues/34) Open redirect vulnerability in OAuth 2.0
 - [#30](https://github.com/openam-jp/openam/issues/30) Auth Error messages ignore Accept-Language
 - [#29](https://github.com/openam-jp/openam/issues/29) JavaMail debug logs are output to stdout.
 - [#26](https://github.com/openam-jp/openam/issues/26) Error is output to CoreSystem if monitoring is disabled
 - [#24](https://github.com/openam-jp/openam/issues/24) Upgrade Commons FileUpload library to the new version
 - [#21](https://github.com/openam-jp/openam/issues/21) Upgrade Jackson library to the new version.
 - [#16](https://github.com/openam-jp/openam/issues/16) An improper session management vulnerability in user self-service
 - [#15](https://github.com/openam-jp/openam/issues/15) Provide templates for contributions
 - [#14](https://github.com/openam-jp/openam/issues/14) Persistent search does not recover
 - [#13](https://github.com/openam-jp/openam/issues/13) The order of items breaks on OAuth2.0/OIDC auth module setting page.
 - [#12](https://github.com/openam-jp/openam/issues/12) User remains on 'Loading' page if using 'OAuth2.0/OIDC' auth module and authId token expires
 - [#10](https://github.com/openam-jp/openam/issues/10) Finish button of Identity Provider wizard doesn't work
 - [#7](https://github.com/openam-jp/openam/issues/7) ForceAuth cause JSON callbacks error
 - [#6](https://github.com/openam-jp/openam/issues/6) Search Timeout for LDAP filter condition should be in seconds
 - [#5](https://github.com/openam-jp/openam/issues/5) Goto URL with multiple query string parameters incorrectly decoded
 - [#3](https://github.com/openam-jp/openam/issues/3) XUI does not enable Secure cookie flags for SSO tracking cookie on 13.5.0
 - [#1](https://github.com/openam-jp/openam/issues/1) Japanese locale file for XUI

## システム要求仕様

### オペレーティングシステム

* Red Hat Enterprise Linux 7, 8
* CentOS 7, 8

### Java

* OpenJDK 8, 11

### Web アプリケーションコンテナ

* Apache Tomcat 7, 8.5, 9

### Web クライアント

次に提示するソフトウェアの内、ベンダーがサポートするバージョンを対象とします。

#### オペレーティングシステム

* Windows
* macOS
* Linux
* iOS
* Android

#### PC 版ブラウザー

* Microsoft Edge
* Internet Explorer
* Mozilla Firefox
* Safari
* Google Chrome

#### スマートフォン版ブラウザー

* iOS/iPadOS: Safari
* Android: Google Chrome

