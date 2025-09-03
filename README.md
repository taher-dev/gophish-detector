# Gophish Detector Chrome Extension

![Extension Icon](https://raw.githubusercontent.com/user/repo/main/gophish-detector/icons/icon128.png)

A simple but effective browser extension to automatically detect and warn users about potential phishing emails sent from the **Gophish** phishing framework within the Gmail interface.

---

## Features

- **🛡️ Automatic Email Scanning**: The extension runs in the background, automatically scanning the content of emails as you open them in Gmail.
- **⚠️ Prominent Warning Banner**: If a potential Gophish email is detected, a highly visible warning banner is injected at the top of the email body.
- **🔗 Malicious Link Highlighting**: The specific links that match the Gophish tracking pattern are visually highlighted with a red, dashed border to prevent accidental clicks.
- **✅ Simple Toggle Control**: You can easily enable or disable the extension's functionality through a simple switch in the extension popup.

---

## How It Works

Gophish, a popular open-source phishing framework, embeds a unique recipient ID in its campaign links and tracking images for reporting purposes. This is typically done using a URL parameter, `rid=`.

This extension scans the HTML content of each email for links (`<a>` tags) and images (`<img>` tags) containing the `rid=` parameter in their URL. If this pattern is found, the extension flags the email as a potential Gophish phishing attempt and triggers the visual warnings.

---

## Installation

Since this extension is not on the Chrome Web Store, you can load it manually using Developer Mode.

1.  **Download the Code**: Download the provided `gophish-detector.zip` file and unzip it to a permanent location on your computer.
2.  **Open Chrome Extensions**: Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode**: In the top-right corner of the extensions page, turn on the "Developer mode" toggle.
4.  **Load the Extension**: Click the "Load unpacked" button that appears on the top-left.
5.  **Select the Directory**: In the file selection dialog, navigate to and select the `gophish-detector` folder (the one you unzipped).

The Gophish Detector extension icon should now appear in your Chrome toolbar.

---

## Usage

Once installed, the extension works automatically.

- **Browse Gmail**: Simply open and view emails in your Gmail account as you normally would. The extension will scan them in the background.
- **View Warnings**: If a suspicious email is found, you will see a banner like this:
  > **⚠️ WARNING: This email contains tracking patterns similar to those used in Gophish phishing campaigns. Do not click any links or download attachments.**
- **Toggle On/Off**: Click on the fishhook icon in your Chrome toolbar to open a small popup. Use the toggle switch to turn the extension's scanning functionality on or off at any time.

---

## File Structure

```
gophish-detector/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── styles.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

A brief overview of the key files in this project:

- `manifest.json`: The core configuration file for the Chrome extension. It declares permissions, content scripts, and other metadata.
- `content.js`: This is the main script that gets injected into the Gmail page. It contains the logic for scanning email content, observing page changes, and injecting the warning elements.
- `styles.css`: This file contains the CSS rules for styling the warning banner and the flagged phishing links.
- `popup.html`: The HTML structure for the popup that appears when you click the extension icon.
- `popup.js`: Handles the logic for the popup, specifically saving and loading the enabled/disabled state of the extension.
- `icons/`: Contains the various sizes of the extension's icon.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
