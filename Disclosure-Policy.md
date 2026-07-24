---
title: Vulnerability Disclosure Policy
---
# Responsible Vulnerability Disclosure

We believe that responsible security research and disclosure help us continually improve how we keep our members and users secure.

# Vulnerability Response

## Vulnerability Reporting

Please report potential security vulnerabilities to us via [VULNERABILITY_EMAIL_ADDRESS]. When submitting a report, we ask that you include the following information:

- Contact information of the reporter (email address)
- Name and version of the software containing the vulnerability
- Detailed description of the vulnerability
- Steps required to reproduce the issue

## Scope of Vulnerability Reporting

Vulnerability reporting is limited to the software managed in the following repository:

- [https://github.com/openam-jp](https://github.com/openam-jp)


## Vulnerability Response Process

The vulnerability response process consists of the following 4 steps:

### 1. Report Acknowledgment

We will respond to the reporter within 7 days of receiving the vulnerability report, acknowledging that we have received the report.

### 2. Vulnerability Investigation

We will investigate the impact of the vulnerability on the software. The investigation results will be shared with the reporter.

### 3. Mitigation Preparation

Depending on the nature of the vulnerability, we will prepare the following measures:

- Fix: Patches, fixes, etc. to remove or mitigate the vulnerability.
- Workaround: Actions to reduce the impact of a vulnerability exploit, etc.

### 4. CVE ID Assignment

If the investigation confirms an undisclosed vulnerability in a product within our scope, we, as a CNA, will assign a CVE ID and notify the reporter.

### 5. Publication of Security Advisory and CVE Record

Once a fix or mitigation is prepared, we will publish a security advisory containing the CVE ID on our [Security Advisories](../Advisories) page. Simultaneously, we will submit the CVE Record to CVE Services for publication.

Please note that the publication timing for both the security advisory and the CVE Record will be coordinated with the reporter in advance.
