var a = [
    {
        Question: 'A company has hired a third-party to gather information about the company’s servers and data. This third-party will not have direct access to the company\'s internal network, but they can gather information from any other source. Which of the following would BEST describe this approach?',
        A: 'Vulnerability scanning',
        B: 'Passive reconnaissance',
        C: 'Supply chain analysis',
        D: 'Regulatory audit',
        Correct: 'B',
        Explanation: 'Passive reconnaissance involves gathering information from open sources such as social media, corporate websites, and business organizations without directly interacting with the target’s systems. This matches the scenario where the third-party collects data without internal network access.'
    },
    {
        Question: 'A company\'s email server has received an email from a third-party, but the origination server does not match the list of authorized devices. Which of the following would determine the disposition of this message?',
        A: 'SPF',
        B: 'NAC',
        C: 'DMARC',
        D: 'DKIM',
        Correct: 'C',
        Explanation: 'DMARC (Domain-based Message Authentication Reporting and Conformance) determines the disposition of emails that fail authentication checks, such as when the origination server isn’t authorized. It allows the domain owner to specify actions like accepting, quarantining, or rejecting the message.'
    },
    {
        Question: 'Which of these threat actors would be MOST likely to attack systems for direct financial gain?',
        A: 'Organized crime',
        B: 'Hacktivist',
        C: 'Nation state',
        D: 'Shadow IT',
        Correct: 'A',
        Explanation: 'Organized crime actors are primarily motivated by financial gain, targeting systems to steal data or resources that can be directly converted into money, unlike hacktivists (political motives) or nation-states (strategic objectives).'
    },
    {
        Question: 'A security administrator has examined a server recently compromised by an attacker, and has determined the system was exploited due to a known operating system vulnerability. Which of the following would BEST describe this finding?',
        A: 'Root cause analysis',
        B: 'E-discovery',
        C: 'Risk appetite',
        D: 'Data subject',
        Correct: 'A',
        Explanation: 'Root cause analysis identifies the underlying reason for an incident, such as a known vulnerability leading to a compromise. This process helps in understanding and preventing future occurrences.'
    },
    {
        Question: 'A city is building an ambulance service network for emergency medical dispatching. Which of the following should have the highest priority?',
        A: 'Integration costs',
        B: 'Patch availability',
        C: 'System availability',
        D: 'Power usage',
        Correct: 'C',
        Explanation: 'For an emergency medical dispatching system, system availability is critical because downtime could delay life-saving responses. This takes precedence over costs, patching, or power considerations.'
    },
    {
        Question: 'A system administrator receives a text alert when access rights are changed on a database containing private customer information. Which of the following would describe this alert?',
        A: 'Maintenance window',
        B: 'Attestation and acknowledgment',
        C: 'Automation',
        D: 'External audit',
        Correct: 'C',
        Explanation: 'Automation enables real-time monitoring and alerts, such as notifying an administrator of access rights changes, without requiring manual intervention. This enhances compliance and security monitoring.'
    },
    {
        Question: 'A security administrator is concerned about the potential for data exfiltration using external storage drives. Which of the following would be the BEST way to prevent this method of data exfiltration?',
        A: 'Create an operating system security policy to block the use of removable media',
        B: 'Monitor removable media usage in host-based firewall logs',
        C: 'Only allow applications that do not use removable media',
        D: 'Define a removable media block rule in the UTM',
        Correct: 'A',
        Explanation: 'An operating system security policy can disable removable media interfaces (e.g., USB drives), directly preventing data exfiltration via external storage, which is more effective than monitoring or network-based rules.'
    },
    {
        Question: 'A company creates a standard set of government reports each calendar quarter. Which of the following would describe this type of data?',
        A: 'Data in use',
        B: 'Obfuscated',
        C: 'Trade secrets',
        D: 'Regulated',
        Correct: 'D',
        Explanation: 'Government reports are subject to laws and regulations governing data disclosure, classifying them as regulated data, distinct from data in use (actively processed) or trade secrets (proprietary).'
    },
    {
        Question: 'An insurance company has created a set of policies to handle data breaches. The security team has been given this set of requirements based on these policies: • Access records from all devices must be saved and archived • Any data access outside of normal working hours must be immediately reported • Data access must only occur inside of the country • Access logs and audit reports must be created from a single database. Which of the following should be implemented by the security team to meet these requirements? (Select THREE)',
        A: 'Restrict login access by IP address and GPS location',
        B: 'Require government-issued identification during the onboarding process',
        C: 'Add additional password complexity for accounts that access data',
        D: 'Conduct monthly permission auditing',
        E: 'Consolidate all logs on a SIEM',
        F: 'Archive the encryption keys of all disabled accounts',
        G: 'Enable time-of-day restrictions on the authentication server',
        Correct: 'A, E, G',
        Explanation: 'Restricting login by IP and GPS ensures access only within the country; consolidating logs on a SIEM enables archiving and single-database reporting; time-of-day restrictions flag out-of-hours access. These directly address the requirements.'
    },
    {
        Question: 'A security engineer is viewing this record from the firewall logs: UTC 04/05/2023 03:09:15809 AV Gateway Alert 136.127.92.171 80 -> 10.16.10.14 60818 Gateway Anti-Virus Alert: XPACK.A_7854 (Trojan) blocked. Which of the following can be observed from this log information?',
        A: 'The victim\'s IP address is 136.127.92.171',
        B: 'A download was blocked from a web server',
        C: 'A botnet DDoS attack was blocked',
        D: 'The Trojan was blocked, but the file was not',
        Correct: 'B',
        Explanation: 'The log shows traffic from port 80 (web server) to a high port (client), indicating a blocked download of a Trojan file from a web server, as Trojans are commonly delivered this way.'
    },
    {
        Question: 'A user connects to a third-party website and receives this message: Your connection is not private. NET::ERR_CERT_INVALID. Which of the following attacks would be the MOST likely reason for this message?',
        A: 'Brute force',
        B: 'DoS',
        C: 'On-path',
        D: 'Deauthentication',
        Correct: 'C',
        Explanation: 'An on-path attack involves intercepting traffic, often presenting an invalid certificate because the attacker cannot provide the legitimate site’s SSL certificate, triggering this browser warning.'
    },
    {
        Question: 'Which of the following would be the BEST way to provide a website login using existing credentials from a third-party site?',
        A: 'Federation',
        B: '802.1X',
        C: 'EAP',
        D: 'SSO',
        Correct: 'A',
        Explanation: 'Federation allows authentication across organizations using third-party credentials, ideal for integrating logins between different entities, unlike SSO which is internal to one organization.'
    },
    {
        Question: 'A system administrator is working on a contract that will specify a minimum required uptime for a set of Internet-facing firewalls. The administrator needs to know how often the firewall hardware is expected to fail between repairs. Which of the following would BEST describe this information?',
        A: 'MTBF',
        B: 'RTO',
        C: 'MTTR',
        D: 'RPO',
        Correct: 'A',
        Explanation: 'MTBF (Mean Time Between Failures) measures the expected time between hardware failures, directly relevant to predicting uptime and failure frequency for the firewalls.'
    },
    {
        Question: 'An attacker calls into a company’s help desk and pretends to be the director of the company’s manufacturing department. The attacker states that they have forgotten their password and they need to have the password reset quickly for an important meeting. What kind of attack would BEST describe this phone call?',
        A: 'Social engineering',
        B: 'Supply chain',
        C: 'Watering hole',
        D: 'On-path',
        Correct: 'A',
        Explanation: 'Social engineering involves manipulating people, here using impersonation and urgency to bypass security, fitting the scenario of tricking the help desk into resetting a password.'
    },
    {
        Question: 'Two companies have been working together for a number of months, and they would now like to qualify their partnership with a broad formal agreement between both organizations. Which of the following would describe this agreement?',
        A: 'SLA',
        B: 'SOW',
        C: 'MOA',
        D: 'NDA',
        Correct: 'C',
        Explanation: 'An MOA (Memorandum of Agreement) is a broad formal agreement outlining partnership goals and objectives between organizations, suitable for formalizing a collaborative relationship.'
    },
    {
        Question: 'Which of the following would explain why a company would automatically add a digital signature to each outgoing email message?',
        A: 'Confidentiality',
        B: 'Integrity',
        C: 'Authentication',
        D: 'Availability',
        Correct: 'B',
        Explanation: 'Integrity refers to the trustworthiness of data. A digital signature allows the recipient to confirm that none of the data has been changed since the signature was created, ensuring the message’s integrity.'
    },
    {
        Question: 'The embedded OS in a company’s time clock appliance is configured to reset the file system and reboot when a file system error occurs. On one of the time clocks, this file system error occurs during the startup process and causes the system to constantly reboot. Which of the following BEST describes this issue?',
        A: 'Memory injection',
        B: 'Resource consumption',
        C: 'Race condition',
        D: 'Malicious update',
        Correct: 'C',
        Explanation: 'A race condition occurs when two processes interfere unexpectedly, such as the reboot happening before the file system error can be fixed, resulting in constant reboots.'
    },
    {
        Question: 'A recent audit has discovered four servers that have not been updated in over a year, and it will take two weeks to test and deploy the latest patches. Which of the following would be the best way to quickly respond to this situation in the meantime?',
        A: 'Purchase cybersecurity insurance',
        B: 'Implement an exception for all data center services',
        C: 'Move the servers to a protected segment',
        D: 'Hire a third-party to perform an extensive audit',
        Correct: 'C',
        Explanation: 'Segmenting the servers to a protected network allows for additional security controls while maintaining uptime, providing an immediate mitigation until patches are applied.'
    },
    {
        Question: 'A business manager is documenting a set of steps for processing orders if the primary Internet connection fails. Which of these would BEST describe these steps?',
        A: 'Platform diversity',
        B: 'Continuity of operations',
        C: 'Cold site recovery',
        D: 'Tabletop exercise',
        Correct: 'B',
        Explanation: 'Continuity of operations planning ensures alternative processes are available to maintain business functions during outages, such as an Internet failure.'
    },
    {
        Question: 'A company would like to examine the credentials of each individual entering the data center building. Which of the following would BEST facilitate this requirement?',
        A: 'Access control vestibule',
        B: 'Video surveillance',
        C: 'Pressure sensors',
        D: 'Bollards',
        Correct: 'A',
        Explanation: 'An access control vestibule restricts entry, allowing credential verification for each person before granting access to secure areas like data centers.'
    },
    {
        Question: 'A company stores some employee information in encrypted form, but other public details are stored as plaintext. Which of the following would BEST describe this encryption strategy?',
        A: 'Full-disk',
        B: 'Record',
        C: 'Asymmetric',
        D: 'Key escrow',
        Correct: 'B',
        Explanation: 'Record-level encryption encrypts specific data fields (e.g., sensitive employee info) while leaving others (public details) as plaintext, typical in database security.'
    },
    {
        Question: 'A company would like to minimize database corruption if power is lost to a server. Which of the following would be the BEST strategy to follow?',
        A: 'Encryption',
        B: 'Off-site backups',
        C: 'Journaling',
        D: 'Replication',
        Correct: 'C',
        Explanation: 'Journaling logs changes before they’re applied to the database, enabling recovery from the last consistent state if power is lost, reducing corruption risk.'
    },
    {
        Question: 'A company is creating a security policy for corporate mobile devices: • All mobile devices must be automatically locked after a predefined time period. • The location of each device needs to be traceable. • All of the user’s information should be completely separate from company data. Which of the following would be the BEST way to establish these security policy rules?',
        A: 'Segmentation',
        B: 'Biometrics',
        C: 'COPE',
        D: 'MDM',
        Correct: 'D',
        Explanation: 'A Mobile Device Manager (MDM) enforces policies like auto-locking, location tracking, and data separation centrally across all mobile devices.'
    },
    {
        Question: 'A security engineer runs a monthly vulnerability scan. The scan doesn’t list any vulnerabilities for Windows servers, but a significant vulnerability was announced last week and none of the servers are patched yet. Which of the following best describes this result?',
        A: 'Exploit',
        B: 'Compensating controls',
        C: 'Zero-day attack',
        D: 'False negative',
        Correct: 'D',
        Explanation: 'A false negative occurs when a scan fails to detect an existing vulnerability, such as the unpatched servers missed despite the known issue.'
    },
    {
        Question: 'An IT help desk is using automation to improve the response time for security events. Which of the following use cases would apply to this process?',
        A: 'Escalation',
        B: 'Guard rails',
        C: 'Continuous integration',
        D: 'Resource provisioning',
        Correct: 'A',
        Explanation: 'Automation can detect security events and escalate them to the incident response team, speeding up response times without manual effort.'
    },
    {
        Question: 'A network administrator would like each user to authenticate with their corporate username and password when connecting to the company\'s wireless network. Which of the following should the network administrator configure on the wireless access points?',
        A: 'WPA3',
        B: '802.1X',
        C: 'PSK',
        D: 'MFA',
        Correct: 'B',
        Explanation: '802.1X enables centralized authentication, allowing users to log into the wireless network with their corporate credentials via an authentication server.'
    },
    {
        Question: 'A company\'s VPN service performs a posture assessment during the login process. Which of the following mitigation techniques would this describe?',
        A: 'Encryption',
        B: 'Decommissioning',
        C: 'Least privilege',
        D: 'Configuration enforcement',
        Correct: 'D',
        Explanation: 'Posture assessment checks a device’s configuration (e.g., patches, security settings) before VPN access, enforcing secure configurations.'
    },
    {
        Question: 'A user has assigned individual rights and permissions to a file on their network drive. The user adds three additional individuals to have read-only access to the file. Which of the following would describe this access control model?',
        A: 'Discretionary',
        B: 'Mandatory',
        C: 'Attribute-based',
        D: 'Role-based',
        Correct: 'A',
        Explanation: 'Discretionary access control (DAC) allows the file owner to assign permissions, such as granting read-only access to specific users.'
    },
    {
        Question: 'A remote user has received a text message with a link to login and confirm their upcoming work schedule. Which of the following would BEST describe this attack?',
        A: 'Brute force',
        B: 'Watering hole',
        C: 'Typosquatting',
        D: 'Smishing',
        Correct: 'D',
        Explanation: 'Smishing (SMS phishing) uses text messages to trick users into clicking malicious links and sharing sensitive info, like login credentials.'
    },
    {
        Question: 'A company is formalizing the design and deployment process used by their application programmers. Which of the following policies would apply?',
        A: 'Business continuity',
        B: 'Acceptable use policy',
        C: 'Incident response',
        D: 'Development lifecycle',
        Correct: 'D',
        Explanation: 'A development lifecycle policy outlines the structured process for designing, developing, testing, and deploying applications, ensuring consistency.'
    },
    {
        Question: 'A security administrator has copied a suspected malware executable from a user\'s computer and is running the program in a sandbox. Which of the following would describe this part of the incident response process?',
        A: 'Eradication',
        B: 'Preparation',
        C: 'Recovery',
        D: 'Containment',
        Correct: 'D',
        Explanation: 'Running malware in a sandbox isolates it for analysis, part of containment to prevent spread while assessing its behavior.'
    },
    {
        Question: 'A server administrator at a bank has noticed a decrease in the number of visitors to the bank\'s website. Additional research shows that users are being directed to a different IP address than the bank\'s web server. Which of the following would MOST likely describe this attack?',
        A: 'Deauthentication',
        B: 'DDoS',
        C: 'Buffer overflow',
        D: 'DNS poisoning',
        Correct: 'D',
        Explanation: 'DNS poisoning alters DNS records to redirect users to a malicious IP address, diverting them from the legitimate website.'
    },
    {
        Question: 'Which of the following considerations are MOST commonly associated with a hybrid cloud model?',
        A: 'Microservice outages',
        B: 'IoT support',
        C: 'Network protection mismatches',
        D: 'Containerization backups',
        Correct: 'C',
        Explanation: 'Hybrid clouds, combining multiple providers, often face network protection mismatches due to differing security policies or authentication methods.'
    },
    {
        Question: 'A company hires a large number of seasonal employees, and their system access should normally be disabled when the employee leaves the company. The security administrator would like to verify that their systems cannot be accessed by any of the former employees. Which of the following would be the BEST way to provide this verification?',
        A: 'Confirm that no unauthorized accounts have administrator access',
        B: 'Validate the account lockout policy',
        C: 'Validate the offboarding processes and procedures',
        D: 'Create a report that shows all authentications for a 24-hour period',
        Correct: 'C',
        Explanation: 'Validating offboarding processes ensures that former employees’ accounts are disabled as intended, typically through an audit comparing active accounts to current employees.'
    },
    {
        Question: 'Which of the following is used to describe how cautious an organization might be to taking a specific risk?',
        A: 'Risk appetite',
        B: 'Risk register',
        C: 'Risk transfer',
        D: 'Risk reporting',
        Correct: 'A',
        Explanation: 'Risk appetite defines an organization’s tolerance for risk, indicating how cautious or aggressive they are in accepting potential risks.'
    },
    {
        Question: 'A technician is applying a series of patches to fifty web servers during a scheduled maintenance window. After patching and rebooting the first server, the web service fails with a critical error. Which of the following should the technician do NEXT?',
        A: 'Contact the stakeholders regarding the outage',
        B: 'Follow the steps listed in the backout plan',
        C: 'Test the upgrade process in the lab',
        D: 'Evaluate the impact analysis associated with the change',
        Correct: 'B',
        Explanation: 'The backout plan provides steps to revert to the previous state if a change fails, allowing the technician to quickly address the critical error during the maintenance window.'
    },
    {
        Question: 'An attacker has discovered a way to disable a server by sending specially crafted packets from many remote devices to the operating system. When the packet is received, the system crashes and must be rebooted to restore normal operations. Which of the following would BEST describe this attack?',
        A: 'Privilege escalation',
        B: 'SQL injection',
        C: 'Replay attack',
        D: 'DDoS',
        Correct: 'D',
        Explanation: 'A Distributed Denial of Service (DDoS) attack uses multiple devices to overwhelm or crash a system, matching the description of disabling a server with crafted packets.'
    },
    {
        Question: 'A data breach has occurred in a large insurance company. A security administrator is building new servers and security systems to get all of the financial systems back online. Which part of the incident response process would BEST describe these actions?',
        A: 'Lessons learned',
        B: 'Containment',
        C: 'Recovery',
        D: 'Analysis',
        Correct: 'C',
        Explanation: 'Recovery involves restoring systems to normal operation after a breach, such as rebuilding servers to bring financial systems back online.'
    },
    {
        Question: 'A network team has installed new access points to support an application launch. In less than 24 hours, the wireless network was attacked and private company information was accessed. Which of the following would be the MOST likely reason for this breach?',
        A: 'Race condition',
        B: 'Jailbreaking',
        C: 'Impersonation',
        D: 'Misconfiguration',
        Correct: 'D',
        Explanation: 'Misconfiguration of access points, common during rapid deployment, likely allowed attackers to exploit security gaps and access private data.'
    },
    {
        Question: 'An organization has identified a significant vulnerability in an Internet-facing firewall. The firewall company has stated the firewall is no longer available for sale and there are no plans to create a patch for this vulnerability. Which of the following would BEST describe this issue?',
        A: 'End-of-life',
        B: 'Improper input handling',
        C: 'Improper key management',
        D: 'Incompatible OS',
        Correct: 'A',
        Explanation: 'End-of-life indicates a product is no longer supported or updated by the manufacturer, leaving vulnerabilities unpatched as described.'
    },
    {
        Question: 'A company has decided to perform a disaster recovery exercise during an annual meeting with the IT directors and senior directors. A simulated disaster will be presented, and the participants will discuss the logistics and processes required to resolve the disaster. Which of the following would BEST describe this exercise?',
        A: 'Capacity planning',
        B: 'Business impact analysis',
        C: 'Continuity of operations',
        D: 'Tabletop exercise',
        Correct: 'D',
        Explanation: 'A tabletop exercise involves discussing a simulated disaster scenario to evaluate recovery processes, fitting the described meeting format.'
    },
    {
        Question: 'A security administrator needs to block users from visiting websites hosting malicious software. Which of the following would be the BEST way to control this access?',
        A: 'Honeynet',
        B: 'Data masking',
        C: 'DNS filtering',
        D: 'Data loss prevention',
        Correct: 'C',
        Explanation: 'DNS filtering blocks access to malicious websites by preventing resolution to their IP addresses, effectively stopping users from reaching them.'
    },
    {
        Question: 'A system administrator has been called to a system with a malware infection. As part of the incident response process, the administrator has imaged the operating system to a known-good version. Which of these incident response steps is the administrator following?',
        A: 'Lessons learned',
        B: 'Recovery',
        C: 'Detection',
        D: 'Containment',
        Correct: 'B',
        Explanation: 'Recovery involves restoring a system to a pre-infection state, such as reimaging with a known-good operating system to eliminate malware.'
    },
    {
        Question: 'A company has placed a SCADA system on a segmented network with limited access from the rest of the corporate network. Which of the following would describe this process?',
        A: 'Load balancing',
        B: 'Least privilege',
        C: 'Data retention',
        D: 'Hardening',
        Correct: 'D',
        Explanation: 'Hardening enhances security by measures like network segmentation, reducing the attack surface of critical systems like SCADA.'
    },
    {
        Question: 'An administrator is viewing the following security log: Dec 30 08:40:03 web01 Failed password for root from 10.101.88.230 port 26244 ssh2, Dec 30 08:40:05 web01 Failed password for root from 10.101.88.230 port 26244 ssh2, Dec 30 08:40:09 web01 445 more authentication failures; rhost=10.101.88.230 user=root. Which of the following would describe this attack?',
        A: 'Spraying',
        B: 'Downgrade',
        C: 'Brute force',
        D: 'DDoS',
        Correct: 'C',
        Explanation: 'Brute force attacks involve numerous login attempts, as evidenced by over 445 failures from one IP, aiming to guess the password.'
    },
    {
        Question: 'During a morning login process, a user\'s laptop was moved to a private VLAN and a series of updates were automatically installed. Which of the following would describe this process?',
        A: 'Account lockout',
        B: 'Configuration enforcement',
        C: 'Decommissioning',
        D: 'Sideloading',
        Correct: 'B',
        Explanation: 'Configuration enforcement ensures devices meet security standards, such as quarantining to a VLAN and applying updates during login.'
    },
    {
        Question: 'Which of the following describes two-factor authentication?',
        A: 'A printer uses a password and a PIN',
        B: 'The door to a building requires a fingerprint scan',
        C: 'An application requires a pseudo-random code',
        D: 'A Windows Domain requires a password and smart card',
        Correct: 'D',
        Explanation: 'Two-factor authentication combines two different factors, like a password (something you know) and a smart card (something you have), as in the Windows Domain example.'
    },
    {
        Question: 'A company is deploying a new application to all employees in the field. Some of the problems associated with this roll out include: • The company does not have a way to manage the devices in the field • Team members have many different kinds of mobile devices • The same device needs to be used for both corporate and private use. Which of the following deployment models would address these concerns?',
        A: 'CYOD',
        B: 'SSO',
        C: 'COPE',
        D: 'BYOD',
        Correct: 'C',
        Explanation: 'COPE (Corporate-owned, Personally Enabled) provides company-owned devices that support both corporate and personal use, enabling management and standardization.'
    },
    {
        Question: 'An organization is installing a UPS for their new data center. Which of the following would BEST describe this control type?',
        A: 'Compensating',
        B: 'Directive',
        C: 'Deterrent',
        D: 'Detective',
        Correct: 'A',
        Explanation: 'A compensating control, like a UPS, mitigates impact (e.g., power loss) by providing an alternative solution without preventing the event.'
    },
    {
        Question: 'A manufacturing company would like to track the progress of parts used on an assembly line. Which of the following technologies would be the BEST choice for this task?',
        A: 'Secure enclave',
        B: 'Blockchain',
        C: 'Hashing',
        D: 'Asymmetric encryption',
        Correct: 'B',
        Explanation: 'Blockchain’s ledger capability tracks items immutably, making it ideal for monitoring parts’ progress on an assembly line.'
    },
    {
        Question: 'A company\'s website has been compromised and the website content has been replaced with a political message. Which of the following threat actors would be the MOST likely culprit?',
        A: 'Insider',
        B: 'Organized crime',
        C: 'Shadow IT',
        D: 'Hacktivist',
        Correct: 'D',
        Explanation: 'Hacktivists aim to promote political messages, often by defacing websites, aligning with the scenario of replacing content with a political statement.'
    },
    {
        Question: 'A Linux administrator is downloading an updated version of her Linux distribution. The download site shows a link to the ISO and a SHA256 hash value. Which of these would describe the use of this hash value?',
        A: 'Verifies that the file was not corrupted during the file transfer',
        B: 'Provides a key for decrypting the ISO after download',
        C: 'Authenticates the site as an official ISO distribution site',
        D: 'Confirms that the file does not contain any malware',
        Correct: 'A',
        Explanation: 'A SHA256 hash verifies file integrity by matching the downloaded file’s hash to the provided value, ensuring no corruption occurred during transfer.'
    },
    {
        Question: 'A company\'s security policy requires that login access should only be available if a person is physically within the same building as the server. Which of the following would be the BEST way to provide this requirement?',
        A: 'USB security key',
        B: 'Biometric scanner',
        C: 'PIN',
        D: 'SMS',
        Correct: 'B',
        Explanation: 'A biometric scanner requires physical presence for authentication (e.g., fingerprint), ensuring login only occurs within the building.'
    },
    {
        Question: 'A development team has installed a new application and database to a cloud service. After running a vulnerability scanner on the application instance, a security administrator finds the database is available for anyone to query without providing any authentication. Which of these vulnerabilities is MOST associated with this issue?',
        A: 'Legacy software',
        B: 'Open permissions',
        C: 'Race condition',
        D: 'Malicious update',
        Correct: 'B',
        Explanation: 'Open permissions allow unrestricted access to the database due to improper security controls, a common issue in cloud deployments if not configured correctly.'
    },
    {
        Question: 'Employees of an organization have received an email with a link offering a cash bonus for completing an internal training course. Which of the following would BEST describe this email?',
        A: 'Watering hole attack',
        B: 'Cross-site scripting',
        C: 'Zero-day',
        D: 'Phishing campaign',
        Correct: 'D',
        Explanation: 'A phishing campaign tests user security awareness, often using internal emails with links to simulate phishing attempts, as described in this scenario.'
    },
    {
        Question: 'Which of the following risk management strategies would include the purchase and installation of an NGFW?',
        A: 'Transfer',
        B: 'Mitigate',
        C: 'Accept',
        D: 'Avoid',
        Correct: 'B',
        Explanation: 'Mitigation reduces threat levels, and installing a Next-Generation Firewall (NGFW) enhances security to lessen the impact of potential risks.'
    },
    {
        Question: 'An organization is implementing a security model where all application requests must be validated at a policy enforcement point. Which of the following would BEST describe this model?',
        A: 'Public key infrastructure',
        B: 'Zero trust',
        C: 'Discretionary access control',
        D: 'Federation',
        Correct: 'B',
        Explanation: 'Zero trust requires verification of all requests, often through a policy enforcement point, ensuring no inherent trust exists in the network.'
    },
    {
        Question: 'A company is installing a new application in a public cloud. Which of the following determines the assignment of data security in this cloud infrastructure?',
        A: 'Playbook',
        B: 'Audit committee',
        C: 'Responsibility matrix',
        D: 'Right-to-audit clause',
        Correct: 'C',
        Explanation: 'A responsibility matrix outlines security duties between the cloud provider and customer, clarifying data security responsibilities in public cloud deployments.'
    },
    {
        Question: 'When decommissioning a device, a company documents the type and size of storage drive, the amount of RAM, and any installed adapter cards. Which of the following describes this process?',
        A: 'Destruction',
        B: 'Sanitization',
        C: 'Certification',
        D: 'Enumeration',
        Correct: 'D',
        Explanation: 'Enumeration involves listing device components in detail, such as storage and RAM, as part of tracking during decommissioning.'
    },
    {
        Question: 'An attacker has sent more information than expected in a single API call, and this has allowed the execution of arbitrary code. Which of the following would BEST describe this attack?',
        A: 'Buffer overflow',
        B: 'Replay attack',
        C: 'Cross-site scripting',
        D: 'DDoS',
        Correct: 'A',
        Explanation: 'A buffer overflow occurs when excess data in an API call overflows the buffer, potentially allowing arbitrary code execution.'
    },
    {
        Question: 'A company encourages users to encrypt all of their confidential materials on a central server. The organization would like to enable key escrow as a backup option. Which of these keys should the organization place into escrow?',
        A: 'Private',
        B: 'CA',
        C: 'Session',
        D: 'Public',
        Correct: 'A',
        Explanation: 'Private keys decrypt data encrypted with public keys in asymmetric encryption; escrowing them ensures access to encrypted data if needed.'
    },
    {
        Question: 'A company is in the process of configuring and enabling host-based firewalls on all user devices. Which of the following threats is the company addressing?',
        A: 'Default credentials',
        B: 'Vishing',
        C: 'Instant messaging',
        D: 'On-path',
        Correct: 'C',
        Explanation: 'Host-based firewalls can block malicious links delivered via instant messaging, a common attack vector, enhancing device-level security.'
    },
    {
        Question: 'A manufacturing company would like to use an existing router to separate a corporate network from a manufacturing floor. Both networks use the same physical switch, and the company does not want to install any additional hardware. Which of the following would be the BEST choice for this segmentation?',
        A: 'Connect the corporate network and the manufacturing floor with a VPN',
        B: 'Build an air gapped manufacturing floor network',
        C: 'Use host-based firewalls on each device',
        D: 'Create separate VLANs for the corporate network and the manufacturing floor',
        Correct: 'D',
        Explanation: 'VLANs segment networks on existing hardware, separating corporate and manufacturing traffic without additional switches.'
    },
    {
        Question: 'An organization needs to provide a remote access solution for a newly deployed cloud-based application. This application is designed to be used by mobile field service technicians. Which of the following would be the best option for this requirement?',
        A: 'RTOS',
        B: 'CRL',
        C: 'Zero-trust',
        D: 'SASE',
        Correct: 'D',
        Explanation: 'SASE (Secure Access Service Edge) optimizes secure cloud access for mobile users, ideal for field technicians needing remote application access.'
    },
    {
        Question: 'A company is implementing a quarterly security awareness campaign. Which of the following would MOST likely be part of this campaign?',
        A: 'Suspicious message reports from users',
        B: 'An itemized statement of work',
        C: 'An IaC configuration file',
        D: 'An acceptable use policy document',
        Correct: 'A',
        Explanation: 'Security awareness campaigns often include user reporting of suspicious messages, like phishing attempts, to reinforce training effectiveness.'
    },
    {
        Question: 'A recent report shows the return of a vulnerability that was previously patched four months ago. After researching this issue, the security team has found a recent patch has reintroduced this vulnerability on the servers. Which of the following should the security administrator implement to prevent this issue from occurring in the future?',
        A: 'Containerization',
        B: 'Data masking',
        C: '802.1X',
        D: 'Change management',
        Correct: 'D',
        Explanation: 'Change management includes testing patches to prevent reintroducing vulnerabilities, ensuring updates are thoroughly vetted before deployment.'
    },
    {
        Question: 'A security manager would like to ensure that unique hashes are used with an application login process. Which of the following would be the BEST way to add random data when generating a set of stored password hashes?',
        A: 'Salting',
        B: 'Obfuscation',
        C: 'Key stretching',
        D: 'Digital signature',
        Correct: 'A',
        Explanation: 'Salting adds random data to passwords before hashing, ensuring unique hashes even for identical passwords, enhancing security.'
    },
    {
        Question: 'Which cryptographic method is used to add trust to a digital certificate?',
        A: 'Steganography',
        B: 'Hash',
        C: 'Symmetric encryption',
        D: 'Digital signature',
        Correct: 'D',
        Explanation: 'A digital signature from a trusted certificate authority adds trust to a certificate, verifying its authenticity and integrity.'
    },
    {
        Question: 'A company is using SCAP as part of their security monitoring processes. Which of the following would BEST describe this implementation?',
        A: 'Train the user community to better identify phishing attempts',
        B: 'Present the results of an internal audit to the board',
        C: 'Automate the validation and patching of security issues',
        D: 'Identify and document authorized data center visitors',
        Correct: 'C',
        Explanation: 'SCAP (Security Content Automation Protocol) automates vulnerability management and patching, standardizing security across tools.'
    },
    {
        Question: 'An organization maintains a large database of customer information for sales tracking and customer support. Which person in the organization would be responsible for managing the access rights to this data?',
        A: 'Data processor',
        B: 'Data owner',
        C: 'Data subject',
        D: 'Data custodian',
        Correct: 'D',
        Explanation: 'The data custodian manages access rights and security controls for data, ensuring proper protection and permissions.'
    },
    {
        Question: 'An organization’s content management system currently labels files and documents as “Public” and “Restricted.” On a recent update, a new classification type of “Private” was added. Which of the following would be the MOST likely reason for this addition?',
        A: 'Minimized attack surface',
        B: 'Simplified categorization',
        C: 'Expanded privacy compliance',
        D: 'Decreased search time',
        Correct: 'C',
        Explanation: 'Adding a “Private” label supports privacy compliance by distinguishing sensitive data, aligning with regulatory or confidentiality needs.'
    },
    {
        Question: 'A corporate security team would like to consolidate and protect the private keys across all of their web servers. Which of these would be the BEST way to securely store these keys?',
        A: 'Integrate an HSM',
        B: 'Implement full disk encryption on the web servers',
        C: 'Use a TPM',
        D: 'Upgrade the web servers to use a UEFI BIOS',
        Correct: 'A',
        Explanation: 'An HSM (Hardware Security Module) securely stores and manages private keys across multiple servers, offering centralized protection.'
    },
    {
        Question: 'Which of the following describes a monetary loss if one event occurs?',
        A: 'ALE',
        B: 'SLE',
        C: 'RTO',
        D: 'ARO',
        Correct: 'B',
        Explanation: 'SLE (Single Loss Expectancy) quantifies the financial impact of a single event, distinguishing it from annual metrics or recovery times.'
    },
    {
        Question: 'A user with restricted access has typed this text in a search field of an internal web-based application: USER77\' OR \'1\'=\'1. After submitting this search request, all database records are displayed on the screen. Which of the following would BEST describe this search?',
        A: 'Cross-site scripting',
        B: 'Buffer overflow',
        C: 'SQL injection',
        D: 'SSL stripping',
        Correct: 'C',
        Explanation: 'SQL injection exploits poor input validation, allowing the attacker to manipulate the database query and access all records, as shown with the \'OR 1=1\' syntax.'
    },
    {
        Question: 'A user has opened a helpdesk ticket complaining of poor system performance, excessive pop up messages, and the cursor moving without anyone touching the mouse. This issue began after they opened a spreadsheet from a vendor containing part numbers and pricing information. Which of the following is MOST likely the cause of this user\'s issues?',
        A: 'On-path',
        B: 'Worm',
        C: 'Trojan horse',
        D: 'Logic bomb',
        Correct: 'C',
        Explanation: 'A Trojan horse, disguised as a legitimate spreadsheet, can install malware causing performance issues, pop-ups, and remote control, matching the symptoms described.'
    },
    {
        Question: 'A web-based manufacturing company processes monthly charges to credit card information saved in the customer\'s profile. All of the customer information is encrypted and protected with additional authentication factors. Which of the following would be the justification for these security controls?',
        A: 'Chain of custody',
        B: 'Password vaulting',
        C: 'Compliance reporting',
        D: 'Sandboxing',
        Correct: 'C',
        Explanation: 'Compliance reporting ensures adherence to regulations for protecting sensitive data like credit card info, justifying encryption and authentication measures.'
    },
    {
        Question: 'A security manager has created a report showing intermittent network communication from certain workstations on the internal network to one external IP address. These traffic patterns occur at random times during the day. Which of the following would be the MOST likely reason for these traffic patterns?',
        A: 'On-path attack',
        B: 'Keylogger',
        C: 'Replay attack',
        D: 'Brute force',
        Correct: 'B',
        Explanation: 'A keylogger captures and intermittently sends keystroke data to an external IP, explaining the random outbound traffic patterns observed.'
    },
    {
        Question: 'The security policies in a manufacturing company prohibit the transmission of customer information. However, a security administrator has received an alert that credit card numbers were transmitted as an email attachment. Which of the following was the MOST likely source of this alert message?',
        A: 'IPS',
        B: 'DLP',
        C: 'RADIUS',
        D: 'IPsec',
        Correct: 'B',
        Explanation: 'DLP (Data Loss Prevention) systems detect and alert on unauthorized transmissions of sensitive data, such as credit card numbers in an email.'
    },
    {
        Question: 'A security administrator has configured a virtual machine in a screened subnet with a guest login account and no password. Which of the following would be the MOST likely reason for this configuration?',
        A: 'The server is a honeypot for attracting potential attackers',
        B: 'The server is a cloud storage service for remote users',
        C: 'The server will be used as a VPN concentrator',
        D: 'The server is a development sandbox for third-party programming projects',
        Correct: 'A',
        Explanation: 'A honeypot is intentionally vulnerable (e.g., no password) and placed in a screened subnet to lure attackers for monitoring, fitting this setup.'
    },
    {
        Question: 'A security administrator is configuring a DNS server with a SPF record. Which of the following would be the reason for this configuration?',
        A: 'Transmit all outgoing email over an encrypted tunnel',
        B: 'List all servers authorized to send emails',
        C: 'Digitally sign all outgoing email messages',
        D: 'Obtain disposition instructions for emails marked as spam',
        Correct: 'B',
        Explanation: 'SPF (Sender Policy Framework) records list authorized email servers for a domain, preventing spoofing by verifying senders.'
    },
    {
        Question: 'A company would like to securely deploy applications without the overhead of installing a virtual machine for each system. Which of the following would be the BEST way to deploy these applications?',
        A: 'Containerization',
        B: 'IoT',
        C: 'Proxy',
        D: 'RTOS',
        Correct: 'A',
        Explanation: 'Containerization deploys applications in isolated instances on a single VM, reducing overhead compared to separate VMs for each system.'
    },
    {
        Question: 'A company has just purchased a new application server, and the security director wants to determine if the system is secure. The system is currently installed in a test environment and will not be available to users until the roll out to production next week. Which of the following would be the BEST way to determine if any part of the system can be exploited?',
        A: 'Tabletop exercise',
        B: 'Vulnerability scanner',
        C: 'DDoS',
        D: 'Penetration test',
        Correct: 'D',
        Explanation: 'A penetration test actively exploits vulnerabilities in a test environment, providing a thorough assessment of the system’s security before production.'
    },
    {
        Question: 'A security administrator has performed an audit of the organization’s production web servers, and the results have identified default configurations, web services running from a privileged account, and inconsistencies with SSL certificates. Which of the following would be the BEST way to resolve these issues?',
        A: 'Server hardening',
        B: 'Multi-factor authentication',
        C: 'Enable HTTPS',
        D: 'Run operating system updates',
        Correct: 'A',
        Explanation: 'Server hardening addresses default configurations, privileged accounts, and SSL issues by applying secure configuration guidelines to enhance security.'
    },
    {
        Question: 'A shipping company stores information in small regional warehouses around the country. The company maintains an IPS at each warehouse to watch for suspicious traffic patterns. Which of the following would BEST describe the security control used at the warehouse?',
        A: 'Deterrent',
        B: 'Compensating',
        C: 'Directive',
        D: 'Detective',
        Correct: 'D',
        Explanation: 'An IPS (Intrusion Prevention System) detects and logs suspicious traffic, acting as a detective control, and can also prevent known attacks.'
    },
    {
        Question: 'The Vice President of Sales has asked the IT team to create daily backups of the sales data. The Vice President is an example of a:',
        A: 'Data owner',
        B: 'Data controller',
        C: 'Data steward',
        D: 'Data processor',
        Correct: 'A',
        Explanation: 'The data owner, typically a senior officer like the VP, is accountable for specific data and makes decisions about its management, such as requesting backups.'
    },
    {
        Question: 'A security engineer is preparing to conduct a penetration test of a third-party website. Part of the preparation involves reading through social media posts for information about this site. Which of the following describes this practice?',
        A: 'Partially known environment',
        B: 'OSINT',
        C: 'Exfiltration',
        D: 'Active reconnaissance',
        Correct: 'B',
        Explanation: 'OSINT (Open Source Intelligence) involves gathering publicly available information, like social media posts, to prepare for activities such as penetration testing.'
    },
    {
        Question: 'A company would like to orchestrate the response when a virus is detected on company devices. Which of the following would be the BEST way to implement this function?',
        A: 'Active reconnaissance',
        B: 'Log aggregation',
        C: 'Vulnerability scan',
        D: 'Escalation scripting',
        Correct: 'D',
        Explanation: 'Escalation scripting automates responses to detected viruses, orchestrating actions like alerts or containment for efficient incident handling.'
    },
    {
        Question: 'A user in the accounting department has received a text message from the CEO. The message requests payment by cryptocurrency for a recently purchased tablet. Which of the following would BEST describe this attack?',
        A: 'Brand impersonation',
        B: 'Watering hole attack',
        C: 'Smishing',
        D: 'Typosquatting',
        Correct: 'C',
        Explanation: 'Smishing (SMS phishing) uses text messages to deceive users, as in this case with a fake CEO request for cryptocurrency payment.'
    },
    {
        Question: 'A company has been informed of a hypervisor vulnerability that could allow users on one virtual machine to access resources on another virtual machine. Which of the following would BEST describe this vulnerability?',
        A: 'Containerization',
        B: 'Jailbreaking',
        C: 'SDN',
        D: 'Escape',
        Correct: 'D',
        Explanation: 'A VM escape vulnerability allows a user to break out of one virtual machine and access another, compromising hypervisor isolation.'
    },
    {
        Question: 'While working from home, users are attending a project meeting over a web conference. When typing in the meeting link, the browser is unexpectedly directed to a different website than the web conference. Users in the office do not have any issues accessing the conference site. Which of the following would be the MOST likely reason for this issue?',
        A: 'Buffer overflow',
        B: 'Wireless disassociation',
        C: 'Amplified DDoS',
        D: 'DNS poisoning',
        Correct: 'D',
        Explanation: 'DNS poisoning redirects users to a malicious site by altering DNS records, likely affecting home users’ DNS servers but not the office’s.'
    },
    {
        Question: 'A company is launching a new internal application that will not start until a username and password is entered and a smart card is plugged into the computer. Which of the following BEST describes this process?',
        A: 'Federation',
        B: 'Accounting',
        C: 'Authentication',
        D: 'Authorization',
        Correct: 'C',
        Explanation: 'Authentication verifies identity using multiple factors (password and smart card) before granting access to the application.'
    },
    {
        Question: 'An online retailer is planning a penetration test as part of their PCI DSS validation. A third-party organization will be performing the test, and the online retailer has provided the Internet-facing IP addresses for their public web servers. No other details were provided. What penetration testing methodology is the online retailer using?',
        A: 'Known environment',
        B: 'Passive reconnaissance',
        C: 'Partially known environment',
        D: 'Benchmarks',
        Correct: 'C',
        Explanation: 'A partially known environment test provides limited info (e.g., IP addresses) to the tester, simulating an attacker with some but not full knowledge.'
    },
    {
        Question: 'A manufacturing company produces radar used by commercial and military organizations. A recently proposed policy change would allow the use of mobile devices inside the facility. Which of the following would be the MOST significant threat vector issue associated with this change in policy?',
        A: 'Unauthorized software on rooted devices',
        B: 'Remote access clients on the mobile devices',
        C: 'Out of date mobile operating systems',
        D: 'Loss of intellectual property',
        Correct: 'D',
        Explanation: 'Allowing mobile devices increases the risk of intellectual property loss via photos or data exfiltration, a major concern for sensitive manufacturing.'
    },
    {
        Question: 'Which of the following would be the BEST way for an organization to verify the digital signature provided by an external email server?',
        A: 'Perform a vulnerability scan',
        B: 'View the server\'s device certificate',
        C: 'Authenticate to a RADIUS server',
        D: 'Check the DKIM record',
        Correct: 'D',
        Explanation: 'The DKIM (Domain Keys Identified Mail) record in DNS provides the public key to verify digital signatures on emails from an external server.'
    },
    {
        Question: 'A company is using older operating systems for their web servers and are concerned of their stability during periods of high use. Which of the following should the company use to maximize the uptime and availability of this service?',
        A: 'Cold site',
        B: 'UPS',
        C: 'Redundant routers',
        D: 'Load balancer',
        Correct: 'D',
        Explanation: 'A load balancer distributes traffic across multiple servers, ensuring uptime and availability even if one server fails due to OS instability.'
    },
    {
        Question: 'A user in the accounting department would like to email a spreadsheet with sensitive information to a list of third-party vendors. Which of the following would be the BEST way to protect the data in this email?',
        A: 'Full disk encryption',
        B: 'Key exchange algorithm',
        C: 'Salted hash',
        D: 'Asymmetric encryption',
        Correct: 'D',
        Explanation: 'Asymmetric encryption secures email data using recipients’ public keys, ensuring only they can decrypt it with their private keys.'
    },
    {
        Question: 'A system administrator would like to segment the network to give the marketing, accounting, and manufacturing departments their own private network. The network communication between departments would be restricted for additional security. Which of the following should be configured on this network?',
        A: 'VPN',
        B: 'RBAC',
        C: 'VLAN',
        D: 'SDN',
        Correct: 'C',
        Explanation: 'VLANs (Virtual Local Area Networks) segment a network logically, restricting inter-department communication for enhanced security.'
    },
    {
        Question: 'A technician at an MSP has been asked to manage devices on third-party private network. The technician needs command line access to internal routers, switches, and firewalls. Which of the following would provide the necessary access?',
        A: 'HSM',
        B: 'Jump server',
        C: 'NAC',
        D: 'Air gap',
        Correct: 'B',
        Explanation: 'A jump server provides secure access to a private network, allowing the technician to connect via SSH or VPN and manage internal devices remotely.'
    },
    {
        Question: 'A transportation company is installing new wireless access points in their corporate office. The manufacturer estimates the access points will operate an average of 100,000 hours before a hardware-related outage. Which of the following describes this estimate?',
        A: 'MTTR',
        B: 'RPO',
        C: 'RTO',
        D: 'MTBF',
        Correct: 'D',
        Explanation: 'MTBF (Mean Time Between Failures) estimates the average operational time before a hardware failure, as specified by the manufacturer.'
    },
    {
        Question: 'A security administrator is creating a policy to prevent the disclosure of credit card numbers in a customer support application. Users of the application would only be able to view the last four digits of a credit card number. Which of the following would provide this functionality?',
        A: 'Hashing',
        B: 'Tokenization',
        C: 'Masking',
        D: 'Salting',
        Correct: 'C',
        Explanation: 'Masking hides sensitive data, displaying only the last four digits of a credit card number while keeping the full number stored securely.'
    },
    {
        Question: 'A user is authenticating through the use of a PIN and a fingerprint. Which of the following would describe these authentication factors?',
        A: 'Something you know, something you are',
        B: 'Something you are, somewhere you are',
        C: 'Something you have, something you know',
        D: 'Somewhere you are, something you are',
        Correct: 'A',
        Explanation: 'A PIN is something you know, and a fingerprint is something you are, combining two distinct authentication factors.'
    },
    {
        Question: 'A security administrator is configuring the authentication process used by technicians when logging into wireless access points and switches. Instead of using local accounts, the administrator would like to pass all login requests to a centralized database. Which of the following would be the BEST way to implement this requirement?',
        A: 'COPE',
        B: 'AAA',
        C: 'IPsec',
        D: 'SIEM',
        Correct: 'B',
        Explanation: 'AAA (Authentication, Authorization, and Accounting) centralizes authentication by routing login requests to a single database, improving management.'
    },
    {
        Question: 'A recent audit has determined that many IT department accounts have been granted Administrator access. The audit recommends replacing these permissions with limited access rights. Which of the following would describe this policy?',
        A: 'Password vaulting',
        B: 'Offboarding',
        C: 'Least privilege',
        D: 'Discretionary access control',
        Correct: 'C',
        Explanation: 'Least privilege limits user permissions to only what is needed, reducing risk by replacing excessive Administrator access with restricted rights.'
    },
    {
        Question: 'A recent security audit has discovered usernames and passwords which can be easily viewed in a packet capture. Which of the following did the audit identify?',
        A: 'Weak encryption',
        B: 'Improper patch management',
        C: 'Insecure protocols',
        D: 'Open ports',
        Correct: 'C',
        Explanation: 'Insecure protocols transmit credentials in plaintext, making them visible in packet captures due to lack of encryption.'
    },
    {
        Question: 'Before deploying a new application, a company is performing an internal audit to ensure all of their servers are configured with the appropriate security features. Which of the following would BEST describe this process?',
        A: 'Due care',
        B: 'Active reconnaissance',
        C: 'Data retention',
        D: 'Statement of work',
        Correct: 'A',
        Explanation: 'Due care reflects internal efforts to ensure security compliance, such as auditing servers before deployment to uphold good faith standards.'
    },
    {
        Question: 'An organization has previously purchased insurance to cover a ransomware attack, but the costs of maintaining the policy have increased above the acceptable budget. The company has now decided to cancel the insurance policies and address potential ransomware issues internally. Which of the following would best describe this action?',
        A: 'Mitigation',
        B: 'Acceptance',
        C: 'Transference',
        D: 'Risk-avoidance',
        Correct: 'B',
        Explanation: 'Acceptance involves taking on the risk internally, as the company opts to handle ransomware without insurance after cancelling the policy.'
    },
    {
        Question: 'Which of these threat actors would be MOST likely to install a company\'s internal application on a public cloud provider?',
        A: 'Organized crime',
        B: 'Nation state',
        C: 'Shadow IT',
        D: 'Hacktivist',
        Correct: 'C',
        Explanation: 'Shadow IT, an internal group bypassing IT policies, is most likely to deploy a company app on a public cloud without authorization.'
    },
    {
        Question: 'An IPS report shows a series of exploit attempts were made against externally facing web servers. The system administrator of the web servers has identified a number of unusual log entries on each system. Which of the following would be the NEXT step in the incident response process?',
        A: 'Check the IPS logs for any other potential attacks',
        B: 'Create a plan for removing malware from the web servers',
        C: 'Disable any breached user accounts',
        D: 'Disconnect the web servers from the network',
        Correct: 'D',
        Explanation: 'Disconnecting the servers (containment) is the next step to prevent further exploitation after identifying unusual log entries indicating a breach.'
    },
    {
        Question: 'In the past, an organization has relied on the curated Apple App Store to avoid issues associated with malware and insecure applications. However, the IT department has discovered an iPhone in the shipping department with applications not available on the Apple App Store. How did the shipping department user install these apps on their mobile device?',
        A: 'Side loading',
        B: 'Malicious update',
        C: 'VM escape',
        D: 'Cross-site scripting',
        Correct: 'A',
        Explanation: 'Side loading allows app installation outside the App Store, typically after jailbreaking, bypassing curated security controls.'
    },
    {
        Question: 'A company has noticed an increase in support calls from attackers. These attackers are using social engineering to gain unauthorized access to customer data. Which of the following would be the BEST way to prevent these attacks?',
        A: 'User training',
        B: 'Next-generation firewall',
        C: 'Internal audit',
        D: 'Penetration testing',
        Correct: 'A',
        Explanation: 'User training educates staff to recognize social engineering, the most effective defense against non-technical attacks like these.'
    },
    {
        Question: 'As part of an internal audit, each department of a company has been asked to compile a list of all devices, operating systems, and applications in use. Which of the following would BEST describe this audit?',
        A: 'Attestation',
        B: 'Self-assessment',
        C: 'Regulatory compliance',
        D: 'Vendor monitoring',
        Correct: 'B',
        Explanation: 'Self-assessment involves internal security checks, such as departments listing assets, to evaluate the organization’s security posture.'
    },
    {
        Question: 'A company is concerned about security issues at their remote sites. Which of the following would provide the IT team with more information of potential shortcomings?',
        A: 'Gap analysis',
        B: 'Policy administrator',
        C: 'Change management',
        D: 'Dependency list',
        Correct: 'A',
        Explanation: 'A gap analysis compares current security to desired standards, identifying shortcomings at remote sites for the IT team to address.'
    },
    {
        Question: 'An attacker has identified a number of devices on a corporate network with the username of “admin” and the password of “admin.” Which of the following describes this situation?',
        A: 'Open service ports',
        B: 'Default credentials',
        C: 'Unsupported systems',
        D: 'Phishing',
        Correct: 'B',
        Explanation: 'Default credentials (e.g., admin/admin) left unchanged from initial setup allow easy attacker access, a common security oversight.'
    },
    {
        Question: 'A security administrator attends an annual industry convention with other security professionals from around the world. Which of the following attacks would be MOST likely in this situation?',
        A: 'Smishing',
        B: 'Supply chain',
        C: 'SQL injection',
        D: 'Watering hole',
        Correct: 'D',
        Explanation: 'A watering hole attack targets a group by compromising a site they frequent, like a convention site, making it likely for security professionals.'
    },
    {
        Question: 'A transportation company headquarters is located in an area with frequent power surges and outages. The security administrator is concerned about the potential for downtime and hardware failures. Which of the following would provide the most protection against these issues? Select TWO.',
        A: 'UPS',
        B: 'Parallel processing',
        C: 'Snapshots',
        D: 'Multi-cloud system',
        E: 'Load balancing',
        F: 'Generator',
        Correct: 'A, F',
        Explanation: 'A UPS provides short-term power during outages, and a generator ensures long-term power, both protecting against downtime and hardware issues.'
    },
    {
        Question: 'An organization has developed an in-house mobile device app for order processing. The developers would like the app to identify revoked server certificates without sending any traffic over the corporate Internet connection. Which of the following must be configured to allow this functionality?',
        A: 'CSR generation',
        B: 'OCSP stapling',
        C: 'Key escrow',
        D: 'Wildcard',
        Correct: 'B',
        Explanation: 'OCSP stapling includes certificate status in the SSL/TLS handshake, allowing revocation checks without external Internet traffic.'
    },
    {
        Question: 'A security administrator has been asked to build a network link to secure all communication between two remote locations. Which of the following would be the best choice for this task?',
        A: 'SCAP',
        B: 'Screened subnet',
        C: 'IPsec',
        D: 'Network access control',
        Correct: 'C',
        Explanation: 'IPsec creates a secure VPN tunnel, encrypting communication between remote locations effectively.'
    },
    {
        Question: 'A Linux administrator has received a ticket complaining of response issues with a database server. After connecting to the server, the administrator views information showing the filesystem at 100% capacity. Which of the following would BEST describe this information?',
        A: 'Buffer overflow',
        B: 'Resource consumption',
        C: 'SQL injection',
        D: 'Race condition',
        Correct: 'B',
        Explanation: 'Resource consumption, indicated by a full filesystem, causes slow database responses due to lack of available storage space.'
    },
    {
        Question: 'Which of the following can be used for credit card transactions from a mobile device without sending the actual credit card number across the network?',
        A: 'Tokenization',
        B: 'Hashing',
        C: 'Steganography',
        D: 'Masking',
        Correct: 'A',
        Explanation: 'Tokenization replaces the credit card number with a token for transactions, enhancing security by not transmitting sensitive data.'
    },
    {
        Question: 'A security administrator receives a report each week showing a Linux vulnerability associated with a Windows server. Which of the following would prevent this information from appearing in the report?',
        A: 'Alert tuning',
        B: 'Application benchmarking',
        C: 'SIEM aggregation',
        D: 'Data archiving',
        Correct: 'A',
        Explanation: 'Alert tuning adjusts monitoring to filter out irrelevant alerts, like a Linux vulnerability on a Windows server, improving report accuracy.'
    },
    {
        Question: 'Which of the following would a company use to calculate the loss of a business activity if a vulnerability is exploited?',
        A: 'Risk tolerance',
        B: 'Vulnerability classification',
        C: 'Environmental variables',
        D: 'Exposure factor',
        Correct: 'D',
        Explanation: 'Exposure factor quantifies the percentage loss from a vulnerability exploit, aiding in calculating business activity impact.'
    },
    {
        Question: 'An administrator is designing a network to be compliant with a security standard for storing credit card numbers. Which of the following would be the BEST choice to provide this compliance?',
        A: 'Implement RAID for all storage systems',
        B: 'Connect a UPS to all servers',
        C: 'DNS should be available on redundant servers',
        D: 'Perform regular audits and vulnerability scans',
        Correct: 'D',
        Explanation: 'Regular audits and vulnerability scans ensure ongoing compliance with credit card storage security standards, like PCI DSS.'
    },
    {
        Question: 'A company is accepting proposals for an upcoming project, and one of the responses is from a business owned by a board member. Which of the following would describe this situation?',
        A: 'Due diligence',
        B: 'Vendor monitoring',
        C: 'Conflict of interest',
        D: 'Right-to-audit',
        Correct: 'C',
        Explanation: 'A conflict of interest arises when a board member’s business submits a proposal, potentially compromising impartial decision-making.'
    },
    {
        Question: 'A company has rolled out a new application that requires the use of a hardware-based token generator. Which of the following would be the BEST description of this access feature?',
        A: 'Something you know',
        B: 'Somewhere you are',
        C: 'Something you are',
        D: 'Something you have',
        Correct: 'D',
        Explanation: 'A hardware token generator is something you have, requiring physical possession for authentication.'
    },
    {
        Question: 'A company has signed an SLA with an Internet service provider. Which of the following would BEST describe the requirements of this SLA?',
        A: 'The customer will connect to remote sites over an IPsec tunnel',
        B: 'The service provider will provide 99.99% uptime',
        C: 'The customer applications use HTTPS over tcp/443',
        D: 'Customer application use will be busiest on the 15th of each month',
        Correct: 'B',
        Explanation: 'An SLA specifies service provider commitments, like 99.99% uptime, rather than customer usage or application details.'
    },
    {
        Question: 'A company has rolled out a new application that requires the use of a hardware-based token generator. Which of the following would be the BEST description of this access feature?',
        A: 'Something you know',
        B: 'Somewhere you are',
        C: 'Something you are',
        D: 'Something you have',
        Correct: 'D',
        Explanation: 'A hardware token generator is something you have, requiring physical possession for authentication, distinct from knowledge, location, or biometrics.'
    },
    {
        Question: 'A company has signed an SLA with an Internet service provider. Which of the following would BEST describe the requirements of this SLA?',
        A: 'The customer will connect to remote sites over an IPsec tunnel',
        B: 'The service provider will provide 99.99% uptime',
        C: 'The customer applications use HTTPS over tcp/443',
        D: 'Customer application use will be busiest on the 15th of each month',
        Correct: 'B',
        Explanation: 'An SLA (Service Level Agreement) defines service provider commitments, such as 99.99% uptime, rather than customer-specific usage details.'
    },
    {
        Question: 'An attacker has created multiple social media accounts and is posting information in an attempt to get the attention of the media. Which of the following would BEST describe this attack?',
        A: 'On-path',
        B: 'Watering hole',
        C: 'Misinformation campaign',
        D: 'Phishing',
        Correct: 'C',
        Explanation: 'A misinformation campaign uses social media to spread false information, aiming to influence media and public perception, as described.'
    },
    {
        Question: 'Which of the following would be the BEST way to protect credit card account information when performing real-time purchase authorizations?',
        A: 'Masking',
        B: 'DLP',
        C: 'Tokenization',
        D: 'NGFW',
        Correct: 'C',
        Explanation: 'Tokenization replaces credit card data with a token during transactions, preventing the actual number from being transmitted, enhancing security.'
    },
    {
        Question: 'A company must comply with legal requirements for storing customer data in the same country as the customer\'s mailing address. Which of the following would describe this requirement?',
        A: 'Geographic dispersion',
        B: 'Least privilege',
        C: 'Data sovereignty',
        D: 'Exfiltration',
        Correct: 'C',
        Explanation: 'Data sovereignty mandates that data be stored within the legal jurisdiction of its origin, aligning with the country-specific storage requirement.'
    },
    {
        Question: 'A company is installing access points in all of their remote sites. Which of the following would provide confidentiality for all wireless data?',
        A: '802.1X',
        B: 'WPA3',
        C: 'RADIUS',
        D: 'MDM',
        Correct: 'B',
        Explanation: 'WPA3 encrypts all wireless data, ensuring confidentiality across the network, unlike authentication or management options.'
    },
    {
        Question: 'A security administrator has found a keylogger installed in an update of the company\'s accounting software. Which of the following would prevent the transmission of the collected logs?',
        A: 'Prevent the installation of all software',
        B: 'Block all unknown outbound network traffic at the Internet firewall',
        C: 'Install host-based anti-virus software',
        D: 'Scan all incoming email attachments at the email gateway',
        Correct: 'B',
        Explanation: 'Blocking unknown outbound traffic at the firewall stops keylogger data from being sent externally, directly addressing transmission prevention.'
    },
    {
        Question: 'A user in the marketing department is unable to connect to the wireless network. After authenticating with a username and password, the user receives a message indicating the server credentials could not be validated by the RADIUS server. Which of the following is the MOST likely reason for this login issue?',
        A: 'The user’s computer is in the incorrect VLAN',
        B: 'The RADIUS server is not responding',
        C: 'The user’s computer does not support WPA3 encryption',
        D: 'The user is in a location with an insufficient wireless signal',
        E: 'The client computer does not have the proper certificate installed',
        Correct: 'E',
        Explanation: 'The validation error suggests the client lacks the correct certificate to trust the RADIUS server, a common 802.1X issue.'
    },
    {
        Question: 'A security administrator has created a new policy prohibiting the use of MD5 hashes due to collision problems. Which of the following describes the reason for this new policy?',
        A: 'Two different messages have different hashes',
        B: 'The original message can be derived from the hash',
        C: 'Two identical messages have the same hash',
        D: 'Two different messages share the same hash',
        Correct: 'D',
        Explanation: 'MD5’s collision vulnerability allows two different inputs to produce the same hash, undermining its reliability, prompting the policy change.'
    },
    {
        Question: 'A security administrator has been tasked with hardening all internal web servers to control access from certain IP address ranges and ensure all transferred data remains confidential. Which of the following should the administrator include in his project plan? (Select TWO)',
        A: 'Change the administrator password',
        B: 'Use HTTPS for all server communication',
        C: 'Uninstall all unused software',
        D: 'Enable a host-based firewall',
        E: 'Install the latest operating system update',
        Correct: 'B, D',
        Explanation: 'HTTPS ensures data confidentiality, and a host-based firewall restricts access by IP range, meeting both hardening goals effectively.'
    },
    {
        Question: 'A security administrator has identified the installation of ransomware on a database server and has quarantined the system. Which of the following should be followed to ensure that the integrity of the evidence is maintained?',
        A: 'E-discovery',
        B: 'Non-repudiation',
        C: 'Chain of custody',
        D: 'Legal hold',
        Correct: 'C',
        Explanation: 'Chain of custody documents evidence handling, ensuring its integrity is preserved for forensic analysis after ransomware quarantine.'
    },
    {
        Question: 'Which of the following would be the BEST option for application testing in an environment completely separated from the production network?',
        A: 'Virtualization',
        B: 'VLANs',
        C: 'Cloud computing',
        D: 'Air gap',
        Correct: 'D',
        Explanation: 'An air gap physically isolates the test environment, ensuring no connection to production, unlike virtual or networked alternatives.'
    },
    {
        Question: 'A security engineer is planning the installation of a new IPS. The network must remain operational if the IPS is turned off or disabled. Which of the following would describe this configuration?',
        A: 'Containerization',
        B: 'Load balancing',
        C: 'Fail open',
        D: 'Tunneling',
        Correct: 'C',
        Explanation: 'Fail open ensures network traffic continues if the IPS fails, maintaining operational continuity as required.'
    },
    {
        Question: 'Which of the following describes the process of hiding data from others by embedding the data inside of a different media type?',
        A: 'Hashing',
        B: 'Obfuscation',
        C: 'Encryption',
        D: 'Masking',
        Correct: 'B',
        Explanation: 'Obfuscation hides data within another media type (e.g., steganography), distinct from hashing, encryption, or masking techniques.'
    },
    {
        Question: 'Which of the following vulnerabilities would be the MOST significant security concern when protecting against a hacktivist?',
        A: 'Data center access with only one authentication factor',
        B: 'Spoofing of internal IP addresses when accessing an intranet server',
        C: 'Employee VPN access uses a weak encryption cipher',
        D: 'Lack of patch updates on an Internet-facing database server',
        Correct: 'D',
        Explanation: 'An unpatched Internet-facing server is a prime target for hacktivists, offering easy external access to sensitive data, unlike internal vulnerabilities.'
    },
    {
        Question: 'A company is installing a security appliance to protect the organization\'s web-based applications from attacks such as SQL injections and unexpected input. Which of the following would BEST describe this appliance?',
        A: 'WAF',
        B: 'VPN concentrator',
        C: 'UTM',
        D: 'SASE',
        Correct: 'A',
        Explanation: 'A WAF (Web Application Firewall) specifically protects web applications from SQL injections and invalid inputs, tailored to this need.'
    },
    {
        Question: 'Which of the following would be the BEST way to determine if files have been modified after the forensics data acquisition process has occurred?',
        A: 'Use a tamper seal on all storage devices',
        B: 'Create a hash of the data',
        C: 'Image each storage device for future comparison',
        D: 'Take screenshots of file directories with file sizes',
        Correct: 'B',
        Explanation: 'Creating a hash provides a quick, reliable way to verify data integrity, detecting any modifications post-acquisition efficiently.'
    },
    {
        Question: 'A system administrator is implementing a password policy that would require letters, numbers, and special characters to be included in every password. Which of the following controls MUST be in place to enforce this policy?',
        A: 'Length',
        B: 'Expiration',
        C: 'Reuse',
        D: 'Complexity',
        Correct: 'D',
        Explanation: 'Complexity enforces the use of diverse character types in passwords, directly aligning with the policy’s requirements.'
    },
    {
        Question: 'Which of the following would a company follow to deploy a weekly operating system patch?',
        A: 'Tabletop exercise',
        B: 'Penetration testing',
        C: 'Change management',
        D: 'Internal audit',
        Correct: 'C',
        Explanation: 'Change management governs the controlled deployment of patches, ensuring systematic and secure updates to the OS.'
    },
    {
        Question: 'Which of the following would be the MOST likely result of plaintext application communication?',
        A: 'Buffer overflow',
        B: 'Replay attack',
        C: 'Resource consumption',
        D: 'Directory traversal',
        Correct: 'B',
        Explanation: 'Plaintext communication enables replay attacks by allowing attackers to capture and reuse unencrypted data easily.'
    },
    {
        Question: 'A system administrator believes that certain configuration files on a Linux server have been modified from their original state. The administrator has reverted the configurations to their original state, but he would like to be notified if they are changed again. Which of the following would be the BEST way to provide this functionality?',
        A: 'HIPS',
        B: 'File integrity monitoring',
        C: 'Application allow list',
        D: 'WAF',
        Correct: 'B',
        Explanation: 'File integrity monitoring alerts on changes to specific files, meeting the need to detect future modifications to configurations.'
    },
    {
        Question: 'A security administrator is updating the network infrastructure to support 802.1X. Which of the following would be the BEST choice for this configuration?',
        A: 'LDAP',
        B: 'SIEM',
        C: 'SNMP traps',
        D: 'SPF',
        Correct: 'A',
        Explanation: 'LDAP (Lightweight Directory Access Protocol) supports 802.1X authentication by providing centralized credential management.'
    },
    {
        Question: 'A company owns a time clock appliance, but the time clock doesn’t provide any access to the operating system and it doesn\'t provide a method to upgrade the firmware. Which of the following describes this appliance?',
        A: 'End-of-life',
        B: 'ICS',
        C: 'SDN',
        D: 'Embedded system',
        Correct: 'D',
        Explanation: 'An embedded system typically lacks OS access or firmware upgrade options, matching the time clock’s description.'
    },
    {
        Question: 'A company has deployed laptops to all employees, and each laptop is enumerated during each login. Which of the following is supported with this configuration?',
        A: 'If the laptop hardware is modified, the security team is alerted',
        B: 'Any malware identified on the system is automatically deleted',
        C: 'Users are required to use at least two factors of authentication',
        D: 'The laptop is added to a private VLAN after the login process',
        Correct: 'A',
        Explanation: 'Enumeration tracks hardware and software, alerting the security team to modifications, but doesn’t address malware, authentication, or VLANs.'
    },
    {
        Question: 'A security manager believes that an employee is using their laptop to circumvent the corporate Internet security controls through the use of a cellular hotspot. Which of the following could be used to validate this belief? (Select TWO)',
        A: 'HIPS',
        B: 'UTM logs',
        C: 'Web application firewall events',
        D: 'Host-based firewall logs',
        E: 'Next-generation firewall logs',
        Correct: 'A, D',
        Explanation: 'HIPS and host-based firewall logs on the laptop can reveal external traffic via a hotspot, unlike network-based logs bypassed by cellular use.'
    },
    {
        Question: 'An application developer is creating a mobile device app that will require a true random number generator and real-time memory encryption. Which of the following technologies would be the BEST choice for this app?',
        A: 'HSM',
        B: 'Secure enclave',
        C: 'NGFW',
        D: 'Self-signed certificates',
        Correct: 'B',
        Explanation: 'A secure enclave provides hardware-based random number generation and memory encryption, ideal for mobile app security needs.'
    },
    {
        Question: 'Which of the following would be a common result of a successful vulnerability scan?',
        A: 'Usernames and password hashes from a server',
        B: 'A list of missing software patches',
        C: 'A copy of image files from a private file share',
        D: 'The BIOS configuration of a server',
        Correct: 'B',
        Explanation: 'Vulnerability scans identify missing patches to highlight security gaps, not sensitive data or hardware configurations.'
    },
    {
        Question: 'When connected to the wireless network, users at a remote site receive an IP address which is not part of the corporate address scheme. Communication over this network is also slower than the wireless connections elsewhere in the building. Which of the following would be the MOST likely reason for these issues?',
        A: 'Rogue access point',
        B: 'Domain hijack',
        C: 'DDoS',
        D: 'Encryption is enabled',
        Correct: 'A',
        Explanation: 'A rogue access point assigns non-corporate IPs and may degrade performance, explaining both symptoms observed.'
    },
    {
        Question: 'A company has identified a compromised server, and the security team would like to know if an attacker has used this device to move between systems. Which of the following would be the BEST way to provide this information?',
        A: 'DNS server logs',
        B: 'Penetration test',
        C: 'NetFlow logs',
        D: 'Email metadata',
        Correct: 'C',
        Explanation: 'NetFlow logs track network traffic, revealing if the compromised server communicated with other systems, aiding lateral movement analysis.'
    },
    {
        Question: 'A system administrator has protected a set of system backups with an encryption key. The system administrator used the same key when restoring files from this backup. Which of the following would BEST describe this encryption type?',
        A: 'Asymmetric',
        B: 'Key escrow',
        C: 'Symmetric',
        D: 'Out-of-band key exchange',
        Correct: 'C',
        Explanation: 'Symmetric encryption uses the same key for both encryption and decryption, as described in the backup process.'
    },
    {
        Question: 'A new malware variant takes advantage of a vulnerability in a popular email client. Once installed, the malware forwards all email attachments with credit card information to an external email address. Which of the following would limit the scope of this attack?',
        A: 'Enable MFA on the email client',
        B: 'Scan outgoing traffic with DLP',
        C: 'Require users to enable the VPN when using email',
        D: 'Update the list of malicious URLs in the firewall',
        Correct: 'B',
        Explanation: 'DLP scans and blocks outgoing sensitive data like credit card info, directly limiting the malware’s ability to exfiltrate attachments.'
    },
    {
        Question: 'An organization has identified a security breach and has removed the affected servers from the network. Which of the following is the NEXT step in the incident response process?',
        A: 'Eradication',
        B: 'Preparation',
        C: 'Recovery',
        D: 'Detection',
        E: 'Containment',
        Correct: 'A',
        Explanation: 'After containment (removing servers), eradication removes malware or threats, following the incident response sequence.'
    },
    {
        Question: 'A security administrator has been tasked with storing and protecting customer payment and shipping information for a three-year period. Which of the following would describe the source of this data?',
        A: 'Controller',
        B: 'Owner',
        C: 'Data subject',
        D: 'Processor',
        Correct: 'C',
        Explanation: 'The data subject is the individual (customer) whose personal payment and shipping data is being stored, per privacy definitions.'
    },
    {
        Question: 'Which of the following would be the main reasons why a system administrator would use a TPM when configuring full disk encryption? (Select TWO)',
        A: 'Allows the encryption of multiple volumes',
        B: 'Uses burned-in cryptographic keys',
        C: 'Stores certificates in a hardware security module',
        D: 'Maintains a copy of the CRL',
        E: 'Includes built-in protections against brute-force attacks',
        Correct: 'B, E',
        Explanation: 'TPM provides burned-in keys for secure encryption and brute-force protection, enhancing full disk encryption security.'
    },
    {
        Question: 'A security administrator is using an access control where each file or folder is assigned a security clearance level, such as “confidential” or “secret.” The security administrator then assigns a maximum security level to each user. What type of access control is used in this network?',
        A: 'Mandatory',
        B: 'Rule-based',
        C: 'Discretionary',
        D: 'Role-based',
        Correct: 'A',
        Explanation: 'Mandatory access control assigns security levels to objects and users, restricting access based on clearance, as described.'
    },
    {
        Question: 'A security administrator is reviewing a report showing a number of devices on internal networks are connecting with servers in the data center network. Which of the following security systems should be added to prevent internal systems from accessing data center devices?',
        A: 'VPN',
        B: 'IPS',
        C: 'SIEM',
        D: 'ACL',
        Correct: 'D',
        Explanation: 'An ACL (Access Control List) on routers can block internal-to-data-center traffic, enforcing network segmentation effectively.'
    },
    {
        Question: 'A financial services company is headquartered in an area with a high occurrence of tropical storms and hurricanes. Which of the following would be MOST important when restoring services disabled by a storm?',
        A: 'Disaster recovery plan',
        B: 'Stakeholder management',
        C: 'Change management',
        D: 'Retention policies',
        Correct: 'A',
        Explanation: 'A disaster recovery plan outlines restoring services post-storm, critical for managing large-scale outages in such areas.'
    },
    {
        Question: 'A user in the mail room has reported an overall slowdown of his shipping management software. An anti-virus scan did not identify any issues, but a more thorough malware scan identified a kernel driver which is not part of the original operating system installation. Which of the following malware was installed on this system?',
        A: 'Rootkit',
        B: 'Logic bomb',
        C: 'Bloatware',
        D: 'Ransomware',
        E: 'Keylogger',
        Correct: 'A',
        Explanation: 'A rootkit modifies kernel drivers to hide and persist, causing slowdowns without detection by standard antivirus, as observed.'
    },
    {
        Question: 'A virus scanner has identified a macro virus in a word processing file attached to an email. Which of the following information could be obtained from the metadata of this file?',
        A: 'IPS signature name and number',
        B: 'Operating system version',
        C: 'Date and time when the file was created',
        D: 'Alert disposition',
        Correct: 'C',
        Explanation: 'File metadata typically includes creation date and time, not security tool data or OS specifics, making it the relevant choice.'
    },
    {
        Question: 'When a person enters a data center facility, they must check-in before they are allowed to move further into the building. People who are leaving must be formally checked-out before they are able to exit the building. Which of the following would BEST facilitate this process?',
        A: 'Access control vestibule',
        B: 'Air gap',
        C: 'Pressure sensors',
        D: 'Bollards',
        Correct: 'A',
        Explanation: 'An access control vestibule manages entry and exit with check-in/out procedures, ideal for secure data center access control.'
    },
    {
        Question: 'A security administrator has discovered an employee exfiltrating confidential company information by embedding data within image files and emailing the images to a third-party. Which of the following would best describe this activity?',
        A: 'Digital signatures',
        B: 'Steganography',
        C: 'Salting',
        D: 'Data masking',
        Correct: 'B',
        Explanation: 'Steganography hides data within images, matching the method used for exfiltrating confidential information via email.'
    },
    {
        Question: 'A third-party has been contracted to perform a penetration test on a company\'s public web servers. The testing company has been provided with the external IP addresses of the servers. Which of the following would describe this scenario?',
        A: 'Defensive',
        B: 'Active reconnaissance',
        C: 'Partially known environment',
        D: 'Regulatory',
        Correct: 'C',
        Explanation: 'A partially known environment test provides limited info (IP addresses), simulating an attacker with some knowledge, as described.'
    },
    {
        Question: 'Which of the following would be the best way to describe the estimated number of laptops that might be stolen in a fiscal year?',
        A: 'ALE',
        B: 'SLE',
        C: 'ARO',
        D: 'MTTR',
        Correct: 'C',
        Explanation: 'ARO (Annualized Rate of Occurrence) estimates the number of events (e.g., laptop thefts) per year, fitting the question’s focus.'
    },
    {
        Question: 'A finance company is legally required to maintain seven years of tax records for all of their customers. Which of the following would be the BEST way to implement this requirement?',
        A: 'Automate a script to remove all tax information more than seven years old',
        B: 'Print and store all tax records in a seven-year cycle',
        C: 'Allow users to download tax records from their account login',
        D: 'Create a separate daily backup archive for all applicable tax records',
        Correct: 'D',
        Explanation: 'A separate daily backup archive ensures tax records are preserved securely for seven years, meeting legal retention needs efficiently.'
    },
    {
        Question: 'A system administrator is designing a data center for an insurance company’s new public cloud and would like to automatically rotate encryption keys on a regular basis. Which of the following would provide this functionality?',
        A: 'TPM',
        B: 'Key management system',
        C: 'Secure enclave',
        D: 'XDR',
        Correct: 'B',
        Explanation: 'A key management system automates key rotation, ensuring secure and regular updates in a cloud environment.'
    },
    {
        Question: 'A newly installed IPS is flagging a legitimate corporate application as malicious network traffic. Which of the following would be the BEST way to resolve this issue?',
        A: 'Disable the IPS signature',
        B: 'Block the application',
        C: 'Log all IPS events',
        D: 'Tune the IPS alerts',
        Correct: 'D',
        Explanation: 'Tuning IPS alerts adjusts detection to exclude legitimate traffic, resolving false positives without disabling security.'
    },
    {
        Question: 'A security administrator has identified an internally developed application which allows modification of SQL queries through the web-based front-end. Which of the following changes would resolve this vulnerability?',
        A: 'Store all credentials as salted hashes',
        B: 'Verify the application\'s digital signature',
        C: 'Validate all application input',
        D: 'Obfuscate the application\'s source code',
        Correct: 'C',
        Explanation: 'Validating input prevents SQL injection by ensuring only safe data is processed, directly addressing the vulnerability.'
    },
    {
        Question: 'A system administrator is implementing a fingerprint scanner to provide access to the data center. Which of the following authentication technologies would be associated with this access?',
        A: 'Digital signature',
        B: 'Hard authentication token',
        C: 'Security key',
        D: 'Something you are',
        Correct: 'D',
        Explanation: 'A fingerprint scanner uses biometrics, categorized as "something you are," for authentication.'
    },
    {
        Question: 'The IT department of a transportation company maintains an on-site inventory of chassis-based network switch interface cards. If a failure occurs, the on-site technician can replace the interface card and have the system running again in sixty minutes. Which of the following BEST describes this recovery metric?',
        A: 'MTBF',
        B: 'MTTR',
        C: 'RPO',
        D: 'RTO',
        Correct: 'B',
        Explanation: 'MTTR (Mean Time to Repair) measures the time to restore a system, here 60 minutes, after a failure.'
    },
    {
        Question: 'A company maintains a server farm in a large data center. These servers are used internally and are not accessible from outside of the data center. The security team has discovered a group of servers was breached before the latest security patches were applied. Breach attempts were not logged on any other servers. Which of these threat actors would be MOST likely involved in this breach?',
        A: 'Organized crime',
        B: 'Insider',
        C: 'Nation state',
        D: 'Unskilled attacker',
        Correct: 'B',
        Explanation: 'An insider, with internal access, could breach unpatched servers without external logs, unlike external actors.'
    },
    {
        Question: 'An organization has received a vulnerability scan report of their Internet-facing web servers showing multiple Sun Java Runtime Environment (JRE) vulnerabilities, but the server administrator has verified that JRE is not installed. Which of the following would be the BEST way to handle this report?',
        A: 'Install the latest version of JRE on the server',
        B: 'Quarantine the server and scan for malware',
        C: 'Harden the operating system of the web server',
        D: 'Ignore the JRE vulnerability alert',
        Correct: 'D',
        Explanation: 'If JRE isn’t installed, the vulnerabilities don’t apply, so ignoring the false positive is appropriate after verification.'
    },
    {
        Question: 'A user downloaded and installed a utility for compressing and decompressing files. Immediately after installing the utility, the user’s overall workstation performance degraded and it now takes twice as much time to perform any tasks on the computer. Which of the following is the BEST description of this malware infection?',
        A: 'Ransomware',
        B: 'Bloatware',
        C: 'Logic bomb',
        D: 'Trojan',
        Correct: 'D',
        Explanation: 'A Trojan, disguised as a utility, degrades performance post-installation, matching the scenario described.'
    },
    {
        Question: 'Which of the following is the process for replacing sensitive data with a non-sensitive and functional placeholder?',
        A: 'Steganography',
        B: 'Tokenization',
        C: 'Retention',
        D: 'Masking',
        Correct: 'B',
        Explanation: 'Tokenization replaces sensitive data with a functional placeholder (token), maintaining usability without exposing the original data.'
    },
    {
        Question: 'A security administrator has installed a new firewall to protect a web server VLAN. The application owner requires all web server sessions communicate over an encrypted channel. Which of these rules should the security administrator include in the firewall rulebase?',
        A: 'Source: ANY, Destination: ANY, Protocol: TCP, Port: 23, Deny',
        B: 'Source: ANY, Destination: ANY, Protocol: TCP, Port: 22, Allow',
        C: 'Source: ANY, Destination: ANY, Protocol: TCP, Port: 80, Allow',
        D: 'Source: ANY, Destination: ANY, Protocol: TCP, Port: 443, Allow',
        Correct: 'D',
        Explanation: 'Port 443 (HTTPS) enables encrypted web sessions, meeting the requirement for secure communication.'
    },
    {
        Question: 'Which of these would be used to provide multi-factor authentication?',
        A: 'USB-connected storage drive with FDE',
        B: 'Employee policy manual',
        C: 'Just-in-time permissions',
        D: 'Smart card with picture ID',
        Correct: 'D',
        Explanation: 'A smart card (something you have) with a picture ID can pair with another factor (e.g., PIN), enabling MFA.'
    },
    {
        Question: 'A company\'s network team has been asked to build an IPsec tunnel to a new business partner. Which of the following security risks would be the MOST important to consider?',
        A: 'Supply chain attack',
        B: 'Unsupported systems',
        C: 'Business email compromise',
        D: 'Typosquatting',
        Correct: 'A',
        Explanation: 'A supply chain attack could compromise the partner’s systems, risking the IPsec tunnel’s security, making it a key concern.'
    },
    {
        Question: 'A company\'s human resources team maintains a list of all employees participating in the corporate savings plan. A third-party financial company uses this information to manage stock investments for the employees. Which of the following would describe this financial company?',
        A: 'Processor',
        B: 'Owner',
        C: 'Controller',
        D: 'Custodian',
        Correct: 'A',
        Explanation: 'The financial company processes data on behalf of HR (controller), fitting the "processor" role in data privacy terms.'
    },
    {
        Question: 'A technology company is manufacturing a military-grade radar tracking system that can instantly identify any nearby unmanned aerial vehicles (UAVs). The UAV detector must be able to instantly identify and react to a vehicle without delay. Which of the following would BEST describe this tracking system?',
        A: 'RTOS',
        B: 'IoT',
        C: 'ICS',
        D: 'SDN',
        Correct: 'A',
        Explanation: 'RTOS (Real-Time Operating System) ensures instant response, critical for a radar system requiring no delay.'
    },
    {
        Question: 'An administrator is writing a script to convert an email message to a help desk ticket and assign the ticket to the correct department. Which of the following should the administrator use to complete this script?',
        A: 'Role-based access controls',
        B: 'Federation',
        C: 'Due diligence',
        D: 'Orchestration',
        Correct: 'D',
        Explanation: 'Orchestration automates workflows, like converting emails to tickets and routing them, streamlining the process.'
    },
    {
        Question: 'A security administrator would like a report showing how many attackers are attempting to use a known vulnerability to gain access to a corporate web server. Which of the following should be used to gather this information?',
        A: 'Application log',
        B: 'Metadata',
        C: 'IPS log',
        D: 'Windows log',
        Correct: 'C',
        Explanation: 'IPS logs track intrusion attempts, including known vulnerabilities targeting the web server, providing the needed data.'
    },
    {
        Question: 'During a ransomware outbreak, an organization was forced to rebuild database servers from known good backup systems. In which of the following incident response phases were these database servers brought back online?',
        A: 'Recovery',
        B: 'Lessons learned',
        C: 'Containment',
        D: 'Detection',
        Correct: 'A',
        Explanation: 'Recovery restores systems from backups after containment, aligning with bringing servers back online post-ransomware.'
    },
    {
        Question: 'A security administrator is installing a web server with a newly built operating system. Which of the following would be the best way to harden this OS?',
        A: 'Create a backup schedule',
        B: 'Install a device certificate',
        C: 'Remove unnecessary software',
        D: 'Disable power management features',
        Correct: 'C',
        Explanation: 'Removing unnecessary software reduces attack surfaces, a key step in OS hardening for security.'
    },
    {
        Question: 'A network IPS has created a log entry showing an attempt to execute "SELECT * FROM users WHERE username=\'x\' or \'x\'=\'x\' AND password=\'x\' or \'x\'=\'x\'" against a server. Which of the following would describe this log entry?',
        A: 'Phishing',
        B: 'Brute force',
        C: 'SQL injection',
        D: 'Cross-site scripting',
        Correct: 'C',
        Explanation: 'The query exploits SQL logic to bypass authentication, a classic SQL injection attack, as logged by the IPS.'
    },
    {
        Question: 'An incident response team would like to validate their disaster recovery plans without making any changes to the infrastructure. Which of the following would be the best course of action?',
        A: 'Tabletop exercise',
        B: 'Hot site fail-over',
        C: 'Simulation',
        D: 'Penetration test',
        Correct: 'A',
        Explanation: 'A tabletop exercise tests plans through discussion without infrastructure changes, ideal for validation.'
    },
    {
        Question: 'A system administrator has installed a new firewall between the corporate user network and the data center network. When the firewall is turned on with the default settings, users complain that the application in the data center is no longer working. Which of the following would be the BEST way to correct this application issue?',
        A: 'Create a single firewall rule with an explicit deny',
        B: 'Build a separate VLAN for the application',
        C: 'Create firewall rules that match the application traffic flow',
        D: 'Enable firewall threat blocking',
        Correct: 'C',
        Explanation: 'Custom firewall rules allow specific application traffic, resolving access issues caused by default blocking.'
    },
    {
        Question: 'Which of these would be used to provide HA for a web-based database application?',
        A: 'SIEM',
        B: 'UPS',
        C: 'DLP',
        D: 'VPN concentrator',
        Correct: 'B',
        Explanation: 'A UPS ensures power continuity, providing high availability (HA) by preventing downtime during outages.'
    },
    {
        Question: 'Each year, a certain number of laptops are lost or stolen and must be replaced by the company. Which of the following would describe the total cost the company spends each year on laptop replacements?',
        A: 'SLE',
        B: 'SLA',
        C: 'ALE',
        D: 'ARO',
        Correct: 'C',
        Explanation: 'ALE (Annual Loss Expectancy) calculates the total yearly cost of losses, like laptop replacements, based on frequency and cost per event.'
    },
    {
        Question: 'Sam would like to send an email to Jack and have Jack verify that Sam was the sender of the email. Which of these should Sam use to provide this verification?',
        A: 'Digitally sign with Sam’s private key',
        B: 'Digitally sign with Sam’s public key',
        C: 'Digitally sign with Jack’s private key',
        D: 'Digitally sign with Jack’s public key',
        Correct: 'A',
        Explanation: 'Signing with Sam’s private key allows Jack to verify the sender using Sam’s public key, ensuring authenticity.'
    },
    {
        Question: 'The contract of a long-term temporary employee is ending. Which of these would be the MOST important part of the off-boarding process?',
        A: 'Perform an on-demand audit of the user’s privileges',
        B: 'Archive the decryption keys associated with the user account',
        C: 'Document the user’s outstanding tasks',
        D: 'Obtain a signed copy of the Acceptable Use Policies',
        Correct: 'B',
        Explanation: 'Archiving decryption keys ensures data access post-departure, critical for continuity and security in off-boarding.'
    },
    {
        Question: 'A cybersecurity analyst has been asked to respond to a denial of service attack against a web server, and the analyst has collected the log files and data from the server. Which of the following would allow a future analyst to verify the data as original and unaltered?',
        A: 'E-discovery',
        B: 'Root cause analysis',
        C: 'Legal hold',
        D: 'Data hashing',
        Correct: 'D',
        Explanation: 'Data hashing creates a unique fingerprint, enabling verification of data integrity and authenticity later.'
    },
    {
        Question: 'A security administrator is reviewing authentication logs showing a large number of accounts with at least three failed authentication attempts during the previous week. Which of the following would BEST explain this report data?',
        A: 'Downgrade attack',
        B: 'Phishing',
        C: 'Injection',
        D: 'Spraying',
        Correct: 'D',
        Explanation: 'Password spraying targets many accounts with few attempts each, matching the pattern of multiple failed logins.'
    },
    {
        Question: 'A security administrator has been asked to block all browsing to casino gaming websites. Which of the following would be the BEST way to implement this requirement?',
        A: 'Tune the IPS signatures',
        B: 'Block port tcp/443 on the firewall',
        C: 'Configure 802.1X for web browsing',
        D: 'Add a content filter rule',
        Correct: 'D',
        Explanation: 'A content filter rule blocks specific website categories like gaming, offering precise control over browsing.'
    },
    {
        Question: 'A company is experiencing downtime and outages when application patches and updates are deployed during the week. Which of the following would help to resolve these issues?',
        A: 'Onboarding considerations',
        B: 'Incident response policies',
        C: 'Change management procedures',
        D: 'Decentralized governance',
        Correct: 'C',
        Explanation: 'Change management schedules and tests updates to minimize downtime, addressing the deployment issues.'
    },
    {
        Question: 'A company is implementing a series of steps to follow when responding to a security event. Which of the following would provide this set of processes and procedures?',
        A: 'MDM',
        B: 'DLP',
        C: 'Playbook',
        D: 'Zero trust',
        Correct: 'C',
        Explanation: 'A playbook outlines specific response steps for security events, providing structured guidance.'
    },
    {
        Question: 'A transportation company maintains a scheduling application and a database in a virtualized cloud-based environment. Which of the following would be the BEST way to backup these services?',
        A: 'Journaling',
        B: 'Snapshot',
        C: 'RTOS',
        D: 'Containerization',
        Correct: 'B',
        Explanation: 'Snapshots capture the state of virtualized systems, offering an efficient backup method for cloud-based services.'
    },
    {
        Question: 'In an environment using discretionary access controls, which of these would control the rights and permissions associated with a file or directory?',
        A: 'Administrator',
        B: 'Owner',
        C: 'Group',
        D: 'System',
        Correct: 'B',
        Explanation: 'In discretionary access control, the owner sets permissions for files or directories, controlling access rights.'
    },
    {
        Question: 'A security administrator has installed a network-based DLP solution to determine if file transfers contain PII. Which of the following describes the data during the file transfer?',
        A: 'In-use',
        B: 'In-transit',
        C: 'Highly available',
        D: 'At-rest',
        Correct: 'B',
        Explanation: 'Data in transit is being transferred, the state monitored by the DLP during file transfers for PII.'
    },
    {
        Question: 'A medical imaging company would like to connect all remote locations together with high speed network links. The network connections must maintain high throughput rates and must always be available during working hours. In which of the following should these requirements be enforced with the network provider?',
        A: 'Service level agreement',
        B: 'Memorandum of understanding',
        C: 'Non-disclosure agreement',
        D: 'Acceptable use policy',
        Correct: 'A',
        Explanation: 'An SLA enforces performance metrics like throughput and availability with the provider, meeting the stated needs.'
    },
    {
        Question: 'A company is implementing a security awareness program for their user community. Which of the following should be included for additional user guidance and training?',
        A: 'Daily firewall exception reporting',
        B: 'Information on proper password management',
        C: 'Periodic vulnerability scanning of external services',
        D: 'Adjustments to annualized loss expectancy',
        Correct: 'B',
        Explanation: 'Password management training enhances user security practices, a key component of awareness programs.'
    },
    {
        Question: 'A security administrator is preparing a phishing email as part of a periodic employee security awareness campaign. The email is spoofed to appear as an unknown third-party and asks employees to immediately click a link or their state licensing will be revoked. Which of the following should be the expected response from the users?',
        A: 'Delete the message',
        B: 'Click the link and make a note of the URL',
        C: 'Forward the message to others in the department',
        D: 'Report the suspicious link to the help desk',
        Correct: 'D',
        Explanation: 'Reporting suspicious emails to the help desk is the trained response, aiding security awareness and incident handling.'
    },
    {
        Question: 'A security administrator would like to minimize the number of certificate status checks made by web site clients to the certificate authority. Which of the following would be the BEST option for this requirement?',
        A: 'OCSP stapling',
        B: 'Self-signed certificates',
        C: 'CRL',
        D: 'Wildcards',
        Correct: 'A',
        Explanation: 'OCSP stapling includes status in the handshake, reducing direct CA checks by clients, meeting the goal.'
    },
    {
        Question: 'A company is concerned their EDR solution will not be able to stop more advanced ransomware variants. Technicians have created a backup and restore utility to get most systems up and running less than an hour after an attack. What type of security control is associated with this restore process?',
        A: 'Directive',
        B: 'Compensating',
        C: 'Preventive',
        D: 'Detective',
        Correct: 'B',
        Explanation: 'A compensating control mitigates failure of another (EDR), here via rapid restore, offsetting ransomware impact.'
    },
    {
        Question: 'To upgrade an internal application, the development team provides the operations team with instructions for backing up, patching the application, and reverting the patch if needed. The operations team schedules a date for the upgrade, informs the business divisions, and tests the upgrade process after completion. Which of the following describes this process?',
        A: 'Code signing',
        B: 'Continuity planning',
        C: 'Usage auditing',
        D: 'Change management',
        Correct: 'D',
        Explanation: 'Change management governs planned upgrades with scheduling, testing, and rollback options, as described.'
    },
    {
        Question: 'A company is implementing a public file-storage and cloud-based sharing service, and would like users to authenticate with an existing account on a trusted third-party web site. Which of the following should the company implement?',
        A: 'SSO',
        B: 'Federation',
        C: 'Least privilege',
        D: 'Discretionary access controls',
        Correct: 'B',
        Explanation: 'Federation enables authentication via a trusted third-party, integrating external accounts with the service.'
    },
    {
        Question: 'A system administrator is viewing output from Microsoft’s System File Checker indicating repairs to corrupted system files like kernel32.dll. Which of the following malware types is the MOST likely cause of this output?',
        A: 'Ransomware',
        B: 'Logic bomb',
        C: 'Rootkit',
        D: 'Keylogger',
        Correct: 'C',
        Explanation: 'Rootkits alter core system files like kernel32.dll, triggering SFC repairs, consistent with the observed corruption.'
    },
    {
        Question: 'What type of vulnerability would be associated with log information showing a GET request attempting to access "../../Windows/system.ini"?',
        A: 'Buffer overflow',
        B: 'Directory traversal',
        C: 'DoS',
        D: 'Cross-site scripting',
        Correct: 'B',
        Explanation: 'The request uses "../" to navigate file paths, a directory traversal attack aiming to access restricted files.'
    },
    {
        Question: 'A developer has created an application to store password information in a database. Which of the following BEST describes a way of protecting these credentials by adding random data to the password?',
        A: 'Hashing',
        B: 'Data masking',
        C: 'Salting',
        D: 'Asymmetric encryption',
        Correct: 'C',
        Explanation: 'Salting adds random data to passwords before hashing, enhancing security against precomputed attacks.'
    },
    {
        Question: 'Which of the following processes provides ongoing building and testing of newly written code?',
        A: 'Continuous integration',
        B: 'Continuity of operations',
        C: 'Version control',
        D: 'Race condition',
        Correct: 'A',
        Explanation: 'Continuous integration automates building and testing new code, ensuring ongoing development quality.'
    },
    {
        Question: 'Which of the following BEST describes a responsibility matrix?',
        A: 'A visual summary of cloud provider accountability',
        B: 'Identification of tasks at each step of a project plan',
        C: 'A list of cybersecurity requirements based on the identified risks',
        D: 'Ongoing group discussions regarding cybersecurity',
        Correct: 'B',
        Explanation: 'A responsibility matrix outlines tasks and roles per project step, clarifying accountability, though often misattributed to cloud contexts.'
    },
    {
        Question: 'A security administrator is implementing an authentication system for the company. Which of the following would be the best choice for validating login credentials for all usernames and passwords in the authentication system?',
        A: 'CA',
        B: 'SIEM',
        C: 'LDAP',
        D: 'WAF',
        Correct: 'C',
        Explanation: 'LDAP centralizes credential validation, ideal for managing usernames and passwords across an authentication system.'
    },
    {
        Question: 'A technician is reviewing IPS log information showing a rejected HTTP request from 10.1.111.7 to 192.168.11.1 with a "Suspicious Webdav OPTIONS Method Request" alert. Which of the following can be associated with this log information? (Select TWO)',
        A: 'The attacker sent a non-authenticated BGP packet to trigger the IPS',
        B: 'The source of the attack is 192.168.11.1',
        C: 'The event was logged but no packets were dropped',
        D: 'The source of the attack is 10.1.111.7',
        E: 'The attacker sent an unusual HTTP packet to trigger the IPS',
        Correct: 'D, E',
        Explanation: 'The log identifies 10.1.111.7 as the source and flags an unusual HTTP packet (Webdav OPTIONS), which was rejected by the IPS.'
    },
    {
        Question: 'A company has contracted with a third-party to provide penetration testing services. The service includes a port scan of each externally-facing device. This is an example of:',
        A: 'Initial exploitation',
        B: 'Privilege escalation',
        C: 'Known environment',
        D: 'Active reconnaissance',
        Correct: 'D',
        Explanation: 'Active reconnaissance involves probing (e.g., port scanning) to gather info, as performed by the third-party.'
    },
    {
        Question: 'An access point in a corporate headquarters office has a configuration with Security Mode: WEP-PSK, among other settings. Which of the following would apply to this configuration?',
        A: 'Invalid frequency band',
        B: 'Weak encryption',
        C: 'Incorrect IP address and subnet mask',
        D: 'Invalid software version',
        Correct: 'B',
        Explanation: 'WEP-PSK uses outdated, weak encryption, vulnerable to attacks, unlike other configuration elements which appear valid.'
    },
    {
        Question: 'An attacker has gained access to an application through the use of packet captures. Which of the following would be MOST likely used by the attacker?',
        A: 'Overflow',
        B: 'Forgery',
        C: 'Replay',
        D: 'Injection',
        Correct: 'C',
        Explanation: 'Replay attacks reuse captured packets to gain access, directly tied to the use of packet captures.'
    },
];
