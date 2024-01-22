var questionData = [
  {
    Question: 'A technician installed a known-good, compatible motherboard on a new laptop. However, the motherboard is not working on the laptop. Which of the following should the technician MOST likely have done to prevent damage?',
    A: 'Removed all jewelry',
    B: 'Completed an inventory of tools before use',
    C: 'Practiced electrical fire safety',
    D: 'Connected a proper ESD strap',
    Correct: 'D'
  },
  {
    Question: 'A technician receives a ticket indicating the user cannot resolve external web pages. However, specific IP addresses are working. Which of the following does the technician MOST likely need to change on the workstation to resolve the issue?',
    A: 'Default gateway',
    B: 'Host address',
    C: 'Name server',
    D: 'Subnet mask',
    Correct: 'A'
  },
  {
    Question: 'A technician needs to recommend the best backup method that will mitigate ransomware attacks. Only a few files are regularly modified; however, storage space is a concern. Which of the following backup methods would BEST address these concerns?',
    A: 'Full',
    B: 'Differential',
    C: 'Off-site',
    D: 'Grandfather-father-son',
    Correct: 'B'
  },
  {
    Question: 'A change advisory board did not approve a requested change due to the lack of alternative actions if implementation failed. Which of the following should be updated before requesting approval again?',
    A: 'Scope of change',
    B: 'Risk level',
    C: 'Rollback plan',
    D: 'End user acceptance',
    Correct: 'C'
  },
  {
    Question: 'A user is having phone issues after installing a new application that claims to optimize performance. The user downloaded the application directly from the vendor\'s website and is now experiencing high network utilization and is receiving repeated security warnings. Which of the following should the technician perform FIRST to mitigate the issue?',
    A: 'Reset the phone to factory settings',
    B: 'Uninstall the fraudulent application',
    C: 'Increase the data plan limits',
    D: 'Disable the mobile hotspot',
    Correct: 'B'
  },
  {
    Question: 'A user enabled a mobile device\'s screen lock function with pattern unlock. The user is concerned someone could access the mobile device by repeatedly attempting random patterns to unlock the device. Which of the following features BEST addresses the user\'s concern?',
    A: 'Remote wipe',
    B: 'Anti-malware',
    C: 'Device encryption',
    D: 'Failed login restrictions',
    Correct: 'A'
  },
  {
    Question: 'When a user calls in to report an issue, a technician submits a ticket on the user\'s behalf. Which of the following practices should the technician use to make sure the ticket is associated with the correct user?',
    A: 'Have the user provide a callback phone number to be added to the ticket',
    B: 'Assign the ticket to the department\'s power user',
    C: 'Register the ticket with a unique user identifier',
    D: 'Provide the user with a unique ticket number that can be referenced on subsequent calls',
    Correct: 'D'
  },
  {
    Question: 'Which of the following is the MOST cost-effective version of Windows 10 that allows remote access through Remote Desktop?',
    A: 'Home',
    B: 'Pro for Workstations',
    C: 'Enterprise',
    D: 'Pro',
    Correct: 'D'
  },
  {
    Question: 'Once weekly a user needs Linux to run a specific open-source application that is not available for the currently installed Windows platform. The user has limited bandwidth throughout the day. Which of the following solutions would be the MOST efficient, allowing for parallel execution of the Linux application and Windows applications?',
    A: 'Install and run Linux and the required application in a PaaS cloud environment',
    B: 'Install and run Linux and the required application as a virtual machine installed under the Windows OS',
    C: 'Use a swappable drive bay for the boot drive and install each OS with applications on its own drive. Swap the drives as needed',
    D: 'Set up a dual-boot system by selecting the option to install Linux alongside Windows',
    Correct: 'B'
  },
  {
    Question: 'A technician at a customer site is troubleshooting a laptop. A software update needs to be downloaded but the company\'s proxy is blocking traffic to the update site. Which of the following should the technician perform?',
    A: 'Change the DNS address to 1.1.1.1',
    B: 'Update Group Policy',
    C: 'Add the site to the client\'s exceptions list',
    D: 'Verify the software license is current',
    Correct: 'C'
  },
  {
    Question: "A technician is installing new software on a macOS computer. Which of the following file types will the technician MOST likely use?",
    A: ".deb",
    B: ".vbs",
    C: ".exe",
    D: ".app",
    Correct: "D",
    Explanation: "The file type that the technician will MOST likely use when installing new software on a macOS computer is .app. This is because .app is the file extension for applications on macOS."
  },
  {
    Question: "Which of the following is the MOST important environmental concern inside a data center?",
    A: "Battery disposal",
    B: "Electrostatic discharge mats",
    C: "Toner disposal",
    D: "Humidity levels",
    Correct: "D",
    Explanation: "One of the most important environmental concerns inside a data center is the level of humidity. High levels of humidity can cause condensation, which can result in corrosion of components and other equipment. Low levels of humidity can cause static electricity to build up, potentially leading to electrostatic discharge (ESD) and damage to components. Therefore, it is crucial to maintain a relative humidity range of 40-60% in a data center to protect the equipment and ensure proper operation."
  },
  {
    Question: "A systems administrator is setting up a Windows computer for a new user Corporate policy requires a least privilege environment. The user will need to access advanced features and configuration settings for several applications. Which of the following BEST describes the account access level the user will need?",
    A: "Power user account",
    B: "Standard account",
    C: "Guest account",
    D: "Administrator account",
    Correct: "B",
    Explanation: "The account access level the user will need to access advanced features and configuration settings for several applications while adhering to corporate policy requiring a least privilege environment is a standard account. This is because a standard account allows the user to access advanced features and configuration settings for several applications while adhering to corporate policy requiring a least privilege environment."
  },
  {
    Question: "A change advisory board just approved a change request. Which of the following is the MOST likely next step in the change process?",
    A: "End user acceptance",
    B: "Perform risk analysis",
    C: "Communicate to stakeholders",
    D: "Sandbox testing",
    Correct: "A",
    Explanation: "The most likely next step in the change process after a change advisory board approves a change request is end user acceptance."
  },
  {
    Question: "A user reports that the hard drive activity light on a Windows 10 desktop computer has been steadily lit for more than an hour, and performance is severely degraded. Which of the following tabs in Task Manager would contain the information a technician would use to identify the cause of this issue?",
    A: "Services",
    B: "Processes",
    C: "Performance",
    D: "Startup",
    Correct: "B",
    Explanation: "Processes tab in Task Manager would contain the information a technician would use to identify the cause of this issue. The Processes tab in Task Manager displays all the processes running on the computer, including the CPU and memory usage of each process. The technician can use this tab to identify the process that is causing the hard drive activity light to remain lit and the performance degradation."
  },
  {
    Question: "A user contacted the help desk to report pop-ups on a company workstation indicating the computer has been infected with 137 viruses and payment is needed to remove them. The user thought the company-provided antivirus software would prevent this issue. The help desk ticket states that the user only receives these messages when first opening the web browser. Which of the following steps would MOST likely resolve the issue? (Select TWO)",
    A: "Scan the computer with the company-provided antivirus software",
    B: "Install a new hard drive and clone the user's drive to it",
    C: "Deploy an ad-blocking extension to the browser.",
    D: "Uninstall the company-provided antivirus software",
    E: "Click the link in the messages to pay for virus removal",
    F: "Perform a reset on the user's web browser",
    Correct: ["C", "F"],
    Explanation: "The most likely steps to resolve the issue are to deploy an ad-blocking extension to the browser and perform a reset on the user’s web browser. Ad-blocking extensions can help to prevent pop-ups and other unwanted content from appearing in the browser, and resetting the browser can help to remove any malicious extensions or settings that may be causing the issue."
  },
  {
    Question: "The Chief Executive Officer at a bark recently saw a news report about a high-profile cybercrime where a remote-access tool that the bank uses for support was also used in this crime. The report stated that attackers were able to brute force passwords to access systems. Which of the following would BEST limit the bark’s risk? (Select TWO)",
    A: "Enable multifactor authentication for each support account",
    B: "Limit remote access to destinations inside the corporate network",
    C: "Block all support accounts from logging in from foreign countries",
    D: "Configure a replacement remote-access tool for support cases.",
    E: "Purchase a password manager for remote-access tool users",
    F: "Enforce account lockouts after five bad password attempts",
    Correct: ["A", "F"],
    Explanation: "The best ways to limit the bank’s risk are to enable multifactor authentication for each support account and enforce account lockouts after five bad password attempts. Multifactor authentication adds an extra layer of security to the login process, making it more difficult for attackers to gain access to systems. Account lockouts after five bad password attempts can help to prevent brute force attacks by locking out accounts after a certain number of failed login attempts."
  },
  {
    Question: "A technician is asked to resize a partition on the internal storage drive of a computer running macOS. Which of the followings tools should the technician use to accomplish this task?",
    A: "Consoltf",
    B: "Disk Utility",
    C: "Time Machine",
    D: "FileVault",
    Correct: "B",
    Explanation: "The technician should use Disk Utility to resize a partition on the internal storage drive of a computer running macOS. Disk Utility is a built-in utility that allows users to manage disks, partitions, and volumes on a Mac. It can be used to resize, create, and delete partitions, as well as to format disks and volumes."
  },
  {
    Question: "A technician is working with a company to determine the best way to transfer sensitive personal information between offices when conducting business. The company currently uses USB drives and is resistant to change. The company's compliance officer states that all media at rest must be encrypted. Which of the following would be the BEST way to secure the current workflow?",
    A: "Deploy a secondary hard drive with encryption on the appropriate workstation",
    B: "Configure a hardened SFTP portal for file transfers between file servers",
    C: "Require files to be individually password protected with unique passwords",
    D: "Enable BitLocker To Go with a password that meets corporate requirements",
    Correct: "D",
    Explanation: "The BEST way to secure the current workflow of transferring sensitive personal information between offices when conducting business is to enable BitLocker To Go with a password that meets corporate requirements. This is because BitLocker To Go is a full-disk encryption feature that encrypts all data on a USB drive, which is what the company currently uses, and requires a password to access the data."
  },
  {
    Question: "A technician is configuring a new Windows laptop Corporate policy requires that mobile devices make use of full disk encryption at all limes Which of the following encryption solutions should the technician choose?",
    A: "Encrypting File System",
    B: "FileVault",
    C: "BitLocker",
    D: "Encrypted LVM",
    Correct: "C",
    Explanation: "The encryption solution that the technician should choose when configuring a new Windows laptop and corporate policy requires that mobile devices make use of full disk encryption at all times is BitLocker. This is because BitLocker is a full-disk encryption feature that encrypts all data on a hard drive and is included with Windows."
  },
  {
    Question: "Which of the following must be maintained throughout the forensic evidence life cycle when dealing with a piece of evidence?",
    A: "Acceptable use",
    B: "Chain of custody",
    C: "Security policy",
    D: "Information management",
    Correct: "B",
    Explanation: "The aspect of forensic evidence life cycle that must be maintained when dealing with a piece of evidence is chain of custody. This is because chain of custody is the documentation of the movement of evidence from the time it is collected to the time it is presented in court, and it is important to maintain the integrity of the evidence."
  },
  {
    Question: "A technician is troubleshooting a customer's PC and receives a phone call. The technician does not take the call and sets the phone to silent. Which of the following BEST describes the technician's actions?",
    A: "Avoid distractions",
    B: "Deal appropriately with customer's confidential material",
    C: "Adhere to user privacy policy",
    D: "Set and meet timelines",
    Correct: "A",
    Explanation: "The technician has taken the appropriate action by not taking the call and setting the phone to silent in order to avoid any distractions and remain focused on the task at hand. This is a good example of how to maintain focus and productivity when working on a customer's PC, and will help to ensure that the job is completed in a timely and efficient manner."
  },
  {
    Question: "An architecture firm is considering upgrading its computer-aided design (CAD) software to the newest version that forces storage of backups of all CAD files on the software's cloud server. Which of the following is MOST likely to be of concern to the IT manager?",
    A: "All updated software must be tested with alt system types and accessories",
    B: "Extra technician hours must be budgeted during installation of updates",
    C: "Network utilization will be significantly increased due to the size of CAD files",
    D: "Large update and installation files will overload the local hard drives.",
    Correct: "C",
    Explanation: "The IT manager is most likely to be concerned about network utilization being significantly increased due to the size of CAD files. Backing up all CAD files to the software’s cloud server can result in a large amount of data being transferred over the network, which can cause network congestion and slow down other network traffic."
  },
  {
    Question: "A wireless network is set up, but it is experiencing some interference from other nearby SSIDs. Which of the following can BEST resolve the interference?",
    A: "Changing channels",
    B: "Modifying the wireless security",
    C: "Disabling the SSIO broadcast",
    D: "Changing the access point name",
    Correct: "A",
    Explanation: "Changing channels can best resolve interference from other nearby SSIDs. Wireless networks operate on different channels, and changing the channel can help to avoid interference from other nearby networks."
  },
  {
    Question: "A technician suspects a rootkit has been installed and needs to be removed. Which of the following would BEST resolve the issue?",
    A: "Application updates",
    B: "Anti-malware software",
    C: "OS reinstallation",
    D: "File restore",
    Correct: "C",
    Explanation: "If a rootkit has caused a deep infection, then the only way to remove the rootkit is to reinstall the operating system. This is because rootkits are designed to be difficult to detect and remove, and they can hide in the operating system’s kernel, making it difficult to remove them without reinstalling the operating system."
  },
  {
    Question: "A customer reported that a home PC with Windows 10 installed in the default configuration is having issues loading applications after a reboot occurred in the middle of the night. Which of the following is the FIRST step in troubleshooting?",
    A: "Install alternate open-source software in place of the applications with issues",
    B: "Run both CPU and memory tests to ensure that all hardware functionality is normal",
    C: "Check for any installed patches and roll them back one at a time until the issue is resolved",
    D: "Reformat the hard drive, and then reinstall the newest Windows 10 release and all applications.",
    Correct: "C",
    Explanation: "The first step in troubleshooting is to check for any installed patches and roll them back one at a time until the issue is resolved. This can help to identify any patches that may be causing the issue and allow them to be removed."
  },
  {
    Question: "A technician has been tasked with installing a workstation that will be used for point-of-sale transactions. The point-of-sale system will process credit cards and loyalty cards. Which of the following encryption technologies should be used to secure the workstation in case of theft?",
    A: "Data-in-transit encryption",
    B: "File encryption",
    C: "USB drive encryption",
    D: "Disk encryption",
    Correct: "D",
    Explanation: "Disk encryption should be used to secure the workstation in case of theft. Disk encryption can help to protect data on the hard drive by encrypting it so that it cannot be accessed without the correct encryption key."
  },
  {
    Question: "A company installed a new backup and recovery system. Which of the following types of backups should be completed FIRST?",
    A: "Full",
    B: "Non-parity",
    C: "Differential",
    D: "Incremental",
    Correct: "A",
    Explanation: "The type of backup that should be completed FIRST after installing a new backup and recovery system is a full backup. This is because a full backup is a complete backup of all data and is the foundation for all other backups. After a full backup is completed, other types of backups, such as differential and incremental backups, can be performed."
  },
  {
    Question: "A call center technician receives a call from a user asking how to update Windows. Which of the following describes what the technician should do?",
    A: "Have the user consider using an iPad if the user is unable to complete updates",
    B: "Have the user text the user's password to the technician.",
    C: "Ask the user to click in the Search field, type Check for Updates, and then press the Enter key",
    D: "Advise the user to wait for an upcoming, automatic patch",
    Correct: "C",
    Explanation: "The technician should guide the user to update Windows through the built-in 'Check for Updates' feature. This can be done by having the user click in the Search field, type 'Check for Updates', and then press the Enter key. This will bring up the Windows Update function, which will search for any available updates and give the user the option to install them."
  },
  {
    Question: "Someone who is fraudulently claiming to be from a reputable bank calls a company employee. Which of the following describes this incident?",
    A: "Pretexting",
    B: "Spoofing",
    C: "Vishing",
    D: "Scareware",
    Correct: "C",
    Explanation: "Vishing is a type of social engineering attack where a fraudulent caller impersonates a legitimate entity, such as a bank or financial institution, in order to gain access to sensitive information. The caller will typically use a variety of techniques, such as trying to scare the target or providing false information, in order to get the target to provide the information they are after. Vishing is often used to gain access to usernames, passwords, bank account information, and other sensitive data."
  },
  {
    Question: "A company is issuing smartphones to employees and needs to ensure data is secure if the devices are lost or stolen. Which of the following provides the BEST solution?",
    A: "Anti-malware",
    B: "Remote wipe",
    C: "Locator applications",
    D: "Screen lock",
    Correct: "B",
    Explanation: "This is because remote wipe allows the data on the smartphone to be erased remotely, which helps to ensure that sensitive data does not fall into the wrong hands."
  },
  {
    Question: "A technician is setting up a SOHO wireless router. The router is about ten years old. The customer would like the most secure wireless network possible. Which of the following should the technician configure?",
    A: "WPA2 with TKIP",
    B: "WPA2 with AES",
    C: "WPA3 with AES-256",
    D: "WPA3 with AES-128",
    Correct: "B",
    Explanation: "This is because WPA2 with AES is the most secure wireless network configuration that is available on a ten-year-old SOHO wireless router."
  },
  {
    Question: "A technician has been tasked with using the fastest and most secure method of logging in to laptops. Which of the following log-in options meets these requirements?",
    A: "PIN",
    B: "Username and password",
    C: "SSO",
    D: "Fingerprint",
    Correct: "A",
    Explanation: "This is because a PIN is a fast and secure method of logging in to laptops, and it is more secure than a password because it is not susceptible to keyloggers."
  },
  {
    Question: "A technician is replacing the processor in a desktop computer. Prior to opening the computer, the technician wants to ensure the internal components are protected. Which of the following safety procedures would BEST protect the components in the PC? (Select TWO).",
    A: "Utilizing an ESD strap",
    B: "Disconnecting the computer from the power source",
    C: "Placing the PSU in an antistatic bag",
    D: "Ensuring proper ventilation",
    E: "Removing dust from the ventilation fans",
    F: "Ensuring equipment is grounded",
    Correct: ["A", "B"],
    Explanation: "The two safety procedures that would best protect the components in the PC are: Utilizing an ESD strap and Disconnecting the computer from the power source."
  },
  {
    Question: "A user's mobile phone has become sluggish. A systems administrator discovered several malicious applications on the device and reset the phone. The administrator installed MDM software. Which of the following should the administrator do to help secure the device against this threat in the future? (Select TWO).",
    A: "Prevent a device root",
    B: "Disable biometric authentication",
    C: "Require a PIN on the unlock screen",
    D: "Enable developer mode",
    E: "Block third-party application installation",
    F: "Prevent GPS spoofing",
    Correct: ["C", "E"],
    Explanation: "To help secure the device against this threat in the future, the administrator should require a PIN on the unlock screen and block third-party application installation. Requiring a PIN on the unlock screen can help to prevent unauthorized access to the device, while blocking third-party application installation can help to prevent malicious applications from being installed on the device."
  },
  {
    Question: "A company wants to remove information from past users' hard drives in order to reuse the hard drives. Which of the following is the MOST secure method?",
    A: "Reinstalling Windows",
    B: "Performing a quick format",
    C: "Using disk-wiping software",
    D: "Deleting all files from command-line interface",
    Correct: "C",
    Explanation: "Using disk-wiping software is the most secure method for removing information from past users’ hard drives in order to reuse the hard drives. Disk-wiping software can help to ensure that all data on the hard drive is completely erased and cannot be recovered."
  },
  {
    Question: "A technician is configuring a SOHO device. Company policy dictates that static IP addresses cannot be used. The company wants the server to maintain the same IP address at all times. Which of the following should the technician use?",
    A: "DHCP reservation",
    B: "Port forwarding",
    C: "DNS A record",
    D: "NAT",
    Correct: "A",
    Explanation: "The technician should use DHCP reservation to maintain the same IP address for the server at all times. DHCP reservation allows the server to obtain an IP address dynamically from the DHCP server, while ensuring that the same IP address is assigned to the server each time it requests an IP address."
  },
  {
    Question: "A user is unable to use any internet-related functions on a smartphone when it is not connected to Wi-Fi. When the smartphone is connected to Wi-Fi the user can browse the internet and send and receive email. The user is also able to send and receive text messages and phone calls when the smartphone is not connected to Wi-Fi. Which of the following is the MOST likely reason the user is unable to use the internet on the smartphone when it is not connected to Wi-Fi?",
    A: "The smartphone's line was not provisioned with a data plan",
    B: "The smartphone's SIM card has failed",
    C: "The smartphone's Bluetooth radio is disabled.",
    D: "The smartphone has too many applications open",
    Correct: "A",
    Explanation: "The smartphone’s line was not provisioned with a data plan. The user is unable to use any internet-related functions on the smartphone when it is not connected to Wi-Fi because the smartphone’s line was not provisioned with a data plan. The user can send and receive text messages and phone calls when the smartphone is not connected to Wi-Fi because these functions do not require an internet connection."
  },
  {
    Question: "A technician is investigating an employee's smartphone that has the following symptoms:\n- The device is hot even when it is not in use.\n- Applications crash, especially when others are launched\n- Certain applications, such as GPS, are in portrait mode when they should be in landscape mode. Which of the following can the technician do to MOST likely resolve these issues with minimal impact? (Select TWO).",
    A: "Turn on autorotation",
    B: "Activate airplane mode.",
    C: "Close unnecessary applications",
    D: "Perform a factory reset",
    E: "Update the device's operating system",
    F: "Reinstall the applications that have crashed.",
    Correct: ["A", "C"],
    Explanation: "The technician can close unnecessary applications and turn on autorotation to resolve these issues with minimal impact. Autorotation can help the device to switch between portrait and landscape modes automatically. Closing unnecessary applications can help to free up the device’s memory and reduce the device’s temperature."
  },
  {
    Question: "A user connects a laptop that is running Windows 10 to a docking station with external monitors when working at a desk. The user would like to close the laptop when it is docked, but the user reports it goes to sleep when it is closed. Which of the following is the BEST solution to prevent the laptop from going to sleep when it is closed and on the docking station?",
    A: "Within the Power Options of the Control Panel utility click the Change Plan Settings button for the enabled power plan and select Put the Computer to Sleep under the Plugged In category to Never",
    B: "Within the Power Options of the Control Panel utility, click the Change Plan Settings button for the enabled power plan and select Put the Computer to Sleep under the On Battery category to Never",
    C: "Within the Power Options of the Control Panel utility select the option Choose When to Turn Off the Display and select Turn Off the Display under the Plugged In category to Never",
    D: "Within the Power Options of the Control Panel utility, select the option Choose What Closing the Lid Does and select When I Close the Lid under the Plugged in category to Do Nothing",
    Correct: "D",
    Explanation: "The laptop has an additional option under power and sleep settings that desktops do not have. Switching to do nothing prevents the screen from turning off when closed."
  },
  {
    Question: "A department has the following technical requirements for a new application:\nThe company plans to upgrade from a 32-bit Windows OS to a 64-bit OS. Which of the following will the company be able to fully take advantage of after the upgrade?",
    A: "CPU",
    B: "Hard drive",
    C: "RAM",
    D: "Touch screen",
    Correct: "C",
    Explanation: "After upgrading from a 32-bit Windows OS to a 64-bit OS, the company will be able to fully take advantage of the RAM of the computer. This is because a 64-bit operating system is able to use larger amounts of RAM compared to a 32-bit operating system, which may benefit the system’s overall performance if it has more than 4GB of RAM installed."
  },
  {
    Question: "Which of the following Wi-Fi protocols is the MOST secure?",
    A: "WPA3",
    B: "WPA-AES",
    C: "WEP",
    D: "WPA-TKIP",
    Correct: "A",
    Explanation: "WPA3 is the most secure Wi-Fi protocol."
  },
  {
    Question: "A user attempts to open some files, but a message appears stating that the files are encrypted. The user was able to access these files before without receiving this message and no changes have been made within the company. Which of the following has infected the computer?",
    A: "Cryptominer",
    B: "Phishing",
    C: "Ransomware",
    D: "Keylogger",
    Correct: "C",
    Explanation: "Ransomware is malicious software that encrypts files on a computer, making them inaccessible until a ransom is paid. In this case, the user was able to access the files before without issue, and no changes have been made within the company, so it is likely that the computer was infected with ransomware."
  },
  {
    Question: "A help desk technician is troubleshooting a workstation in a SOHO environment that is running above normal system baselines. The technician discovers an unknown executable with a random string name running on the system. The technician terminates the process, and the system returns to normal operation. The technician thinks the issue was an infected file, but the antivirus is not detecting a threat. The technician is concerned other machines may be infected with this unknown virus. Which of the following is the MOST effective way to check other machines on the network for this unknown threat?",
    A: "Run a startup script that removes files by name.",
    B: "Provide a sample to the antivirus vendor.",
    C: "Manually check each machine.",
    D: "Monitor outbound network traffic.",
    Correct: "C",
    Explanation: "The most effective way to check other machines on the network for this unknown threat is to manually check each machine. This can help to identify any other machines that may be infected with the unknown virus and allow them to be cleaned."
  },
  {
    Question: "A user reports that a PC seems to be running more slowly than usual. A technician checks system resources, but disk, CPU, and memory usage seem to be fine. The technician sees that GPU temperature is extremely high. Which of the following types of malware is MOST likely to blame?",
    A: "Spyware",
    B: "Cryptominer",
    C: "Ransomware",
    D: "Boot sector virus",
    Correct: "B",
    Explanation: "The type of malware that is most likely to blame for a PC running more slowly than usual and having an extremely high GPU temperature is a 'cryptominer'. Cryptominers are a type of malware that use the resources of a computer to mine cryptocurrency. This can cause the computer to run more slowly than usual and can cause the GPU temperature to rise."
  },
  {
    Question: "Upon downloading a new ISO, an administrator is presented with the following string:\n59d15a16ce90cBcc97fa7c211b767aB\nWhich of the following BEST describes the purpose of this string?",
    A: "XSS verification",
    B: "AES-256 verification",
    C: "Hash verification",
    D: "Digital signature verification",
    Correct: "C",
    Explanation: "Hash verification is a process that verifies the integrity of a file by comparing the hash value of the downloaded file to the hash value provided by the source."
  },
  {
    Question: "Which of the following OS types provides a lightweight option for workstations that need an easy-to-use browser-based interface?",
    A: "FreeBSD",
    B: "Chrome OS",
    C: "macOS",
    D: "Windows",
    Correct: "B",
    Explanation: "Chrome OS provides a lightweight option for workstations that need an easy-to-use browser-based interface."
  },
  {
    Question: "Following the latest Windows update, PDF files are opening in Microsoft Edge instead of Adobe Reader. Which of the following utilities should be used to ensure all PDF files open in Adobe Reader?",
    A: "Network and Sharing Center",
    B: "Programs and Features",
    C: "Default Apps",
    D: "Add or Remove Programs",
    Correct: "C",
    Explanation: "Default Apps should be used to ensure all PDF files open in Adobe Reader."
  },
  {
    Question: "Which of the following provides the BEST way to secure physical access to a data center server room? (Select TWO).",
    A: "Biometric lock",
    B: "Badge reader",
    C: "USB token",
    D: "Video surveillance",
    E: "Locking rack",
    F: "Access control vestibule",
    Correct: ["A", "B"],
    Explanation: "A biometric lock requires an authorized user to provide a unique biometric identifier, such as a fingerprint, in order to gain access to the server room. A badge reader requires an authorized user to swipe an access card to gain access. Both of these methods ensure that only authorized personnel are able to access the server room."
  },
  {
    Question: "During a recent flight, an executive unexpectedly received several dog and cat pictures while trying to watch a movie via in-flight Wi-Fi on an iPhone. The executive has no records of any contacts sending pictures like these and has not seen these pictures before. To BEST resolve this issue, the executive should:",
    A: "Set AirDrop so that transfers are only accepted from known contacts",
    B: "Completely disable all wireless systems during the flight",
    C: "Discontinue using iMessage and only use secure communication applications",
    D: "Only allow messages and calls from saved contacts",
    Correct: "A",
    Explanation: "To best resolve this issue, the executive should set AirDrop so that transfers are only accepted from known contacts. AirDrop is a feature on iOS devices that allows users to share files, photos, and other data between Apple devices. By setting AirDrop so that it only accepts transfers from known contacts, the executive can ensure that unwanted files and photos are not sent to their device. Additionally, the executive should ensure that the AirDrop setting is only enabled when it is necessary, as this will protect their device from any unwanted files and photos."
  },
  {
    Question: "A user reports that antivirus software indicates a computer is infected with viruses. The user thinks this happened while browsing the internet. The technician does not recognize the interface with which the antivirus message is presented. Which of the following is the NEXT step the technician should take?",
    A: "Shut down the infected computer and swap it with another computer",
    B: "Investigate what the interface is and what triggered it to pop up",
    C: "Proceed with initiating a full scan and removal of the viruses using the presented interface",
    D: "Call the phone number displayed in the interface of the antivirus removal tool",
    Correct: "B",
    Explanation: "The technician should investigate what the interface is and what triggered it to pop up. The technician should not proceed with initiating a full scan and removal of the viruses using the presented interface or call the phone number displayed in the interface of the antivirus removal tool. Shutting down the infected computer and swapping it with another computer is not necessary at this point. It is important to investigate the issue further, including checking the legitimacy of the antivirus program and the message it is displaying."
  },
  {
    Question: "The command 'cat comptia.txt' was issued on a Linux terminal. Which of the following results should be expected?",
    A: "The contents of the text comptia.txt will be replaced with a new blank document",
    B: "The contents of the text comptia.txt would be displayed",
    C: "The contents of the text comptia.txt would be categorized in alphabetical order",
    D: "The contents of the text comptia.txt would be copied to another comptia.txt file",
    Correct: "B",
    Explanation: "The command 'cat comptia.txt' was issued on a Linux terminal. This command would display the contents of the text comptia.txt."
  },
  {
    Question: "A user's smartphone data usage is well above average. The user suspects an installed application is transmitting data in the background. Which of the following BEST addresses the user's concern?",
    A: "Operating system updates",
    B: "Remote wipe",
    C: "Antivirus",
    D: "Firewall",
    Correct: "D",
    Explanation: "A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. In this scenario, the user is concerned about an installed application transmitting data in the background, so a firewall would be the best solution to address their concern. By installing and configuring a firewall, the user can block unauthorized connections to and from the device and receive alerts whenever an application tries to access the internet."
  },
  {
    Question: "A technician is unable to join a Windows 10 laptop to a domain. Which of the following is the MOST likely reason?",
    A: "The domain's processor compatibility is not met",
    B: "The laptop has Windows 10 Home installed",
    C: "The laptop does not have an onboard Ethernet adapter",
    D: "The Laptop does not have all current Windows updates installed",
    Correct: "B",
    Explanation: "The laptop having Windows 10 Home installed is the most likely reason for the technician being unable to join it to a domain."
  },
  {
    Question: "A technician is troubleshooting an issue involving programs on a Windows 10 machine that are loading on startup but causing excessive boot times. Which of the following should the technician do to selectively prevent programs from loading?",
    A: "Right-click the Windows button, then select Run entering shell startup and clicking OK, and then move items one by one to the Recycle Bin",
    B: "Remark out entries listed HKEY_LOCAL_MACHINE>SOFTWARE>Microsoft>Windows>CurrentVersion>Run",
    C: "Manually disable all startup tasks currently listed as enabled and reboot checking for issue resolution at startup",
    D: "Open the Startup tab and methodically disable items currently listed as enabled and reboot, checking for issue resolution at each startup",
    Correct: "D",
    Explanation: "The technician should open the Startup tab and methodically disable items currently listed as enabled and reboot, checking for issue resolution at each startup."
  },
  {
    Question: "A desktop specialist needs to prepare a laptop running Windows 10 for a newly hired employee. Which of the following methods should the technician use to refresh the laptop?",
    A: "Internet-based upgrade",
    B: "Repair installation",
    C: "Clean install",
    D: "USB repair",
    E: "In-place upgrade",
    Correct: "C",
    Explanation: "The desktop specialist should use a clean install to refresh the laptop. A clean install will remove all data and applications from the laptop and install a fresh copy of Windows 10, ensuring that the laptop is ready for the newly hired employee."
  },
  {
    Question: "A technician found that an employee is mining cryptocurrency on a work desktop. The company has decided that this action violates its guidelines. Which of the following should be updated to reflect this new requirement?",
    A: "MDM",
    B: "EULA",
    C: "IRP",
    D: "AUP",
    Correct: "D",
    Explanation: "AUP (Acceptable Use Policy) should be updated to reflect this new requirement. The AUP is a document that outlines the acceptable use of technology within an organization. It is a set of rules that employees must follow when using company resources. The AUP should be updated to include a policy on cryptocurrency mining on work desktops."
  },
  {
    Question: "A user calls the help desk to report that none of the files on a PC will open. The user also indicates a program on the desktop is requesting payment in exchange for file access. A technician verifies the user's PC is infected with ransomware. Which of the following should the technician do FIRST?",
    A: "Scan and remove the malware",
    B: "Schedule automated malware scans",
    C: "Quarantine the system",
    D: "Disable System Restore",
    Correct: "C",
    Explanation: "The technician should quarantine the system first."
  },
  {
    Question: "A user has requested help setting up the fingerprint reader on a Windows 10 laptop. The laptop is equipped with a fingerprint reader and is joined to a domain Group Policy enables Windows Hello on all computers in the environment. Which of the following options describes how to set up Windows Hello Fingerprint for the user?",
    A: "Navigate to the Control Panel utility, select the Security and Maintenance submenu, select Change Security and Maintenance settings, select Windows Hello Fingerprint, and have the user place a fingerprint on the fingerprint reader repeatedly until Windows indicates setup is complete",
    B: "Navigate to the Windows 10 Settings menu, select the Accounts submenu, select Sign in options, select Windows Hello Fingerprint, and have the user place a fingerprint on the fingerprint reader repeatedly until Windows indicates setup is complete.",
    C: "Navigate to the Windows 10 Settings menu, select the Update & Security submenu select Windows Security, select Windows Hello Fingerprint and have the user place a fingerprint on the fingerprint reader repeatedly until Windows indicates setup is complete",
    D: "Navigate to the Control Panel utility, select the Administrative Tools submenu, select the user account in the list, select Windows Hello Fingerprint, and have the user place a fingerprint on the fingerprint reader repeatedly until Windows indicates setup is complete.",
    Correct: "B",
    Explanation: "Navigate to the Windows 10 Settings menu, select the Accounts submenu, select Sign in options, select Windows Hello Fingerprint, and have the user place a fingerprint on the fingerprint reader repeatedly until Windows indicates setup is complete. Windows Hello Fingerprint can be set up by navigating to the Windows 10 Settings menu, selecting the Accounts submenu, selecting Sign in options, and then selecting Windows Hello Fingerprint. The user will then be asked to place a fingerprint on the fingerprint reader repeatedly until Windows indicates that setup is complete. Windows Hello Fingerprint allows the user to log into the laptop using just their fingerprint, providing an additional layer of security."
  },
  {
    Question: "A user reports a PC is running slowly. The technician suspects it has a badly fragmented hard drive. Which of the following tools should the technician use?",
    A: "resmon exe",
    B: "msconfig.extf",
    C: "dfrgui exe",
    D: "msmfo32.exe",
    Correct: "C",
    Explanation: "The technician should use dfrgui.exe to defragment the hard drive."
  },
  {
    Question: "A user reports a computer is running slow. Which of the following tools will help a technician identify the issue?",
    A: "Disk Cleanup",
    B: "Group Policy Editor",
    C: "Disk Management",
    D: "Resource Monitor",
    Correct: "D",
    Explanation: null
  },
  {
    Question: "A user is unable to log in to the domain with a desktop PC, but a laptop PC is working properly on the same network. A technician logs in lo the desktop PC with a local account but is unable to browse to the secure intranet site to get troubleshooting tools. Which of the following is the MOST likely cause of the issue?",
    A: "Time drift",
    B: "Dual in-line memory module failure",
    C: "Application crash",
    D: "Filesystem errors",
    Correct: "A",
    Explanation: "The most likely cause of the issue is a “time drift”. Time drift occurs when the clock on a computer is not synchronized with the clock on the domain controller. This can cause authentication problems when a user tries to log in to the domain. The fact that the technician is unable to browse to the secure intranet site to get troubleshooting tools suggests that there may be a problem with the network connection or the firewall settings on the desktop PC."
  },
  {
    Question: "Which of the following could be used to implement secure physical access to a data center?",
    A: "Geofence",
    B: "Alarm system",
    C: "Badge reader",
    D: "Motion sensor",
    Correct: "C",
    Explanation: "Badge readers are used to implement secure physical access to a data center. They are used to read the identification information on an employee’s badge and grant access to the data center if the employee is authorized. This system requires individuals to have an access badge that contains their identification information or a unique code that can be scanned by a reader. After the badge is scanned, the system compares the information on the badge with the authorized personnel database to authenticate if the individual has the required clearance to enter that area. The other options listed, such as a geofence, alarm system, or motion sensor are security measures that may be used in conjunction with badge readers, but do not provide identification and authentication features."
  },
  {
    Question: "A user wants to set up speech recognition on a PC. In which of the following Windows Settings tools can the user enable this option?",
    A: "Language",
    B: "System",
    C: "Personalization",
    D: "Ease of Access",
    Correct: "D",
    Explanation: "The user can enable speech recognition on a PC in the Ease of Access settings tool. To set up Speech Recognition on a Windows PC, the user should open Control Panel, click on Ease of Access, click on Speech Recognition, and click the Start Speech Recognition link. Language settings can be used to change the language of the speech recognition feature, but they will not enable the feature. System settings can be used to configure the hardware and software of the PC, but they will not enable the speech recognition feature. Personalization settings can be used to customize the appearance and behavior of the PC, but they will not enable the speech recognition feature."
  },
  {
    Question: "A user is experiencing frequent malware symptoms on a Windows workstation. The user has tried several times to roll back the state but the malware persists. Which of the following would MOST likely resolve the issue?",
    A: "Quarantining system files",
    B: "Reimaging the workstation",
    C: "Encrypting the hard drive",
    D: "Disabling TLS 1.0 support",
    Correct: "C",
    Explanation: "Since Windows systems support FAT32 and NTFS \"out of the box\" and Linux supports a whole range of them including FAT32 and NTFS, it is highly recommended to format the partition or disk you want to share in either FAT32 or NTFS, but since FAT32 has a file size limit of 4.2 GB, if you happen to work with huge files, then it is better you use NTFS."
  },
  {
    Question: "A technician needs to format a USB drive to transfer 20GB of data from a Linux computer to a Windows computer. Which of the following filesystems will the technician MOST likely use?",
    A: "FAT32",
    B: "ext4",
    C: "NTFS",
    D: "exFAT",
    Correct: "D",
    Explanation: null
  },
  {
    Question: "A technician is setting up a desktop computer in a small office. The user will need to access files on a drive shared from another desktop on the network. Which of the following configurations should the technician employ to achieve this goal?",
    A: "Configure the network as private",
    B: "Enable a proxy server",
    C: "Grant the network administrator role to the user",
    D: "Create a shortcut to public documents",
    Correct: "A",
    Explanation: "The technician should configure the network as private to allow the user to access files on a drive shared from another desktop on the network."
  },
  {
    Question: "A technician needs to transfer a large number of files over an unreliable connection. The technician should be able to resume the process if the connection is interrupted. Which of the following tools can be used?",
    A: "afc",
    B: "ehkdsk",
    C: "git clone",
    D: "robocopy",
    Correct: "A",
    Explanation: "The technician should use afc to transfer a large number of files over an unreliable connection and be able to resume the process if the connection is interrupted."
  },
  {
    Question: "An incident handler needs to preserve evidence for possible litigation. Which of the following will the incident handler MOST likely do to preserve the evidence?",
    A: "Encrypt the files",
    B: "Clone any impacted hard drives",
    C: "Contact the cyber insurance company",
    D: "Inform law enforcement",
    Correct: "B",
    Explanation: "The incident handler should clone any impacted hard drives to preserve evidence for possible litigation."
  },
  {
    Question: "After clicking on a link in an email a Chief Financial Officer (CFO) received the following error: The CFO then reported the incident to a technician. The link is purportedly to the organization's bank. Which of the following should the technician perform FIRST?",
    A: "Update the browser's CRLs",
    B: "File a trouble ticket with the bank.",
    C: "Contact the ISP to report the CFO's concern",
    D: "Instruct the CFO to exit the browser",
    Correct: "A",
    Explanation: "The technician should update the browser’s CRLs first. The error message indicates that the certificate revocation list (CRL) is not up to date. Updating the CRLs will ensure that the browser can verify the authenticity of the bank’s website."
  },
  {
    Question: "A technician has spent hours trying to resolve a computer issue for the company's Chief Executive Officer (CEO). The CEO needs the device returned as soon as possible. Which of the following steps should the technician take NEXT?",
    A: "Continue researching the issue",
    B: "Repeat the iterative processes",
    C: "Inform the CEO the repair will take a couple of weeks",
    D: "Escalate the ticket",
    Correct: "D",
    Explanation: "The technician should escalate the ticket to ensure that the CEO’s device is returned as soon as possible."
  },
  {
    Question: "A technician needs to exclude an application folder from being cataloged by a Windows 10 search. Which of the following utilities should be used?",
    A: "Privacy",
    B: "Indexing Options",
    C: "System",
    D: "Device Manager",
    Correct: "B",
    Explanation: "To exclude an application folder from being cataloged by a Windows 10 search, the technician should use the Indexing Options utility."
  },
  {
    Question: "The network was breached over the weekend System logs indicate that a single user's account was successfully breached after 500 attempts with a dictionary attack. Which of the following would BEST mitigate this threat?",
    A: "Encryption at rest",
    B: "Account lockout",
    C: "Automatic screen lock",
    D: "Antivirus",
    Correct: "B",
    Explanation: "Account lockout would best mitigate the threat of a dictionary attack."
  },
  {
    Question: "As part of a CYOD policy a systems administrator needs to configure each user's Windows device to require a password when resuming from a period of sleep or inactivity. Which of the following paths will lead the administrator to the correct settings?",
    A: "Use Settings to access Screensaver settings",
    B: "Use Settings to access Screen Timeout settings",
    C: "Use Settings to access General",
    D: "Use Settings to access Display.",
    Correct: "A",
    Explanation: "The systems administrator should use Settings to access Screensaver settings to configure each user’s Windows device to require a password when resuming from a period of sleep or inactivity."
  },
  {
    Question: "A user is configuring a new SOHO Wi-Fi router for the first time. Which of the following settings should the user change FIRST?",
    A: "Encryption",
    B: "Wi-Fi channel",
    C: "Default passwords",
    D: "Service set identifier",
    Correct: "C",
    Explanation: "The user should change the default passwords first when configuring a new SOHO Wi-Fi router."
  },
  {
    Question: "An organization is centralizing support functions and requires the ability to support a remote user's desktop. Which of the following technologies will allow a technician to see the issue along with the user?",
    A: "RDP",
    B: "VNC",
    C: "SSH",
    D: "VPN",
    Correct: "B",
    Explanation: "VNC will allow a technician to see the issue along with the user when an organization is centralizing support functions and requires the ability to support a remote user’s desktop."
  },
  {
    Question: "A user reports that a workstation is operating sluggishly Several other users operate on the same workstation and have reported that the workstation is operating normally. The systems administrator has validated that the workstation functions normally. Which of the following steps should the systems administrator most likely attempt NEXT?",
    A: "Increase the paging file size",
    B: "Run the chkdsk command",
    C: "Rebuild the user's profile",
    D: "Add more system memory.",
    E: "Defragment the hard drive.",
    Correct: "C",
    Explanation: "Since the systems administrator has validated that the workstation functions normally and other users operate on the same workstation without any issues, the next step should be to rebuild the user’s profile. This will ensure that any corrupted files or settings are removed and the user’s profile is restored to its default state."
  },
  {
    Question: "An executive has contacted you through the help-desk chat support about an issue with a mobile device. Assist the executive to help resolve the issue. Which of the following should be done NEXT?",
    A: "Educate the user on the solution that was performed.",
    B: "Tell the user to take time to fix it themselves next time.",
    C: "Close the ticket out.",
    D: "Send an email to Telecom to inform them of the Issue and prevent reoccurrence.",
    Correct: "A",
    Explanation: null
  },
  {
    Question: "A user reports a computer is running slow. Which of the following tools will help a technician identity the issued",
    A: "Disk Cleanup",
    B: "Group Policy Editor",
    C: "Disk Management",
    D: "Resource Monitor",
    Correct: "D",
    Explanation: "Resource Monitor will help a technician identify the issue when a user reports a computer is running slow."
  },
  {
    Question: "An Android user contacts the help desk because a company smartphone failed to complete a tethered OS update A technician determines there are no error messages on the device Which of the following should the technician do NEXT?",
    A: "Verify all third-party applications are disabled",
    B: "Determine if the device has adequate storage available.",
    C: "Check if the battery is sufficiently charged",
    D: "Confirm a strong internet connection is available using Wi-Fi or cellular data",
    Correct: "C",
    Explanation: "Since there are no error messages on the device, the technician should check if the battery is sufficiently charged1 If the battery is low, the device may not have enough power to complete the update2 In this scenario, the technician has already determined that there are no error messages on the device. The next best step would be to check if the battery is sufficiently charged. If the battery is low, it could be preventing the device from completing the update process.Verifying that third-party applications are disabled, determining if the device has adequate storage available, and confirming a strong internet connection are all important steps in troubleshooting issues with mobile devices. However, since the problem in this scenario is related to a failed OS update, it is important to first check the battery level before proceeding with further troubleshooting steps."
  },
  {
    Question: "A user reports that text on the screen is too small. The user would like to make the text larger and easier to see. Which of the following is the BEST way for the user to increase the size of text, applications, and other items using the Windows 10 Settings tool?",
    A: "Open Settings, select Devices, select, Your info, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    B: "Open Settings, select Personalization, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    C: "Open Settings, select System, select Display, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    D: "Open Settings, select Apps, select Apps & features, click Browse, and then locate and open the image the user wants to use as the wallpaper.",
    Correct: "B",
    Explanation: "Open Settings, select Personalization, click Browse, and then locate and open the image the user wants to use as the wallpaper123 Reference: 4. How to Increase the Text Size on Your Computer. Retrieved from https://www.laptopmag.com/articles/increase-text-size-computer 5. How to Change the Size of Text in Windows 10. Retrieved from https://www.howtogeek.com/370055/how-to-change-the-size-of-text-in-windows-10/ 6. Change the size of text in Windows. Retrieved from https://support.microsoft.com/en-us/windows/change-the-size-of-text-in-windows-1d5830c3-eee3-8eaa-836b-abcc37d99b9a"
  },
  {
    Question: "A technician is installing new network equipment in a SOHO and wants to ensure the equipment is secured against external threats on the Internet. Which of the following actions should the technician do FIRST?",
    A: "Lock all devices in a closet.",
    B: "Ensure all devices are from the same manufacturer.",
    C: "Change the default administrative password.",
    D: "Install the latest operating system and patches",
    Correct: "C",
    Explanation: "The technician should change the default administrative password FIRST to ensure the network equipment is secured against external threats on the Internet. Changing the default administrative password is a basic security measure that can help prevent unauthorized access to the network equipment. Locking all devices in a closet is a physical security measure that can help prevent theft or damage to the devices, but it does not address external threats on the Internet. Ensuring all devices are from the same manufacturer is not a security measure and does not address external threats on the Internet. Installing the latest operating system and patches is important for maintaining the security of the network equipment, but it is not the first action the technician should take1"
  },
  {
    Question: "Which of the following Linux commands would be used to install an application?",
    A: "yum",
    B: "grep",
    C: "Is",
    D: "sudo",
    Correct: "D",
    Explanation: "The Linux command used to install an application is sudo. The sudo command allows users to run programs with the security privileges of another user, such as the root user. This is necessary to install applications because it requires administrative privileges1"
  },
  {
    Question: "A technician suspects the boot disk of a user's computer contains bad sectors. Which of the following should the technician verify in the command prompt to address the issue without making any changes?",
    A: "Run sfc / scannow on the drive as the administrator.",
    B: "Run clearnmgr on the drive as the administrator",
    C: "Run chkdsk on the drive as the administrator.",
    D: "Run dfrgui on the drive as the administrator.",
    Correct: "C",
    Explanation: "The technician should verify bad sectors on the user’s computer by running chkdsk on the drive as the administrator. Chkdsk (check disk) is a command-line utility that detects and repairs disk errors, including bad sectors. It runs a scan of the disk and displays any errors that are found"
  },
  {
    Question: "A user needs assistance changing the desktop wallpaper on a Windows 10 computer. Which of the following methods will enable the user to change the wallpaper using a Windows 10 Settings tool?",
    A: "Open Settings, select Accounts, select, Your info, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    B: "Open Settings, select Personalization, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    C: "Open Settings, select System, select Display, click Browse, and then locate and open the image the user wants to use as the wallpaper",
    D: "Open Settings, select Apps, select Apps & features, click Browse, and then locate and open the image the user wants to use as the wallpaper.",
    Correct: "B",
    Explanation: "To change the desktop wallpaper on a Windows 10 computer using a Windows 10 Settings tool, the user should open Settings, select Personalization, click Browse, and then locate and open the image the user wants to use as the wallpaper1 https://www.lifewire.com/change-desktop-background-windows-11-5190733"
  },
  {
    Question: "A technician wants to enable BitLocker on a Windows 10 laptop and is unable to find the BitLocker Drive Encryption menu item in Control Panel. Which of the following explains why the technician unable to find this menu item?",
    A: "The hardware does not meet BitLocker's minimum system requirements.",
    B: "BitLocker was renamed for Windows 10.",
    C: "BitLocker is not included on Windows 10 Home.",
    D: "BitLocker was disabled in the registry of the laptop",
    Correct: "C",
    Explanation: "BitLocker is only available on Windows 10 Pro, Enterprise, and Education editions1. Therefore, the technician is unable to find the BitLocker Drive Encryption menu item in Control Panel because it is not included in the Windows 10 Home edition1."
  },
  {
    Question: "A user receives a notification indicating the antivirus protection on a company laptop is out of date. A technician is able to ping the user's laptop. The technician checks the antivirus parent servers and sees the latest signatures have been installed. The technician then checks the user's laptop and finds the antivirus engine and definitions are current. Which of the following has MOST likely occurred?",
    A: "Ransomware",
    B: "Failed OS updates",
    C: "Adware",
    D: "Missing system files",
    Correct: "B",
    Explanation: "The most likely reason for the antivirus protection on a company laptop being out of date is failed OS updates1. Antivirus software relies on the operating system to function properly. If the operating system is not up-to-date, the antivirus software may not function properly and may not be able to receive the latest virus definitions and updates2. Therefore, it is important to keep the operating system up-to-date to ensure the antivirus software is functioning properly2"
  },
  {
    Question: "Which of the following is a proprietary Cisco AAA protocol?",
    A: "TKIP",
    B: "AES",
    C: "RADIUS",
    D: "TACACS+",
    Correct: "D",
    Explanation: "TACACS+ is a proprietary Cisco AAA protocol"
  },
  {
    Question: "A technician needs to interconnect two offices to the main branch while complying with good practices and security standards. Which of the following should the technician implement?",
    A: "MSRA",
    B: "VNC",
    C: "VPN",
    D: "SSH",
    Correct: "C",
    Explanation: "A technician needs to interconnect two offices to the main branch while complying with good practices and security standards. The technician should implement VPN"
  },
  {
    Question: "A Chief Executive Officer has learned that an exploit has been identified on the web server software, and a patch is not available yet. Which of the following attacks MOST likely occurred?",
    A: "Brute force",
    B: "Zero day",
    C: "Denial of service",
    D: "On-path",
    Correct: "B",
    Explanation: "A zero-day attack is an attack that exploits a previously unknown vulnerability in a computer application, meaning that the attack occurs on “day zero” of awareness of the vulnerability."
  },
  {
    Question: "A technician needs to format a USB drive to transfer 20GB of data from a Linux computer to a Windows computer. Which of the following filesystems will the technician MOST likely use?",
    A: "FAT32",
    B: "ext4",
    C: "NTFS",
    D: "exFAT",
    Correct: "D",
    Explanation: "exFAT is a file system that is supported by both Linux and Windows and can handle large files."
  },
  {
    Question: "A user purchased a netbook that has a web-based, proprietary operating system. Which of the following operating systems is MOST likely installed on the netbook?",
    A: "macOS",
    B: "Linux",
    C: "Chrome OS",
    D: "Windows",
    Correct: "C",
    Explanation: "A netbook with a web-based, proprietary operating system is most likely running Chrome OS. Chrome OS is a web-based operating system developed by Google that is designed to work with web applications and cloud storage. It is optimized for netbooks and other low-power devices and is designed to be fast, secure, and easy to use."
  },
  {
    Question: "An Android user reports that when attempting to open the company's proprietary mobile application it immediately closes. The user states that the issue persists, even after rebooting the phone. The application contains critical information that cannot be lost. Which of the following steps should a systems administrator attempt FIRST?",
    A: "Uninstall and reinstall the application",
    B: "Reset the phone to factory settings",
    C: "Install an alternative application with similar functionality",
    D: "Clear the application cache.",
    Correct: "D",
    Explanation: "The systems administrator should clear the application cache12 If clearing the application cache does not work, the systems administrator should uninstall and reinstall the application12 Resetting the phone to factory settings is not necessary at this point12 Installing an alternative application with similar functionality is not necessary at this point12"
  },
  {
    Question: "A technician needs to document who had possession of evidence at every step of the process. Which of the following does this process describe?",
    A: "Rights management",
    B: "Audit trail",
    C: "Chain of custody",
    D: "Data integrity",
    Correct: "C",
    Explanation: "The process of documenting who had possession of evidence at every step of the process is called chain of custody"
  },
  {
    Question: "A user calls the help desk to report potential malware on a computer. The anomalous activity began after the user clicked a link to a free gift card in a recent email The technician asks the user to describe any unusual activity, such as slow performance, excessive pop-ups, and browser redirections. Which of the following should the technician do NEXT?",
    A: "Advise the user to run a complete system scan using the OS anti-malware application",
    B: "Guide the user to reboot the machine into safe mode and verify whether the anomalous activities are still present",
    C: "Have the user check for recently installed applications and outline those installed since the link in the email was clicked",
    D: "Instruct the user to disconnect the Ethernet connection to the corporate network.",
    Correct: "D",
    Explanation: "First thing you want to do is quarantine/disconnect the affected system from the network so whatever malicious software doesn't spread"
  },
  {
    Question: "A company needs to securely dispose of data stored on optical discs. Which of the following is the MOST effective method to accomplish this task?",
    A: "Degaussing",
    B: "Low-level formatting",
    C: "Recycling",
    D: "Shredding",
    Correct: "D",
    Explanation: "Shredding is the most effective method to securely dispose of data stored on optical discs12"
  },
  {
    Question: "A network administrator is deploying a client certificate lo be used for Wi-Fi access for all devices m an organization The certificate will be used in conjunction with the user's existing username and password Which of the following BEST describes the security benefits realized after this deployment?",
    A: "Multifactor authentication will be forced for Wi-Fi",
    B: "All Wi-Fi traffic will be encrypted in transit",
    C: "Eavesdropping attempts will be prevented",
    D: "Rogue access points will not connect",
    Correct: "A",
    Explanation: "Multifactor authentication will be forced for Wi-Fi after deploying a client certificate to be used for Wi-Fi access for all devices in an organization"
  },
  {
    Question: "A bank would like to enhance building security in order to prevent vehicles from driving into the building while also maintaining easy access for customers. Which of the following BEST addresses this need?",
    A: "Guards",
    B: "Bollards",
    C: "Motion sensors",
    D: "Access control vestibule",
    Correct: "B",
    Explanation: "Bollards are the best solution to enhance building security in order to prevent vehicles from driving into the building while also maintaining easy access for customers4"
  },
  {
    Question: "A technician is working to resolve a Wi-Fi network issue at a doctor's office that is located next to an apartment complex. The technician discovers that employees and patients are not the only people on the network. Which of the following should the technician do to BEST minimize this issue?",
    A: "Disable unused ports.",
    B: "Remove the guest network",
    C: "Add a password to the guest network",
    D: "Change the network channel.",
    Correct: "D",
    Explanation: "Changing the network channel is the best solution to minimize the issue of employees and patients not being the only people on the Wi-Fi network5 Reference: 3. Sample CompTIA Security+ exam questions and answers. Retrieved from https://www.techtarget.com/searchsecurity/quiz/Sample-CompTIA-Security-exam-questions-and-answers"
  },
  {
    Question: "A technician just completed a Windows 10 installation on a PC that has a total of 16GB of RAM. The technician notices the Windows OS has only 4GB of RAM available for use. Which of the following explains why the OS can only access 46B of RAM?",
    A: "The UEFI settings need to be changed.",
    B: "The RAM has compatibility issues with Windows 10.",
    C: "Some of the RAM is defective.",
    D: "The newly installed OS is x86.",
    Correct: "D",
    Explanation: "The newly installed OS is x86. The x86 version of Windows 10 can only use up to 4GB of RAM. The x64 version of Windows 10 can use up to 2TB of RAM1."
  },
  {
    Question: "Which of the following is a data security standard for protecting credit cards?",
    A: "PHI",
    B: "NIST",
    C: "PCI",
    D: "GDPR",
    Correct: "C",
    Explanation: "The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to ensure that ALL companies that accept, process, store or transmit credit card information maintain a secure environment."
  },
  {
    Question: "Which of the following should be used to control security settings on an Android phone in a domain environment?",
    A: "MDM",
    B: "MFA",
    C: "ACL",
    D: "SMS",
    Correct: "A",
    Explanation: "The best answer to control security settings on an Android phone in a domain environment is to use “Mobile Device Management (MDM)”. MDM is a type of software that is used to manage and secure mobile devices such as smartphones and tablets. MDM can be used to enforce security policies, configure settings, and remotely wipe data from devices. In a domain environment, MDM can be used to manage Android phones and enforce security policies such as password requirements, encryption, and remote wipe capabilities12"
  },
  {
    Question: "A user is being directed by the help desk to look up a Windows PC's network name so the help desk can use a remote administration tool to assist the user. Which of the following commands would allow the user to give the technician the correct information? (Select TWO).",
    A: "ipconfig /all",
    B: "hostname",
    C: "netstat /?",
    D: "nslookup localhost",
    E: "arp —a",
    F: "ping :: 1",
    Correct: ["A", "B"],
    Explanation: "The user can use the following commands to give the technician the correct information: ipconfig /all and hostname 1. The ipconfig /all command displays the IP address, subnet mask, and default gateway for all adapters on the computer 1. The hostname command displays the name of the computer 1."
  },
  {
    Question: "A user created a file on a shared drive and wants to prevent its data from being accidentally deleted by others. Which of the following applications should the technician use to assist the user with hiding the file?",
    A: "Device Manager",
    B: "Indexing Options",
    C: "File Explorer",
    D: "Administrative Tools",
    Correct: "C",
    Explanation: "The technician should use the File Explorer application to assist the user with hiding the file 1. The user can right-click the file and select Properties. In the Properties dialog box, select the Hidden check box, and then click OK 1."
  },
  {
    Question: "A developer is creating a shell script to automate basic tasks in Linux. Which of the following file types are supported by default?",
    A: ".py",
    B: ".js",
    C: ".vbs",
    D: ".sh",
    Correct: "D",
    Explanation: "Shell scripting in Linux supports .sh files by default. [Source](https://www.educba.com/shell-scripting-in-linux/)"
  },
  {
    Question: "Before leaving work, a user wants to see the traffic conditions for the commute home. Which of the following tools can the user employ to schedule the browser to automatically launch a traffic website at 4:45 p.m.?",
    A: "taskschd.msc",
    B: "perfmon.msc",
    C: "lusrmgr.msc",
    D: "Eventvwr.msc",
    Correct: "A",
    Explanation: "The user can use the Task Scheduler (taskschd.msc) to schedule the browser to automatically launch a traffic website at 4:45 p.m. The Task Scheduler is a tool in Windows that allows users to schedule tasks to run automatically at specified times or in response to certain events."
  },
  {
    Question: "A technician is installing a new business application on a user's desktop computer. The machine is running Windows 10 Enterprise 32-bit operating system. Which of the following files should the technician execute in order to complete the installation?",
    A: "Installer_x64.exe",
    B: "Installer_Files.zip",
    C: "Installer_32.msi",
    D: "Installer_x86.exe",
    E: "Installer_Win10Enterprise.dmg",
    Correct: "D",
    Explanation: "The 32-bit operating system can only run 32-bit applications, so the technician should execute the 32-bit installer. The “x86” in the file name refers to the 32-bit architecture. [Source](https://www.digitaltrends.com/computing/32-bit-vs64-bit-operating-systems/)"
  },
  {
    Question: "A user is having issues with document-processing software on a Windows workstation. Other users that log in to the same device do not have the same issue. Which of the following should a technician do to remediate the issue?",
    A: "Roll back the updates.",
    B: "Increase the page file.",
    C: "Update the drivers.",
    D: "Rebuild the profile.",
    Correct: "D",
    Explanation: "The issue is specific to the user’s profile, so the technician should rebuild the profile. Rebuilding the profile will create a new profile and transfer the user’s data to the new profile1."
  },
  {
    Question: "Which of the following is an example of MFA?",
    A: "Fingerprint scan and retina scan",
    B: "Password and PIN",
    C: "Username and password",
    D: "Smart card and password",
    Correct: "D",
    Explanation: "Smart card and password is an example of two-factor authentication (2FA), not multi-factor authentication (MFA). MFA requires two or more authentication factors. Smart card and password is an example of two-factor authentication (2FA)"
  },
  {
    Question: "Which of the following command-line tools will delete a directory?",
    A: "md",
    B: "del",
    C: "dir",
    D: "rd",
    E: "cd",
    Correct: "D",
    Explanation: "To delete an empty directory, enter rd Directory or rmdir Directory. If the directory is not empty, you can remove files and subdirectories from it using the /s switch. You can also use the /q switch to suppress confirmation messages (quiet mode)."
  },
  {
    Question: "A police officer often leaves a workstation for several minutes at a time. Which of the following is the BEST way the officer can secure the workstation quickly when walking away?",
    A: "Use a key combination to lock the computer when leaving.",
    B: "Ensure no unauthorized personnel are in the area.",
    C: "Configure a screensaver to lock the computer automatically after approximately 30 minutes of inactivity.",
    D: "Turn off the monitor to prevent unauthorized visibility of information.",
    Correct: "A",
    Explanation: "The BEST way to secure the workstation quickly when walking away is to use a key combination to lock the computer when leaving."
  },
  {
    Question: "A call center handles inquiries into billing issues for multiple medical facilities. A security analyst notices that call center agents often walk away from their workstations, leaving patient data visible for anyone to see. Which of the following should a network administrator do to BEST prevent data theft within the call center?",
    A: "Encrypt the workstation hard drives.",
    B: "Lock the workstations after five minutes of inactivity.",
    C: "Install privacy screens.",
    D: "Log off the users when their workstations are not in use.",
    Correct: "B",
    Explanation: "The BEST solution for preventing data theft within the call center in this scenario would be to lock the workstations after a period of inactivity. This would prevent unauthorized individuals from accessing patient data if call center agents were to step away from their workstations without logging out."
  },
  {
    Question: "A technician is setting up a backup method on a workstation that only requires two sets of tapes to restore. Which of the following would BEST accomplish this task?",
    A: "Differential backup",
    B: "Off-site backup",
    C: "Incremental backup",
    D: "Full backup",
    Correct: "D",
    Explanation: "To accomplish this task, the technician should use a Full backup method. A full backup only requires two sets of tapes to restore because it backs up all the data from the workstation. With a differential backup, the backups need to be taken multiple times over a period of time, so more tapes would be needed to restore the data."
  },
  {
    Question: "A help desk team lead contacts a systems administrator because the technicians are unable to log in to a Linux server that is used to access tools. When the administrator tries to use remote desktop to log in to the server, the administrator sees the GUI is crashing. Which of the following methods can the administrator use to troubleshoot the server effectively?",
    A: "SFTP",
    B: "SSH",
    C: "VNC",
    D: "MSRA",
    Correct: "B",
    Explanation: "The administrator can use the SSH (Secure Shell) method to troubleshoot the Linux server effectively."
  },
  {
    Question: "A user turns on a new laptop and attempts to log in to specialized software but receives a message stating that the address is already in use. The user logs on to the old desktop and receives the same message. A technician checks the account and sees a comment that the user requires a specifically allocated address before connecting to the software. Which of the following should the technician do to MOST likely resolve the issue?",
    A: "Bridge the LAN connection between the laptop and the desktop.",
    B: "Set the laptop configuration to DHCP to prevent conflicts.",
    C: "Remove the static IP configuration from the desktop.",
    D: "Replace the network card in the laptop, as it may be defective.",
    Correct: "C",
    Explanation: "The new laptop was set up with the static IP it needs to connect to the software. The old desktop is still configured with that IP, hence the conflict."
  },
  {
    Question: "A technician is upgrading the backup system for documents at a high-volume law firm. The current backup system can retain no more than three versions of full backups before failing. The law firm is not concerned about restore times but asks the technician to retain more versions when possible. Which of the following backup methods should the technician MOST likely implement?",
    A: "Full",
    B: "Mirror",
    C: "Incremental",
    D: "Differential",
    Correct: "C",
    Explanation: null
  },
  {
    Question: "A company discovered that numerous computers from multiple geographic locations are sending a very high number of connection requests which is causing the company's web server to become unavailable to the general public. Which of the following attacks is occurring?",
    A: "Zero day",
    B: "SOL injection",
    C: "Cross-site scripting",
    D: "Distributed denial of service",
    Correct: "D",
    Explanation: "The company is experiencing a distributed denial of service (DDoS) attack. A DDoS attack is a type of cyber attack in which multiple compromised systems are used to target a single system, causing a denial of service for users of the targeted system."
  },
  {
    Question: "While browsing a website, a staff member received a message that the website could not be trusted. Shortly afterward, several other colleagues reported the same issue across numerous other websites. Remote users who were not connected to corporate resources did not have any issues. Which of the following is MOST likely the cause of this issue?",
    A: "A bad antivirus signature update was installed.",
    B: "A router was misconfigured and was blocking traffic.",
    C: "An upstream internet service provider was flapping.",
    D: "The time or date was not in sync with the website.",
    Correct: "D",
    Explanation: null
  },
  {
    Question: "Security software was accidentally uninstalled from all servers in the environment. After requesting the same version of the software be reinstalled, the security analyst learns that a change request will need to be filled out. Which of the following is the BEST reason to follow the change management process in this scenario?",
    A: "Owners can be notified a change is being made and can monitor it for performance impact.",
    B: "A risk assessment can be performed to determine if the software is needed.",
    C: "End users can be aware of the scope of the change.",
    D: "A rollback plan can be implemented in case the software breaks an application.",
    Correct: "A",
    Explanation: "The change management process can help ensure that owners are notified of changes being made and can monitor them for performance impact (A). This can help prevent unexpected issues from arising."
  },
  {
    Question: "Which of the following should be done NEXT?",
    A: "Send an email to Telecom to inform them of the issue and prevent reoccurrence.",
    B: "Close the ticket out.",
    C: "Tell the user to take time to fix it themselves next time.",
    D: "Educate the user on the solution that was performed.",
    Correct: "D",
    Explanation: "Educating the user on the solution that was performed is a good next step after resolving an issue. This can help prevent similar issues from happening again and empower users to solve problems on their own."
  },
  {
    Question: "A user calls the help desk and reports a workstation is infected with malicious software. Which of the following tools should the help desk technician use to remove the malicious software? (Select TWO).",
    A: "File Explorer",
    B: "User Account Control",
    C: "Windows Backup and Restore",
    D: "Windows Firewall",
    E: "Windows Defender",
    F: "Network Packet Analyzer",
    Correct: ["A", "E"],
    Explanation: "The correct answers are E. Windows Defender and A. File Explorer. Windows Defender is a built-in antivirus program that can detect and remove malicious software from a workstation. File Explorer can be used to locate and delete files associated with the malicious software."
  },
  {
    Question: "A technician has just used an anti-malware removal tool to resolve a user's malware issue on a corporate laptop. Which of the following BEST describes what the technician should do before returning the laptop to the user?",
    A: "Educate the user on malware removal.",
    B: "Educate the user on how to reinstall the laptop OS.",
    C: "Educate the user on how to access recovery mode.",
    D: "Educate the user on common threats and how to avoid them.",
    Correct: "D",
    Explanation: "Educating the user on common threats and how to avoid them (D) would be a good step before returning the laptop to the user. This can help prevent similar issues from happening again."
  },
  {
    Question: "A technician is upgrading the backup system for documents at a high-volume law firm. The current backup system can retain no more than three versions of full backups before failing. The law firm is not concerned about restore times but asks the technician to retain more versions when possible. Which of the following backup methods should the technician MOST likely implement?",
    A: "Full",
    B: "Mirror",
    C: "Incremental",
    D: "Differential",
    Correct: "C",
    Explanation: "The law firm wants to retain more versions of the backups when possible, so the best backup method for the technician to implement in this scenario would be Incremental backup."
  },
  {
    Question: "Which of the following is the MOST basic version of Windows that includes BitLocker?",
    A: "Home",
    B: "Pro",
    C: "Enterprise",
    D: "Pro for Workstations",
    Correct: "B",
    Explanation: null
  },
  {
    Question: "A user receives a notification indicating the data plan on the user's corporate phone has reached its limit. The user has also noted the performance of the phone is abnormally slow. A technician discovers a third-party GPS application was installed on the phone. Which of the following is the MOST likely cause?",
    A: "The GPS application is installing software updates.",
    B: "The GPS application contains malware.",
    C: "The GPS application is updating its geospatial map data.",
    D: "The GPS application is conflicting with the built-in GPS.",
    Correct: "B",
    Explanation: "The GPS application contains malware. The third-party GPS application is likely the cause of the slow performance of the phone."
  },
  {
    Question: "A technician is setting up a backup method on a workstation that only requires two sets of tapes to restore. Which of the following would BEST accomplish this task?",
    A: "Differential backup",
    B: "Off-site backup",
    C: "Incremental backup",
    D: "Full backup",
    Correct: "D",
    Explanation: "A full backup involves creating a copy of all data on the workstation, including system files and user-created data, and storing it on a set of tapes. This ensures that all data is backed up, and ensures that the data can be restored in the event of a system failure or data loss."
  },
  {
    Question: "A technician is troubleshooting a lack of outgoing audio on a third-party Windows 10 VoIP application, The PC uses a USB microphone connected to a powered hub. The technician verifies the microphone works on the PC using Voice Recorder. Which of the following should the technician do to solve the issue?",
    A: "Remove the microphone from the USB hub and plug it directly into a USB port on the PC.",
    B: "Enable the microphone under Windows Privacy settings to allow desktop applications to access it.",
    C: "Delete the microphone from Device Manager and scan for new hardware.",
    D: "Replace the USB microphone with one that uses a traditional 3.5mm plug.",
    Correct: "B",
    Explanation: "In Windows 10, there are privacy settings that control access to certain devices, such as microphones, cameras, and other input devices. If the microphone is not enabled under these privacy settings, the VoIP application may not have access to it, causing a lack of outgoing audio."
  },
  {
    Question: "A technician is setting up a new laptop for an employee who travels, Which of the following is the BEST security practice for this scenario?",
    A: "PIN-based login",
    B: "Quarterly password changes",
    C: "Hard drive encryption",
    D: "A physical laptop lock",
    Correct: "C",
    Explanation: "Encrypting the laptop's hard drive will ensure that any sensitive data stored on the laptop is secure, even if the laptop is lost or stolen."
  },
  {
    Question: "A user in a corporate office reports the inability to connect to any network drives. No other users have reported this issue. Which of the following is the MOST likely reason the user is having this issue?",
    A: "The user is not connected to the VPN.",
    B: "The file server is offline.",
    C: "A low battery is preventing the connection.",
    D: "The log-in script failed.",
    Correct: "D",
    Explanation: null
  },
  {
    Question: "A user received the following error upon visiting a banking website: The security presented by the website was issued a different website' s address. A technician should instruct the user to:",
    A: "Clear the browser cache and contact the bank.",
    B: "Close out of the site and contact the bank.",
    C: "Continue to the site and contact the bank.",
    D: "Update the browser and contact the bank.",
    Correct: "A",
    Explanation: "The technician should instruct the user to clear the browser cache and contact the bank. This error indicates that the website the user is visiting is not the correct website and is likely due to a cached version of the website being stored in the user's browser."
  },
  {
    Question: "A user is attempting to browse the internet using Internet Explorer. When trying to load a familiar web page, the user is unexpectedly redirected to an unfamiliar website. Which of the following would MOST likely solve the issue?",
    A: "Updating the operating system",
    B: "Changing proxy settings",
    C: "Reinstalling the browser",
    D: "Enabling port forwarding",
    Correct: "C",
    Explanation: "Reinstalling the browser would most likely solve the issue. This would remove any malicious software or add-ons that may be causing the issue and restore the browser to its default settings."
  },
  {
    Question: "Which of the following is a consequence of end-of-life operating systems?",
    A: "Operating systems void the hardware warranty.",
    B: "Operating systems cease to function.",
    C: "Operating systems no longer receive updates.",
    D: "Operating systems are unable to migrate data to the new operating system.",
    Correct: "C",
    Explanation: "End-of-life operating systems are those which have reached the end of their life cycle and are no longer supported by the software developer. This means that the operating system will no longer receive updates, security patches, or other new features."
  },
  {
    Question: "Which of the following data is MOST likely to be regulated?",
    A: "Name in a Phone book",
    B: "Name on a medical diagnosis",
    C: "Name on a job application",
    D: "Name on an employer's website",
    Correct: "B",
    Explanation: null
  },
  {
    Question: "Which of the following file extensions are commonly used to install applications on a macOS machine? (Select THREE).",
    A: ".mac",
    B: ".Pkg",
    C: ".deb",
    D: ".dmg",
    E: ".msi",
    F: ".appx",
    G: ".app",
    H: ".apk",
    Correct: ["B", "D", "G"],
    Explanation: null
  },
  {
    Question: "A help desk technician runs the following script: Inventory.py. The technician receives the following error message:\nHow do you want to Open this file?\nWhich of the following is the MOST likely reason this script is unable to run?",
    A: "Scripts are not permitted to run.",
    B: "The script was not built for Windows.",
    C: "The script requires administrator privileges.",
    D: "The runtime environment is not installed.",
    Correct: "D",
    Explanation: "The error message is indicating that the script is not associated with any program on the computer that can open and run it. This means that the script requires a runtime environment, such as Python, to be installed in order for it to execute properly."
  },
  {
    Question: "A technician downloaded software from the Internet that required the technician to scroll through a text box and at the end of the text box, click a button labeled Accept. Which of the following agreements IS MOST likely in use?",
    A: "DRM",
    B: "NDA",
    C: "EULA",
    D: "MOU",
    Correct: "C",
    Explanation: "The most likely agreement in use here is a EULA (End User License Agreement). This is a legally binding agreement between the user and the software developer, outlining the terms and conditions that the user must agree to in order to use the software."
  },
  {
    Question: "A technician is reimaging a desktop PC. The technician connects the PC to the network and powers it on. The technician attempts to boot the computer via the NIC to image the computer, but this method does not work. Which of the following is the MOST likely reason the computer is unable to boot into the imaging system via the network?",
    A: "The computer's CMOS battery failed.",
    B: "The computer's NIC is faulty.",
    C: "The PXE boot option has not been enabled.",
    D: "The Ethernet cable the technician is using to connect the desktop to the network is faulty.",
    Correct: "C",
    Explanation: "The most likely reason the computer is unable to boot into the imaging system via the network is that the PXE boot option has not been enabled. PXE (Preboot Execution Environment) is an environment that allows computers to boot up over the network, instead of from a local disk. In order for this to work, the PXE boot option must be enabled in the computer's BIOS settings."
  },
  {
    Question: "A systems administrator is tasked with configuring desktop systems to use a new proxy server that the organization has added to provide content filtering. Which of the following Windows utilities IS the BEST choice for accessing the necessary configuration to complete this goal?",
    A: "Security and Maintenance",
    B: "Network and Sharing Center",
    C: "Windows Defender Firewall",
    D: "Internet Options",
    Correct: "D",
    Explanation: "The best choice for accessing the necessary configuration to configure the desktop systems to use a new proxy server is the Internet Options utility. This utility can be found in the Control Panel and allows you to configure the proxy settings for your network connection."
  },
  {
    Question: "An organization's Chief Financial Officer (CFO) is concerned about losing access to very sensitive, legacy unmaintained PII on a workstation if a ransomware outbreak occurs. The CFO has a regulatory requirement to retain this data for many years. Which of the following backup methods would BEST meet the requirements?",
    A: "A daily, incremental backup that is saved to the corporate file server",
    B: "An additional, secondary hard drive in a mirrored RAID configuration",
    C: "A full backup of the data that is stored offsite in cold storage",
    D: "Weekly, differential backups that are stored in a cloud-hosting provider",
    Correct: "C",
    Explanation: "According to CompTIA A+ Core 2 objectives, a full backup stored off-site provides the greatest protection against data loss in the event of a ransomware attack or other data disaster. By storing the backup in a separate physical location, it is less likely to be affected by the same event that could cause data loss on the original system. Cold storage is a term used for data archiving, which typically refers to a long-term storage solution that is used for retaining data that is infrequently accessed, but still needs to be kept for regulatory or compliance reasons."
  },
  {
    Question: "A technician connects an additional monitor to a PC using a USB port. The original HDMI monitor is mounted to the left of the new monitor. When moving the mouse to the right from the original monitor to the new monitor, the mouse stops at the end of the screen on the original monitor. Which of the following will allow the mouse to correctly move to the new monitor?",
    A: "Rearranging the monitor's position in display settings",
    B: "Swapping the cables for the monitors",
    C: "Using the Ctrl+Alt+> to correct the display orientation",
    D: "Updating the display drivers for the video card",
    Correct: "B",
    Explanation: "The correct answer is B. Swapping the cables for the monitors. When the second monitor is connected with the HDMI port, it is necessary to swap the cables for the monitors so that the mouse can move from the original monitor to the new monitor. This is because the HDMI port is designed to only support one monitor, and the mouse will not be able to move from one to the other without the cables being swapped. According to CompTIA A+ Core 2 documents, 'When connecting multiple displays to a system, the cables used to connect the displays must be swapped between the displays. For example, if a monitor is connected to a system using a VGA cable, the VGA cable must be moved to the next display to allow the mouse to move between the two displays.'"
  },
  {
    Question: "A technician receives a call from a user who is on vacation. The user provides the necessary credentials and asks the technician to log in to the user's account and read a critical email that the user has been expecting. The technician refuses because this is a violation of the:",
    A: "acceptable use policy.",
    B: "regulatory compliance requirements.",
    C: "non-disclosure agreement",
    D: "incident response procedures",
    Correct: "A",
    Explanation: "Logging into a user's account without their explicit permission is a violation of the acceptable use policy, which outlines the rules and regulations by which a user must abide while using a computer system. By logging into the user's account without their permission, the technician would be violating this policy. Additionally, this action could be seen as a breach of confidentiality, as the technician would have access to information that should remain confidential."
  },
  {
    Question: "A new service desk is having a difficult time managing the volume of requests. Which of the following is the BEST solution for the department?",
    A: "Implementing a support portal",
    B: "Creating a ticketing system",
    C: "Commissioning an automated callback system",
    D: "Submitting tickets through email",
    Correct: "A",
    Explanation: "A support portal is an online system that allows customers to access customer service tools, submit requests and view status updates, as well as access information such as how-to guides, FAQs, and other self-service resources. This would be the best solution for the service desk, as it would allow them to easily manage the volume of requests by allowing customers to submit their own requests and view the status of their requests. Additionally, the portal would provide customers with self-service resources that can help them resolve their own issues, reducing the amount of tickets that need to be handled by the service desk."
  },
  {
    Question: "An IT services company that supports a large government contract replaced the Ethernet cards on several hundred desktop machines to comply With regulatory requirements. Which of the following disposal methods for the non-compliant cards is the MOST environmentally friendly?",
    A: "Incineration",
    B: "Resale",
    C: "Physical destruction",
    D: "Dumpster for recycling plastics",
    Correct: "D",
    Explanation: "When disposing of non-compliant Ethernet cards, the most environmentally friendly option is to use a dumpster for recycling plastics. This method is the most effective way to reduce the amount of waste that is sent to landfills, and it also helps to reduce the amount of energy used in the production of new materials. Additionally, recycling plastics helps to reduce the amount of toxic chemicals that can be released into the environment. According to CompTIA A+ Core 2 documents, 'The most environmentally friendly disposal method for non-compliant Ethernet cards is to use a dumpster for recycling plastics. This method is the most effective way to reduce the amount of waste that is sent to landfills, and it also helps to reduce the amount of energy used in the production of new materials.'"
  },
  {
    Question: "A technician has verified that a user's computer has a virus, and the antivirus software is out Of date. Which of the following steps should the technician take NEXT?",
    A: "Quarantine the computer.",
    B: "Use a previous restore point.",
    C: "Educate the end user about viruses",
    D: "Download the latest virus definitions",
    Correct: "D",
    Explanation: "This will ensure that the antivirus software is up-to-date, and can detect any new viruses that may have been released since the last virus definition update. The CompTIA A+ Core 2 220-1002 exam covers this topic in the following domains: 1.3 Explain the importance of security awareness and 2.2 Given a scenario, use secure data management and disaster recovery principles."
  },
  {
    Question: "A systems administrator needs to reset a user's password because the user forgot it. The systems administrator creates the new password and wants to further protect the user's account. Which of the following should the systems administrator do?",
    A: "Require the user to change the password at the next log-in.",
    B: "Disallow the user from changing the password.",
    C: "Disable the account",
    D: "Choose a password that never expires.",
    Correct: "A",
    Explanation: "This will ensure that the user is the only one who knows their password, and that the new password is secure. The CompTIA A+ Core 2 220-1002 exam covers this topic in the domain 1.4 Given a scenario, use appropriate data destruction and disposal methods."
  },
  {
    Question: "A technician received a call stating that all files in a user's documents folder appear to be changed, and each of the files now has a .look file extension. Which of the following actions is the FIRST step the technician should take?",
    A: "Run a live disk clone.",
    B: "Run a full antivirus scan.",
    C: "Use a batch file to rename the files",
    D: "Disconnect the machine from the network",
    Correct: "D",
    Explanation: null
  },
  {
    Question: "An analyst needs GUI access to server software running on a macOS server. Which of the following options provides the BEST way for the analyst to access the macOS server from the Windows workstation?",
    A: "RDP through RD Gateway",
    B: "Apple Remote Desktop",
    C: "SSH access with SSH keys",
    D: "VNC with username and password",
    Correct: "B",
    Explanation: "Apple Remote Desktop is a remote access solution that allows a user to access and control another macOS computer from their Windows workstation. It provides a graphical user interface so that the analyst can easily access the server software running on the macOS server. Apple Remote Desktop also supports file transfers, so the analyst can easily transfer files between the two computers. Additionally, Apple Remote Desktop supports encryption, so data is secure during transmission."
  },
  {
    Question: "The findings from a security audit indicate the risk of data loss from lost or stolen laptops is high. The company wants to reduce this risk with minimal impact to users who want to use their laptops when not on the network. Which of the following would BEST reduce this risk for Windows laptop users?",
    A: "Requiring strong passwords",
    B: "Disabling cached credentials",
    C: "Requiring MFA to sign on",
    D: "Enabling BitLocker on all hard drives",
    Correct: "D",
    Explanation: "BitLocker is a disk encryption tool that can be used to encrypt the hard drive of a Windows laptop. This will protect the data stored on the drive in the event that the laptop is lost or stolen, and will help to reduce the risk of data loss. Additionally, BitLocker can be configured to require a PIN or other authentication in order to unlock the drive, providing an additional layer of security."
  },
  {
    Question: "A technician has been asked to set up a new wireless router with the best possible security. Which of the following should the technician implement?",
    A: "WPS",
    B: "TKIP",
    C: "WPA3",
    D: "WEP",
    Correct: "C",
    Explanation: "WPA3 (Wi-Fi Protected Access version 3) is the latest version of Wi-Fi security and offers the highest level of protection available. It is designed to protect against brute force password attempts and protect against eavesdropping and man-in-the-middle attacks. WPA3 also supports the use of stronger encryption algorithms, such as the Advanced Encryption Standard (AES), which provides additional protection for wireless networks. WPA3 should be implemented in order to ensure the best possible security for the new wireless router."
  },
  {
    Question: "A field technician applied a Group Policy setting to all the workstations in the network. This setting forced the workstations to use a specific SNTP server. Users are unable to log in now. Which of the following is the MOST likely cause of this issue?",
    A: "The SNTP server is offline.",
    B: "A user changed the time zone on a local machine.",
    C: "The Group Policy setting has disrupted domain authentication on the system.",
    D: "The workstations and the authentication server have a system clock difference.",
    Correct: "D",
    Explanation: "The workstations and the authentication server have a system clock difference. If a Group Policy setting is applied that forces the workstations to use a specific SNTP server, but the system clock on the workstations and the authentication server are out of sync, then this can cause authentication issues and users will be unable to log in. In this case, the most likely cause of the issue is a difference in system clocks and the technician should ensure that the clocks on the workstations and the authentication server are in sync."
  },
  {
    Question: "A desktop support technician is tasked with migrating several PCs from Windows 7 Pro to Windows 10 Pro, The technician must ensure files and user preferences are retained, must perform the operation locally, and should migrate one station at a time. Which of the following methods would be MOST efficient?",
    A: "Golden image",
    B: "Remote network install",
    C: "In-place upgrade",
    D: "Clean install",
    Correct: "C",
    Explanation: "An in-place upgrade is the most efficient method for migrating from Windows 7 Pro to Windows 10 Pro, as it will retain all user files and preferences, can be done locally, and can be done one station at a time. An in-place upgrade involves installing the new version of Windows over the existing version, and can be done quickly and easily."
  },
  {
    Question: "A suite of security applications was installed a few days ago on a user's home computer. The user reports that the computer has been running slowly since the installation. The user notices the hard drive activity light is constantly solid. Which of the following should be checked FIRST?",
    A: "Services in Control Panel to check for overutilization",
    B: "Performance Monitor to check for resource utilization",
    C: "System File Checker to check for modified Windows files",
    D: "Event Viewer to identify errors",
    Correct: "C",
    Explanation: "System File Checker to check for modified Windows files. System File Checker (SFC) is a Windows utility that can be used to scan for and restore corrupt Windows system files. SFC can be used to detect and fix any modified or corrupted system files on a computer, and thus should be checked first when a user reports that their computer has been running slowly since the installation of security applications. By checking SFC, any modified or corrupted system files can be identified and fixed, potentially improving the overall performance of the computer."
  },
  {
    Question: "A Windows user reported that a pop-up indicated a security issue. During inspection, an antivirus system identified malware from a recent download, but it was unable to remove the malware. Which of the following actions would be BEST to remove the malware while also preserving the user's files?",
    A: "Run the virus scanner in an administrative mode.",
    B: "Reinstall the operating system.",
    C: "Reboot the system in safe mode and rescan.",
    D: "Manually delete the infected files.",
    Correct: "C",
    Explanation: "Rebooting the system in safe mode will limit the number of programs and processes running, allowing the antivirus system to more effectively identify and remove the malware. Rescanning the system will allow the antivirus system to identify and remove the malware while preserving the user's files."
  },
  {
    Question: "A macOS user reports seeing a spinning round cursor on a program that appears to be frozen. Which of the following methods does the technician use to force the program to close in macOS?",
    A: "The technician presses the Ctrl+Alt+Del keys to open the Force Quit menu, selects the frozen application in the list, and clicks Force Quit.",
    B: "The technician clicks on the frozen application and presses and holds the Esc key on the keyboard for 10 seconds Which causes the application to force quit.",
    C: "The technician opens Finder, navigates to the Applications folder, locates the application that is frozen in the list, right-clicks on the application, and selects the Force Quit option.",
    D: "The technician opens the Apple icon menu, selects Force Quit, selects the frozen application in the list, and clicks Force Quit.",
    Correct: "D",
    Explanation: "The technician opens the Apple icon menu, selects Force Quit, selects the frozen application in the list, and clicks Force Quit. This is the most common method of force quitting a program in macOS. This can be done by clicking on the Apple icon in the top left of the screen, selecting Force Quit, selecting the frozen application in the list, and then clicking Force Quit. This will force the application to quit and the spinning round cursor will disappear."
  },
  {
    Question: "A technician is tasked with configuring a computer for a visually impaired user. Which of the following utilities should the technician use?",
    A: "Device Manager",
    B: "System",
    C: "Ease of Access Center",
    D: "Programs and Features",
    Correct: "C",
    Explanation: "The Ease of Access Center is a built-in utility in Windows that provides tools and options for making a computer easier to use for individuals with disabilities, including the visually impaired. In the Ease of Access Center, the technician can turn on options like high contrast display, screen magnification, and screen reader software to help the user better interact with the computer."
  },
  {
    Question: "While assisting a customer with an issue, a support representative realizes the appointment is taking longer than expected and will cause the next customer meeting to be delayed by five minutes. Which of the following should the support representative do NEXT?",
    A: "Send a quick message regarding the delay to the next customer.",
    B: "Cut the current customer's lime short and rush to the next customer.",
    C: "Apologize to the next customer when arriving late.",
    D: "Arrive late to the next meeting without acknowledging the lime.",
    Correct: "A",
    Explanation: "The support representative should send a quick message regarding the delay to the next customer. This will help the next customer understand the situation and adjust their schedule accordingly."
  },
  {
    Question: "An administrator has received approval for a change request for an upcoming server deployment. Which of the following steps should be completed NEXT?",
    A: "Perform a risk analysis.",
    B: "Implement the deployment.",
    C: "Verify end user acceptance",
    D: "Document the lessons learned.",
    Correct: "A",
    Explanation: "Before making any changes to the system, it is important to assess the risks associated with the change and determine whether it is worth implementing. Risk analysis involves identifying potential risks, assessing their likelihood and impact, and determining what steps can be taken to mitigate them. It is important to perform this step before making any changes, as this allows the administrator to make an informed decision about whether or not the change should be implemented. Once the risks have been assessed and the administrator has decided to go ahead with the change, the next step is to implement the deployment."
  },
  {
    Question: "A technician is troubleshooting a customer's PC and receives a phone call. The technician does not take the call and sets the phone to silent. Which of the following BEST describes the technician's actions?",
    A: "Avoid distractions",
    B: "Deal appropriately with customer's confidential material.",
    C: "Adhere to user privacy policy",
    D: "Set and meet timelines",
    Correct: "A",
    Explanation: "The technician's action of setting the phone to silent while troubleshooting the customer's PC is an example of avoiding distractions. By setting the phone to silent, the technician is ensuring that they are able to focus on the task at hand without any distractions that could potentially disrupt their workflow. This is an important practice when handling customer's confidential material, as it ensures that the technician is able to focus on the task and not be distracted by any external sources. Furthermore, it also adheres to user privacy policies, as the technician is not exposing any confidential information to any external sources."
  },
  {
    Question: "A manager reports that staff members often forget the passwords to their mobile devices and applications. Which of the following should the systems administrator do to reduce the number of help desk tickets submitted?",
    A: "Enable multifactor authentication.",
    B: "Increase the failed log-in threshold.",
    C: "Remove complex password requirements.",
    D: "Implement a single sign-on with biometrics.",
    Correct: "D",
    Explanation: "To reduce the number of help desk tickets submitted due to forgotten passwords, the systems administrator should implement a single sign-on (SSO) with biometrics. Single sign-on allows users to access multiple applications or services with a single set of login credentials, reducing the need to remember multiple passwords. Biometrics, such as fingerprint or facial recognition, can enhance security while providing a convenient and secure way for users to authenticate themselves without relying on password memorization."
  },
  {
    Question: "A Microsoft Windows PC needs to be set up for a user at a targe corporation. The user will need access to the corporate domain to access email and shared drives. Which of the following versions of Windows would a technician MOST likely deploy for the user?",
    A: "Windows Enterprise Edition",
    B: "Windows Professional Edition",
    C: "Windows Server Standard Edition",
    D: "Windows Home Edition",
    Correct: "A",
    Explanation: "For a user who needs access to the corporate domain to access email and shared drives, the technician would MOST likely deploy Windows Enterprise Edition. Windows Enterprise Edition provides advanced features, including domain join capability, which allows the PC to join the corporate domain and access resources such as email and shared drives. Windows Professional Edition also supports domain join but may lack some advanced features available in the Enterprise Edition. Windows Server Standard Edition is typically used for server deployments, and Windows Home Edition is designed for home users and lacks domain join capabilities found in the Enterprise and Professional editions."
  },
  {
    Question: "A small business owner wants to install newly purchased software on all networked PCs. The network is not configured as a domain, and the owner wants to use the easiest method possible. Which of the following is the MOST efficient way lor the owner to install the application?",
    A: "Use a network share to share the installation files.",
    B: "Save software to an external hard drive to install.",
    C: "Create an imaging USB for each PC.",
    D: "Install the software from the vendor's website",
    Correct: "A",
    Explanation: "The MOST efficient way for the small business owner to install the newly purchased software on all networked PCs is to use a network share to share the installation files. This method allows the owner to centralize the installation files on a network share accessible by all PCs. Each PC can then install the software from the shared location without the need for individual physical installations. This method streamlines the deployment process, ensures consistency across installations, and minimizes manual intervention on each PC. It is a more efficient alternative compared to saving software to an external hard drive or creating individual imaging USBs for each PC."
  },
  {
    Question: "A user is setting up a computer for the first time and would like to create a secondary login with permissions that are different than the primary login. The secondary login will need to be protected from certain content such as games and websites. Which of the following Windows settings should the user utilize to create the secondary login?",
    A: "Privacy",
    B: "Accounts",
    C: "Personalization",
    D: "Shared resources",
    Correct: "B",
    Explanation: "To create a secondary login with different permissions in Windows 10, the user should utilize the Accounts setting. Here are the steps to create a new user account with different permissions: Right-click the Windows Start menu button. Select Control Panel. Select User Accounts. Select Manage another account. Select Add a new user in PC settings. Use the Accounts dialog box to configure a new account."
  },
  {
    Question: "Which of the following is MOST likely contained in an EULA?",
    A: "Chain of custody",
    B: "Backup of software code",
    C: "Personally identifiable information",
    D: "Restrictions of use",
    Correct: "D",
    Explanation: "An EULA (End-User License Agreement) is a legally binding contract between a software supplier and a customer or end-user, generally made available to the customer via a retailer acting as an intermediary. A EULA typically contains terms and conditions specifying the rights and restrictions of the user regarding the use of the software. Therefore, the MOST likely content in an EULA is 'Restrictions of use,' outlining the limitations and conditions under which the user can use the software. EULAs may also include other information, but the primary focus is on establishing the legal framework for the use of the software."
  },
  {
    Question: "A user installed a new application that automatically starts each time the user logs in to a Windows 10 system. The user does not want this to happen and has asked for this setting to be changed. Which of the following tools would the technician MOST likely use to safely make this change?",
    A: "Registry Editor",
    B: "Task Manager",
    C: "Event Viewer",
    D: "Local Users and Groups",
    Correct: "B",
    Explanation: "The technician would most likely use the Task Manager tool to safely make this change. The Task Manager tool can be used to disable applications from starting automatically on Windows 10. It allows the technician to view and manage processes, including those that are set to automatically start when a user logs in to the system."
  },
  {
    Question: "A laptop user is visually impaired and requires a different cursor color. Which of the following OS utilities is used to change the color of the cursor?",
    A: "Keyboard",
    B: "Touchpad",
    C: "Ease of Access Center",
    D: "Display settings",
    Correct: "C",
    Explanation: "The OS utility used to change the color of the cursor in Windows is Ease of Access Center. The Ease of Access Center in the Windows OS provides accessibility options for users with disabilities, including the visually impaired. One of these options allows the user to change the color and size of the cursor, making it more visible and easier to locate on the screen."
  },
  {
    Question: "A user is attempting to make a purchase at a store using a phone. The user places the phone on the payment pad, but the device does not recognize the phone. The user attempts to restart the phone but still has the same results. Which of the following should the user do to resolve the issue?",
    A: "Turn off airplane mode while at the register.",
    B: "Verify that NFC is enabled.",
    C: "Connect to the store's Wi-Fi network.",
    D: "Enable Bluetooth on the phone.",
    Correct: "B",
    Explanation: "The user should verify that NFC is enabled on their phone. NFC (Near Field Communication) technology allows a phone to wirelessly communicate with a payment terminal or other compatible device. In order to use NFC to make a payment or transfer information, the feature must be enabled on the phone."
  },
  {
    Question: "A junior administrator is responsible for deploying software to a large group of computers in an organization. The administrator finds a script on a popular coding website to automate this distribution but does not understand the scripting language. Which of the following BEST describes the risks in running this script?",
    A: "The instructions from the software company are not being followed.",
    B: "Security controls will treat automated deployments as malware.",
    C: "The deployment script is performing unknown actions.",
    D: "Copying scripts off the internet is considered plagiarism.",
    Correct: "C",
    Explanation: "The risks in running this script are that the deployment script is performing unknown actions. Running the script blindly could cause unintended actions, such as deploying malware or deleting important files, which could negatively impact the organization's network and data."
  },
  {
    Question: "An administrator has submitted a change request for an upcoming server deployment. Which of the following must be completed before the change can be approved?",
    A: "Risk analysis",
    B: "Sandbox testing",
    C: "End user acceptance",
    D: "Lessons learned",
    Correct: "A",
    Explanation: "A risk analysis must be completed before a change request for an upcoming server deployment can be approved. Risk analysis is an important step in the change management process because it helps identify and mitigate potential risks before changes are implemented."
  },
  {
    Question: "A user reports a workstation has been performing strangely after a suspicious email was opened on it earlier in the week. Which of the following should the technician perform FIRST?",
    A: "Escalate the ticket to Tier 2.",
    B: "Run a virus scan.",
    C: "Utilize a Windows restore point.",
    D: "Reimage the computer.",
    Correct: "B",
    Explanation: "When a user reports that their workstation is behaving strangely after opening a suspicious email, the first step a technician should take is to run a virus scan on the computer. This is because opening a suspicious email is a common way for viruses and malware to infect a computer."
  },
  {
    Question: "Each time a user tries to go to the selected web search provider, a different website opens. Which of the following should the technician check FIRST?",
    A: "System time",
    B: "IP address",
    C: "DNS servers",
    D: "Windows updates",
    Correct: "C",
    Explanation: "When a user experiences unexpected or erratic behavior while browsing the internet, it could be caused by the DNS servers. DNS translates human-readable domain names (like google.com) into IP addresses, which computers can use to communicate with web servers. If the DNS servers are not functioning correctly or have been compromised, it can result in the browser being redirected to unintended websites."
  },
  {
    Question: "Which of the following is the STRONGEST wireless configuration?",
    A: "WPS",
    B: "WPA3",
    C: "WEP",
    D: "WMN",
    Correct: "B",
    Explanation: "The strongest wireless configuration is B. WPA3. WPA3 is the most up-to-date wireless encryption protocol and is the most secure choice. It replaces PSK with SAE, a more secure way to do the initial key exchange. At the same time, the session key size of WPA3 increases to 128-bit in WPA3-Personal mode and 192-bit in WPA3-Enterprise, which makes the password harder to crack than the previous Wi-Fi security standards."
  },
  {
    Question: "A technician has an external SSD. The technician needs to read and write to an external SSD on both Macs and Windows PCs. Which of the following filesystems is supported by both OS types?",
    A: "NTFS",
    B: "APFS",
    C: "ext4",
    D: "exFAT",
    Correct: "D",
    Explanation: "The filesystem that is supported by both Macs and Windows PCs is D. exFAT. exFAT is a file system that is designed to be used on flash drives like USB sticks and SD cards. It is supported by both Macs and Windows PCs, and it can handle large files and volumes."
  },
  {
    Question: "A user's system is infected with malware. A technician updates the anti-malware software and runs a scan that removes the malware. After the user reboots the system, it once again becomes infected with malware. Which of the following will MOST likely help to permanently remove the malware?",
    A: "Enabling System Restore",
    B: "Educating the user",
    C: "Booting into safe mode",
    D: "Scheduling a scan",
    Correct: "B",
    Explanation: "Although updating the anti-malware software and running scans are important steps in removing malware, they may not be sufficient to permanently remove the malware if the user keeps engaging in behaviors that leave the system vulnerable. Therefore, educating the user on safe computing practices is the best way to prevent future infections and permanently remove the malware."
  },
  {
    Question: "A user connected a laptop to a wireless network and was tricked into providing login credentials for a website. Which of the following threats was used to carry out the attack?",
    A: "Zero day",
    B: "Vishing",
    C: "DDoS",
    D: "Evil twin",
    Correct: "D",
    Explanation: "The user was tricked into providing login credentials for a website after connecting to a wireless network. This is characteristic of an 'Evil twin' attack. In an Evil twin attack, a rogue wireless access point is set up to mimic a legitimate Wi-Fi network, tricking users into connecting to it and providing sensitive information."
  },
  {
    Question: "Which of the following change management documents includes how to uninstall a patch?",
    A: "Purpose of change",
    B: "Rollback plan",
    C: "Scope of change",
    D: "Risk analysis",
    Correct: "B",
    Explanation: "The change management document that includes how to uninstall a patch is called the 'rollback plan.' The rollback plan is a document that outlines the steps that should be taken to undo a change that has been made to a system. In the case of a patch, the rollback plan would include instructions on how to uninstall the patch if it causes problems or conflicts with other software."
  },
  {
    Question: "A network administrator is deploying a client certificate to be used for Wi-Fi access for all devices in an organization. The certificate will be used in conjunction with the user's existing username and password. Which of the following BEST describes the security benefits realized after this deployment?",
    A: "Multifactor authentication will be forced for Wi-Fi.",
    B: "All Wi-Fi traffic will be encrypted in transit.",
    C: "Eavesdropping attempts will be prevented.",
    D: "Rogue access points will not connect.",
    Correct: "A",
    Explanation: "The deployment of a client certificate for Wi-Fi access in conjunction with the user's existing username and password would enforce multifactor authentication for Wi-Fi. Multifactor authentication involves using more than one method of authentication, adding an extra layer of security. In this case, the combination of something the user knows (username and password) and something the user has (client certificate) would enhance the security of Wi-Fi access."
  },
  {
    Question: "In which of the following scenarios would remote wipe capabilities MOST likely be used? (Select TWO).",
    A: "A new IT policy requires users to set up a lock screen PIN.",
    B: "A user is overseas and wants to use a compatible international SIM Card.",
    C: "A user left the phone at home and wants to prevent children from gaining access to the phone.",
    D: "A user traded in the company phone for a cell carrier upgrade by mistake.",
    E: "A user cannot locate the phone after attending a play at a theater.",
    F: "A user forgot the phone in a taxi, and the driver called the company to return the device.",
    Correct: ["E", "F"],
    Explanation: "Remote wipe capabilities are used to erase all data on a mobile device remotely. This can be useful in situations where a device is lost or stolen, or when sensitive data needs to be removed from a device. Remote wipe capabilities are most likely to be used in the following scenarios: E. A user cannot locate the phone after attending a play at a theater. F. A user forgot the phone in a taxi, and the driver called the company to return the device. In scenario E, remote wipe capabilities would be used to prevent unauthorized access to the device and to protect sensitive data. In scenario F, remote wipe capabilities would be used to erase all data on the device before it is returned to the user."
  },
  {
    Question: "Sensitive data was leaked from a user's smartphone. A technician discovered an unapproved application was installed, and the user has full access to the device's command shell. Which of the following is the NEXT step the technician should take to find the cause of the leaked data?",
    A: "Restore the device to factory settings.",
    B: "Uninstall the unapproved application.",
    C: "Disable the ability to install applications from unknown sources.",
    D: "Ensure the device is connected to the corporate WiFi network.",
    Correct: "B",
    Explanation: "The technician should disable the user's access to the device's command shell. This will prevent the user from accessing sensitive data and will help to prevent further data leaks. The technician should then investigate the unapproved application to determine if it is the cause of the data leak. If the application is found to be the cause of the leak, the technician should uninstall the application and restore the device to factory settings. If the application is not the cause of the leak, the technician should investigate further to determine the cause of the leak. Disabling the ability to install applications from unknown sources can help to prevent future data leaks, but it is not the next step the technician should take in this scenario. Ensuring the device is connected to the corporate WiFi network is not relevant to this scenario."
  },
  {
    Question: "A technician is attempting to mitigate micro power outages, which occur frequently within the area of operation. The outages are usually short, with the longest occurrence lasting five minutes. Which of the following should the technician use to mitigate this issue?",
    A: "Surge suppressor",
    B: "Battery backup",
    C: "CMOS battery",
    D: "Generator backup",
    Correct: "B",
    Explanation: "A battery backup, also known as an uninterruptible power supply (UPS), is a device that provides backup power during a power outage. When the power goes out, the battery backup provides a short amount of time (usually a few minutes up to an hour, depending on the capacity of the device) to save any work and safely shut down the equipment."
  },
  {
    Question: "A user has a license for an application that is in use on a personal home laptop. The user approaches a systems administrator about using the same license on multiple computers on the corporate network. Which of the following BEST describes what the systems administrator should tell the user?",
    A: "Use the application only on the home laptop because it contains the initial license.",
    B: "Use the application at home and contact the vendor regarding a corporate license.",
    C: "Use the application on any computer since the user has a license.",
    D: "Use the application only on corporate computers.",
    Correct: "B",
    Explanation: "Use the application at home and contact the vendor regarding a corporate license. The user should use the application only on the home laptop because it contains the initial license. The user should contact the vendor regarding a corporate license if they want to use the application on multiple computers on the corporate network."
  },
  {
    Question: "A technician is setting up a new laptop. The company's security policy states that users cannot install virtual machines. Which of the following should the technician implement to prevent users from enabling virtual technology on their laptops?",
    A: "UEFI password",
    B: "Secure boot",
    C: "Account lockout",
    D: "Restricted user permissions",
    Correct: "B",
    Explanation: "A technician setting up a new laptop must ensure that users cannot install virtual machines as the company's security policy states. One way to prevent users from enabling virtual technology is by implementing Secure Boot. Secure Boot is a feature of UEFI firmware that ensures the system only boots using firmware that is trusted by the manufacturer. It verifies the signature of all bootloaders, operating systems, and drivers before running them, preventing any unauthorized modifications to the boot process. This will help prevent users from installing virtual machines on the laptop without authorization."
  },
  {
    Question: "The web browsing speed on a customer's mobile phone slows down every few weeks and then returns to normal after three or four days. Restarting the device does not usually restore performance. Which of the following should a technician check FIRST to troubleshoot this issue?",
    A: "Data usage limits",
    B: "Wi-Fi connection speed",
    C: "Status of airplane mode",
    D: "System uptime",
    Correct: "B",
    Explanation: "The technician should check the Wi-Fi connection speed first to troubleshoot this issue. Slow web browsing speed on a mobile phone can be caused by a slow Wi-Fi connection. The technician should check the Wi-Fi connection speed to ensure that it is fast enough to support web browsing. If the WiFi connection speed is slow, the technician should troubleshoot the Wi-Fi network to identify and resolve the issue."
  },
  {
    Question: "Following a recent power outage, several computers have been receiving errors when booting. The technician suspects file corruption has occurred. Which of the following steps should the technician try FIRST to correct the issue?",
    A: "Rebuild the Windows profiles.",
    B: "Restore the computers from backup.",
    C: "Reimage the computers.",
    D: "Run the System File Checker.",
    Correct: "D",
    Explanation: "The technician should run the System File Checker (SFC) first to correct file corruption errors on computers after a power outage. SFC is a command-line utility that scans for and repairs corrupted system files. It can be run from the command prompt or from the Windows Recovery Environment. Rebuilding the Windows profiles, restoring the computers from backup, and reimaging the computers are more drastic measures that should be taken only if SFC fails to correct the issue."
  },
  {
    Question: "A user is unable to access a website, which is widely used across the organization, and receives the following error message: The security certificate presented by this website has expired or is not yet valid. The technician confirms the website works when accessing it from another computer but not from the user's computer. Which of the following should the technician perform NEXT to troubleshoot the issue?",
    A: "Reboot the computer.",
    B: "Reinstall the OS.",
    C: "Configure a static IP.",
    D: "Check the computer's date and time.",
    Correct: "D",
    Explanation: "The error message indicates that the security certificate presented by the website has either expired or is not yet valid. This can happen if the computer's clock has the wrong date or time, as SSL/TLS certificates have a specific validity period. If the clock is off by too much, it may cause the certificate to fail to validate. Therefore, the technician should check the computer's date and time and ensure that they are correct."
  },
  {
    Question: "A company has just refreshed several desktop PCs. The hard drives contain PII. Which of the following is the BEST method to dispose of the drives?",
    A: "Drilling",
    B: "Degaussing",
    C: "Low-level formatting",
    D: "Erasing/wiping",
    Correct: "D",
    Explanation: "Erasing/wiping the hard drives is the best method to dispose of the drives containing PII."
  },
  {
    Question: "After a company installed a new SOHO router customers were unable to access the company-hosted public website. Which of the following will MOST likely allow customers to access the website?",
    A: "Port forwarding",
    B: "Firmware updates",
    C: "IP filtering",
    D: "Content filtering",
    Correct: "B",
    Explanation: "If customers are unable to access the company-hosted public website after installing a new SOHO router, the company should check for firmware updates. Firmware updates can fix bugs and compatibility issues that may be preventing customers from accessing the website. The company should also ensure that the router is properly configured to allow traffic to the website. If the router is blocking traffic to the website, the company should configure the router to allow traffic to the website."
  },
  {
    Question: "A new spam gateway was recently deployed at a small business. However, users still occasionally receive spam. The management team is concerned that users will open the messages and potentially infect the network systems. Which of the following is the MOST effective method for dealing with this issue?",
    A: "Adjusting the spam gateway",
    B: "Updating firmware for the spam appliance",
    C: "Adjusting AV settings",
    D: "Providing user training",
    Correct: "D",
    Explanation: "The most effective method for dealing with spam messages in a small business is to provide user training. Users should be trained to recognize spam messages and avoid opening them. They should also be trained to report spam messages to the IT department so that appropriate action can be taken. In addition, users should be trained to avoid clicking on links or downloading attachments from unknown sources. By providing user training, the management team can reduce the risk of users opening spam messages and potentially infecting the network systems."
  },
  {
    Question: "A user reports a PC is running slowly. The technician suspects high disk I/O. Which of the following should the technician perform NEXT?",
    A: "resmon.exe",
    B: "dfrgui.exe",
    C: "msinfo32.exe",
    D: "msconfig.exe",
    Correct: "A",
    Explanation: "If a technician suspects high disk I/O, the technician should use the Resource Monitor (resmon.exe) to identify the process that is causing the high disk I/O. Resource Monitor provides detailed information about the system's resource usage, including disk I/O. The technician can use this information to identify the process that is causing the high disk I/O and take appropriate action."
  },
  {
    Question: "A macOS user needs to create another virtual desktop space. Which of the following applications will allow the user to accomplish this task?",
    A: "Dock",
    B: "Spotlight",
    C: "Mission Control",
    D: "Launchpad",
    Correct: "C",
    Explanation: "The application that will allow a macOS user to create another virtual desktop space is Mission Control. Mission Control lets you create additional desktops, called spaces, to organize the windows of your apps. You can create a space by entering Mission Control and clicking the Add button in the Spaces bar. You can also assign apps to specific spaces and move between them easily."
  },
  {
    Question: "A technician is troubleshooting a computer with a suspected short in the power supply. Which of the following is the FIRST step the technician should take?",
    A: "Put on an ESD strap",
    B: "Disconnect the power before servicing the PC.",
    C: "Place the PC on a grounded workbench.",
    D: "Place components on an ESD mat.",
    Correct: "B",
    Explanation: "The first step a technician should take when troubleshooting a computer with a suspected short in the power supply is to disconnect the power before servicing the PC. This is to prevent any electrical shock or damage to the components. A power supply can be dangerous even when unplugged, as capacitors can maintain a line voltage charge for a long time. Therefore, it is important to disconnect the power cord and press the power button to discharge any residual power before opening the case. The other steps are also important for safety and proper diagnosis, but they should be done after disconnecting the power."
  },
  {
    Question: "A team of support agents will be using their workstations to store credit card data. Which of the following should the IT department enable on the workstations in order to remain compliant with common regulatory controls? (Select TWO).",
    A: "Encryption",
    B: "Antivirus",
    C: "AutoRun",
    D: "Guest accounts",
    E: "Default passwords",
    F: "Backups",
    Correct: ["A", "F"],
    Explanation: "Encryption is a way of protecting cardholder data by transforming it into an unreadable format that can only be decrypted with a secret key. Backups are a way of ensuring that cardholder data is not lost or corrupted in case of a disaster or system failure. Both encryption and backups are part of the PCI DSS requirements that apply to any entity that stores, processes, or transmits cardholder data. The other options are not directly related to credit card data security or compliance."
  },
  {
    Question: "A user is unable to log in to the network. The network uses 802.1X with EAP-TLS to authenticate on the wired network. The user has been on an extended leave and has not logged in to the computer in several months. Which of the following is causing the login issue?",
    A: "Expired certificate",
    B: "OS update failure",
    C: "Service not started",
    D: "Application crash",
    E: "Profile rebuild needed",
    Correct: "A",
    Explanation: "EAP-TLS is a method of authentication that uses certificates to establish a secure tunnel between the client and the server. The certificates have a validity period and must be renewed before they expire. If the user has been on an extended leave and has not logged in to the computer in several months, it is possible that the certificate on the client or the server has expired and needs to be renewed. The other options are not directly related to EAP-TLS authentication or 802.1X network access."
  },
  {
    Question: "A company is deploying mobile phones on a one-to-one basis, but the IT manager is concerned that users will root/jailbreak their phones. Which of the following technologies can be implemented to prevent this issue?",
    A: "Signed system images",
    B: "Antivirus",
    C: "SSO",
    D: "MDM",
    Correct: "D",
    Explanation: "MDM stands for Mobile Device Management, and it is a way of remotely managing and securing mobile devices that are used for work purposes. MDM can enforce policies and restrictions on the devices, such as preventing users from installing unauthorized apps, modifying system settings, or accessing root privileges. MDM can also monitor device status, wipe data, lock devices, or locate lost or stolen devices."
  },
  {
    Question: "A technician is troubleshooting an issue that requires a user profile to be rebuilt. The technician is unable to locate Local Users and Groups in the Mtv1C console. Which of the following is the NEXT step the technician should take to resolve the issue?",
    A: "Run the antivirus scan.",
    B: "Add the required snap-in.",
    C: "Restore the system backup",
    D: "Use the administrator console.",
    Correct: "B",
    Explanation: "Local Users and Groups is a Microsoft Management Console (MMC) snap-in that allows you to manage user accounts or groups on your computer. If you cannot find it in the MMC console, you can add it manually by following these steps: Press Windows key + R to open the Run dialog box, or open the Command Prompt. Type mmc and hit Enter. This will open a blank MMC console. Click File and then Add/Remove Snap-in. In the Add or Remove Snap-ins window, select Local Users and Groups from the Available snap-ins list, and click Add. In the Select Computer window, choose Local computer or Another computer, depending on which computer you want to manage, and click Finish. Click OK to close the Add or Remove Snap-ins window. You should now see Local Users and Groups in the MMC console."
  },
  {
    Question: "A technician needs to manually set an IP address on a computer that is running macOS. Which of the following commands should the technician use?",
    A: "ipconfig",
    B: "ifconfig",
    C: "arpa",
    D: "ping",
    Correct: "B",
    Explanation: "ifconfig is a command-line utility that allows you to configure network interfaces on macOS and other Unix-like systems. To set an IP address using ifconfig, you need to know the name of the network interface you want to configure (such as en0 or en1), and the IP address you want to assign (such as 192.168.0.150). You also need to use sudo to run the command with administrative privileges. The syntax of the command is: sudo ifconfig interface address. For example, to set the IP address of en1 to 192.168.0.150, you would type: sudo ifconfig en1 192.168.0.150. You may also need to specify other parameters such as subnet mask, gateway, or DNS servers, depending on your network configuration. The other commands are not directly related to setting an IP address on macOS. ipconfig is a similar command for Windows systems, arpa is a domain name used for reverse DNS lookup, and ping is a command for testing network connectivity."
  },
  {
    Question: "A mobile phone user has downloaded a new payment application that allows payments to be made with a mobile device. The user attempts to use the device at a payment terminal but is unable to do so successfully. The user contacts a help desk technician to report the issue. Which of the following should the technician confirm NEXT as part of the troubleshooting process?",
    A: "If airplane mode is enabled",
    B: "If Bluetooth is disabled",
    C: "If NFC is enabled",
    D: "If WiFi is enabled",
    E: "If location services are disabled",
    Correct: "C",
    Explanation: "NFC stands for Near Field Communication, and it is a wireless technology that allows your phone to act as a contactless payment device, among other things. Payment applications that allow payments to be made with a mobile device usually rely on NFC to communicate with the payment terminal. Therefore, if NFC is disabled on the phone, the payment will not work. To enable NFC on an Android phone, you need to follow these steps: On your Android device, open the Settings app. Select Connected devices. Tap on Connection preferences. You should see the NFC option. Toggle it on. The other options are not directly related to using a payment application with a mobile device. Airplane mode is a setting that disables all wireless communication on the phone, including NFC, but it also affects calls, texts, and internet access. Bluetooth is a wireless technology that allows you to connect your phone with other devices such as headphones or speakers, but it is not used for contactless payments. Wi-Fi is a wireless technology that allows you to access the internet or a local network, but it is also not used for contactless payments. Location services are a feature that allows your phone to determine your geographic location using GPS or other methods, but they are not required for contactless payments."
  },
  {
    Question: "Antivirus software indicates that a workstation is infected with ransomware that cannot be quarantined. Which of the following should be performed FIRST to prevent further damage to the host and other systems?",
    A: "Power off the machine.",
    B: "Run a full antivirus scan.",
    C: "Remove the LAN card.",
    D: "Install a different endpoint solution.",
    Correct: "A",
    Explanation: "Ransomware is a type of malware that encrypts the files on a system and demands a ransom for their decryption. Ransomware can also spread to other systems on the network or exfiltrate sensitive data to the attackers. Therefore, it is important to isolate the infected machine as soon as possible to contain the infection and prevent further damage. Powering off the machine is a quick and effective way of disconnecting it from the network and stopping any malicious processes running on it. The other options are not directly related to preventing ransomware damage or may not be effective. Running a full antivirus scan may not be able to detect or remove the ransomware, especially if it is a new or unknown variant. Removing the LAN card may disconnect the machine from the network, but it may not stop any malicious processes running on it or any data encryption or exfiltration that has already occurred. Installing a different endpoint solution may not be possible or helpful if the system is already infected and locked by ransomware."
  },
  {
    Question: "A user updates a mobile device's OS. A frequently used application becomes consistently unresponsive immediately after the device is launched. Which of the following troubleshooting steps should the user perform FIRST?",
    A: "Delete the application's cache.",
    B: "Check for application updates.",
    C: "Roll back the OS update.",
    D: "Uninstall and reinstall the application.",
    Correct: "B",
    Explanation: "Sometimes, an OS update can cause compatibility issues with some applications that are not optimized for the new version of the OS. To fix this, the user should check if there are any updates available for the application that can resolve the issue. The user can check for application updates by following these steps: On an Android device, open the Google Play Store app and tap on the menu icon in the top left corner. Then tap on My apps & games and look for any updates available for the application. If there is an update, tap on Update to install it. On an iOS device, open the App Store app and tap on the Updates tab at the bottom. Then look for any updates available for the application. If there is an update, tap on Update to install it."
  },
  {
    Question: "A technician needs to provide recommendations about how to upgrade backup solutions for a site in an area that has frequent hurricanes and an unstable power grid. Which of the following should the technician recommend implementing?",
    A: "High availability",
    B: "Regionally diverse backups",
    C: "On-site backups",
    D: "Incremental backups",
    Correct: "B",
    Explanation: "Regionally diverse backups are backups that are stored in different geographic locations, preferably far away from the primary site. This way, if a disaster such as a hurricane or a power outage affects one location, the backups in another location will still be available and accessible. Regionally diverse backups can help ensure business continuity and data recovery in case of a disaster. The other options are not the best backup solutions for a site in an area that has frequent hurricanes and an unstable power grid. High availability is a feature that allows a system to remain operational and accessible even if one or more components fail, but it does not protect against data loss or corruption. On-site backups are backups that are stored in the same location as the primary site, which means they are vulnerable to the same disasters that can affect the primary site. Incremental backups are backups that only store the changes made since the last backup, which means they require less storage space and bandwidth, but they also depend on previous backups to restore data and may not be sufficient for disaster recovery."
  },
  {
    Question: "A technician is troubleshooting application crashes on a Windows workstation. Each time the workstation user tries to open a website in a browser, the following message is displayed: crypt32.dll is missing not found. Which of the following should the technician attempt FIRST?",
    A: "Rebuild Windows profiles.",
    B: "Reimage the workstation",
    C: "Roll back updates",
    D: "Perform a system file check",
    Correct: "D",
    Explanation: "If this file is missing or corrupted, it can cause application crashes or errors when trying to open websites in a browser. To fix this, the technician can perform a system file check, which is a utility that scans and repairs corrupted or missing system files. To perform a system file check, the technician can follow these steps: Open the Command Prompt as an administrator. To do this, type cmd in the search box on the taskbar, right-click on Command Prompt, and select Run as administrator. In the Command Prompt window, type sfc /scannow and hit Enter. This will start the scanning and repairing process, which may take some time. Wait for the process to complete. If any problems are found and fixed, you will see a message saying Windows Resource Protection found corrupt files and successfully repaired them. If no problems are found, you will see a message saying Windows Resource Protection did not find any integrity violations. Restart your computer and check if the issue is resolved."
  },
  {
    Question: "A user needs assistance installing software on a Windows PC but will not be in the office. Which of the following solutions would a technician MOST likely use to assist the user without having to install additional software?",
    A: "VPN",
    B: "MSRA",
    C: "SSH",
    D: "RDP",
    Correct: "B",
    Explanation: "MSRA stands for Microsoft Remote Assistance, and it is a feature that allows a technician to remotely view and control another user’s Windows PC with their permission. MSRA is built-in to Windows and does not require any additional software installation. To use MSRA, the technician and the user need to follow these steps: On the user’s PC, type msra in the search box on the taskbar and select Invite someone to connect to your PC and help you, or offer to help someone else. Select Save this invitation as a file and choose a location to save the file. This file contains a password that the technician will need to connect to the user’s PC. Send the file and the password to the technician via email or another secure method. On the technician’s PC, type msra in the search box on the taskbar and select Help someone who has invited you. Select Use an invitation file and browse to the location where the file from the user is saved. Enter the password when prompted. The user will see a message asking if they want to allow the technician to connect to their PC. The user should select Yes. The technician will see the user’s desktop and can request control of their PC by clicking Request control on the top bar. The user should allow this request by clicking Yes. The technician can now view and control the user’s PC and assist them with installing software."
  },
  {
    Question: "A technician is upgrading the backup system for documents at a high-volume law firm. The current backup system can retain no more than three versions of full backups before failing. The law firm is not concerned about restore times but asks the technician to retain more versions when possible. Which of the following backup methods should the technician MOST likely implement?",
    A: "Full",
    B: "Mirror",
    C: "Incremental",
    D: "Differential",
    Correct: "C",
    Explanation: "Incremental backup is a backup method that only backs up the files that have changed since the last backup, whether it was a full or an incremental backup. Incremental backup can save storage space and bandwidth, as it does not copy the same files over and over again. Incremental backup can also retain more versions of backups, as it only stores the changes made to the files. However, incremental backup can have longer restore times, as it requires restoring the last full backup and all the subsequent incremental backups in order to recover the data. The law firm is not concerned about restore times but asks the technician to retain more versions when possible, so incremental backup would be a suitable choice for them."
  },
  {
    Question: "A technician receives a call from a user who is unable to open Outlook. The user states that Outlook worked fine yesterday, but the computer may have restarted sometime overnight. Which of the following is the MOST likely reason Outlook has stopped functioning?",
    A: "Spam filter installation",
    B: "Invalid registry settings",
    C: "Malware infection",
    D: "Operating system update",
    Correct: "D",
    Explanation: null,
  },
  {
    Question: "Which of the following editions of Windows 10 requires reactivation every 180 days?",
    A: "Enterprise",
    B: "Pro for Workstation",
    C: "Home",
    D: "Pro",
    Correct: "A",
    Explanation: "Windows 10 Enterprise is an edition of Windows 10 that is designed for large organizations that need advanced security and management features. Windows 10 Enterprise can be activated using different methods, such as Multiple Activation Key (MAK), Active Directory-based Activation (ADBA), or Key Management Service (KMS). KMS is a method of activation that uses a local server to activate multiple devices on a network. KMS activations are valid for 180 days and need to be renewed periodically by connecting to the KMS server. If a device does not renew its activation within 180 days, it will enter a grace period of 30 days, after which it will display a warning message and lose some functionality until it is reactivated. The other editions of Windows 10 do not require reactivation every 180 days. Windows 10 Pro for Workstation is an edition of Windows 10 that is designed for high-performance devices that need advanced features such as ReFS file system, persistent memory, and faster file sharing. Windows 10 Pro for Workstation can be activated using a digital license or a product key. Windows 10 Home is an edition of Windows 10 that is designed for personal or home use. Windows 10 Home can be activated using a digital license or a product key. Windows 10 Pro is an edition of Windows 10 that is designed for business or professional use. Windows 10 Pro can be activated using a digital license or a product key. None of these editions require reactivation every 180 days unless there are significant hardware changes or other issues that affect the activation status."
  },
  {
    Question: "A BSOD appears on a user's workstation monitor. The user immediately presses the power button to shut down the PC, hoping to repair the issue. The user then restarts the PC, and the BSOD reappears, so the user contacts the help desk. Which of the following should the technician use to determine the cause?",
    A: "Stop code",
    B: "Event Viewer",
    C: "Services",
    D: "System Configuration",
    Correct: "A",
    Explanation: "When a Blue Screen of Death (BSOD) appears on a Windows workstation, it indicates that there is a serious problem with the operating system. The stop code displayed on the BSOD can provide valuable information to help determine the cause of the issue. The stop code is a specific error code that is associated with the BSOD, and it can help identify the root cause of the problem. In this scenario, the user has encountered a BSOD and has restarted the PC, only to see the BSOD reappear. This suggests that the problem is persistent and requires further investigation. By analyzing the stop code displayed on the BSOD, a technician can begin to identify the underlying issue and take appropriate actions to resolve it."
  },
  {
    Question: "A technician is troubleshooting boot times for a user. The technician attempts to use MSConfig to see which programs are starting with the OS but receives a message that it can no longer be used to view startup items. Which of the following programs can the technician use to view startup items?",
    A: "msinfo32",
    B: "perfmon",
    C: "regedit",
    D: "taskmgr",
    Correct: "D",
    Explanation: "When troubleshooting boot times for a user, a technician may want to check which programs are starting with the operating system to identify any that may be slowing down the boot process. MSConfig is a tool that can be used to view startup items on a Windows system, but it may not always be available or functional. In this scenario, the technician receives a message that MSConfig cannot be used to view startup items. As an alternative, the technician can use Task Manager (taskmgr), which can also display the programs that run at startup. To access the list of startup items in Task Manager, the technician can follow these steps: Open Task Manager by pressing Ctrl+Shift+Esc. Click the 'Startup' tab. The list of programs that run at startup will be displayed."
  },
  {
    Question: "A desktop engineer is deploying a master image. Which of the following should the desktop engineer consider when building the master image? (Select TWO).",
    A: "Device drivers",
    B: "Keyboard backlight settings",
    C: "Installed application license keys",
    D: "Display orientation",
    E: "Target device power supply",
    F: "Disabling express charging",
    Correct: ["A", "C"],
    Explanation: "A. Device drivers23: Device drivers are software components that enable the operating system to communicate with hardware devices. Different devices may require different drivers, so the desktop engineer should include the appropriate drivers in the master image or configure the deployment process to install them automatically.\nC. Installed application license keys2: Installed application license keys are codes that activate or authenticate software applications. Some applications may require license keys to be entered during installation or after deployment. The desktop engineer should include the license keys in the master image or configure the deployment process to apply them automatically."
  },
  {
    Question: "A technician is setting up a conference room computer with a script that boots the application on login. Which of the following would the technician use to accomplish this task? (Select TWO).",
    A: "File Explorer",
    B: "Startup Folder",
    C: "System Information",
    D: "Programs and Features",
    E: "Task Scheduler",
    F: "Device Manager",
    Correct: ["B", "E"],
    Explanation: "B. Startup Folder1: The Startup folder is a special folder that contains shortcuts to programs or scripts that will run automatically when a user logs on. The technician can create a shortcut to the script and place it in the Startup folder for the conference room computer or for all users.\nE. Task Scheduler23: The Task Scheduler is a tool that allows you to create tasks that run at specified times or events. The technician can create a task that runs the script at logon for the conference room computer or for all users."
  },
  {
    Question: "A neighbor successfully connected to a user's Wi-Fi network. Which of the following should the user do after changing the network configuration to prevent the neighbor from being able to connect again?",
    A: "Disable the SSID broadcast.",
    B: "Disable encryption settings.",
    C: "Disable DHCP reservations.",
    D: "Disable logging.",
    Correct: "A",
    Explanation: "A. Disable the SSID broadcast1: The SSID broadcast is a feature that allows a Wi-Fi network to be visible to nearby devices. Disabling the SSID broadcast can make the network harder to find by unauthorized users, but it does not prevent them from accessing it if they know the network name and password."
  },
  {
    Question: "A technician is troubleshooting a PC that has been performing poorly. Looking at the Task Manager, the technician sees that CPU and memory resources seem fine, but disk throughput is at 100%.\nWhich of the following types of malware is the system MOST likely infected with?",
    A: "Keylogger",
    B: "Rootkit",
    C: "Ransomware",
    D: "Trojan",
    Correct: "C",
    Explanation: "Ransomware is a type of malware that encrypts the files on the victim’s computer and demands a ransom for their decryption. Ransomware can cause high disk throughput by encrypting large amounts of data in a short time."
  },
  {
    Question: "A homeowner recently moved and requires a new router for the new ISP to function correctly. The internet service has been installed and has been confirmed as functional. Which of the following is the FIRST step the homeowner should take after installation of all relevant cabling and hardware?",
    A: "Convert the PC from a DHCP assignment to a static IP address.",
    B: "Run a speed test to ensure the advertised speeds are met.",
    C: "Test all network sharing and printing functionality the customer uses.",
    D: "Change the default passwords on new network devices.",
    Correct: "D",
    Explanation: "When a homeowner moves and sets up a new router for the new ISP it is important to take appropriate security measures to protect their network from potential security threats. The FIRST step that the homeowner should take after installation of all relevant cabling and hardware is to change the default passwords on new network devices.\nMost modern routers come with default usernames and passwords that are widely known to potential attackers. If these defaults are not changed, it could make it easier for external attackers to gain unauthorized access to the network. Changing the passwords on new network devices is a simple but effective way to improve the security posture of the network."
  },
  {
    Question: "A user rotates a cell phone horizontally to read emails, but the display remains vertical, even though the settings indicate autorotate is on. Which of the following will MOST likely resolve the issue?",
    A: "Recalibrating the magnetometer",
    B: "Recalibrating the compass",
    C: "Recalibrating the digitizer",
    D: "Recalibrating the accelerometer",
    Correct: "D",
    Explanation: "When a user rotates a cell phone horizontally to read emails and the display remains vertical, even though the settings indicate autorotate is on, this is typically due to a problem with the phone's accelerometer. The accelerometer is the sensor that detects changes in the phone's orientation and adjusts the display accordingly. If the accelerometer is not calibrated correctly, the display may not rotate as expected. Recalibrating the accelerometer is the most likely solution to this issue. The process for recalibrating the accelerometer can vary depending on the specific device and operating system, but it typically involves going to the device's settings and finding the option to calibrate or reset the sensor. Users may need to search their device's documentation or online resources to find specific instructions for their device."
  },
  {
    Question: "Which of the following is the proper way for a technician to dispose of used printer consumables?",
    A: "Proceed with the custom manufacturer's procedure.",
    B: "Proceed with the disposal of consumables in standard trash receptacles.",
    C: "Empty any residual ink or toner from consumables before disposing of them in a standard recycling bin.",
    D: "Proceed with the disposal of consumables in standard recycling bins.",
    Correct: "A",
    Explanation: "When it comes to disposing of used printer consumables, it is important to follow the manufacturer's instructions or guidelines for proper disposal, as different types of consumables may require different disposal procedures. Some manufacturers provide specific instructions for proper disposal, such as sending the used consumables back to the manufacturer or using special recycling programs. Therefore, the proper way for a technician to dispose of used printer consumables is to proceed with the custom manufacturer's procedure, if provided. This option ensures that the disposal is handled in an environmentally friendly and safe manner."
  },
  {
    Question: "A large company is selecting a new Windows operating system and needs to ensure it has built-in encryption and endpoint protection. Which of the following Windows versions will MOST likely be selected?",
    A: "Home",
    B: "Pro",
    C: "Pro for Workstations",
    D: "Enterprise",
    Correct: "D",
    Explanation: "When selecting a new Windows operating system for a large company that needs built-in encryption and endpoint protection, the Enterprise edition is the most likely choice. This edition provides advanced security features such as Windows Defender Advanced Threat Protection (ATP), AppLocker, and BitLocker Drive Encryption. These features can help to protect the company's data and endpoints against malware attacks, unauthorized access, and data theft. The Home and Pro editions of Windows do not include some of the advanced security features provided by the Enterprise edition, such as Windows Defender ATP and AppLocker. The Pro for Workstations edition is designed for high-performance and high-end hardware configurations, but it does not provide additional security features beyond those provided by the Pro edition."
  },
  {
    Question: "A user tries to access commonly used web pages but is redirected to unexpected websites. Clearing the web browser cache does not resolve the issue. Which of the following should a technician investigate NEXT to resolve the issue?",
    A: "Enable firewall ACLs.",
    B: "Examine the localhost file entries.",
    C: "Verify the routing tables.",
    D: "Update the antivirus definitions.",
    Correct: "B",
    Explanation: "A possible cause of the user being redirected to unexpected websites is that the localhost file entries have been modified by malware or hackers to point to malicious or unwanted websites. The localhost file is a text file that maps hostnames to IP addresses and can override DNS settings. By examining the localhost file entries, a technician can identify and remove any suspicious or unauthorized entries that may cause the redirection issue. Enabling firewall ACLs may not resolve the issue if the firewall rules do not block the malicious or unwanted websites. Verifying the routing tables may not resolve the issue if the routing configuration is correct and does not affect the web traffic. Updating the antivirus definitions may help prevent future infections but may not remove the existing malware or changes to the localhost file. Reference: CompTIA A+ Core 2 (220-1002) Certification Exam Objectives Version 4.0, Domain 1.3"
  },
  {
    Question: "A network technician installed a SOHO router for a home office user. The user has read reports about home routers being targeted by malicious actors and then used in DDoS attacks. Which of the following can the technician MOST likely do to defend against this threat?",
    A: "Add network content filtering.",
    B: "Disable the SSID broadcast.",
    C: "Configure port forwarding.",
    D: "Change the default credentials.",
    Correct: "D",
    Explanation: "One of the most effective ways to defend against malicious actors targeting home routers for DDoS attacks is to change the default credentials of the router. The default credentials are often well- known or easily guessed by attackers, who can then access and compromise the router settings and firmware. By changing the default credentials to strong and unique ones, a technician can prevent unauthorized access and configuration changes to the router. Adding network content filtering may help block some malicious or unwanted websites but may not prevent attackers from exploiting router vulnerabilities or backdoors. Disabling the SSID broadcast may help reduce the visibility of the wireless network but may not prevent attackers from scanning or detecting it. Configuring port forwarding may help direct incoming traffic to specific devices or services but may not prevent attackers from sending malicious packets or requests to the router. Reference: CompTIA A+ Core 2 (220-1002) Certification Exam Objectives Version 4.0, Domain 3.3"
  },
  {
    Question: "A technician is preparing to remediate a Trojan virus that was found on a workstation. Which of the following steps should the technician complete BEFORE removing the virus?",
    A: "Disable System Restore.",
    B: "Schedule a malware scan.",
    C: "Educate the end user.",
    D: "Run Windows Update.",
    Correct: "A",
    Explanation: null
  }
]
