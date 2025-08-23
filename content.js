// Function to scan the email body for Gophish links and images
function scanForGophish() {
    // Check if the extension is enabled first
    chrome.storage.sync.get(['isEnabled'], (result) => {
        if (!result.isEnabled) {
            return; // Do nothing if disabled
        }

        const emailBody = document.querySelector('.a3s.aiL'); // This selector works for Gmail's main email view
        if (!emailBody) return;

        // Check if we've already added a banner to this email to avoid duplicates
        if (emailBody.querySelector('.gophish-warning-banner')) {
            return;
        }

        const links = emailBody.querySelectorAll('a');
        const images = emailBody.querySelectorAll('img');
        let phishingDetected = false;
        const phishingLinks = [];

        // Check all links for the 'rid' parameter
        links.forEach(link => {
            if (link.href && link.href.includes('rid=')) {
                phishingDetected = true;
                phishingLinks.push(link);
            }
        });
        
        // Check tracking images for the 'rid' parameter
        images.forEach(img => {
            if (img.src && img.src.includes('rid=')) {
                phishingDetected = true;
            }
        });

        if (phishingDetected) {
            showWarningBanner(emailBody);
            markPhishingLinks(phishingLinks);
        }
    });
}

// Function to inject the warning banner
function showWarningBanner(elementToAttachTo) {
    const banner = document.createElement('div');
    banner.className = 'gophish-warning-banner';
    banner.textContent = '⚠️ WARNING: This email contains tracking patterns similar to those used in Gophish phishing campaigns. Do not click any links or download attachments.';
    elementToAttachTo.prepend(banner);
}

// Function to highlight the malicious links
function markPhishingLinks(links) {
    links.forEach(link => {
        link.classList.add('gophish-link-flagged');
    });
}

// Gmail's interface loads emails dynamically, so we need to watch for changes.
// A MutationObserver is perfect for this.
const observer = new MutationObserver((mutations) => {
    // A simple delay to ensure the email body is fully loaded
    setTimeout(scanForGophish, 500);
});

// Start observing the main document body for added nodes
observer.observe(document.body, {
    childList: true,
    subtree: true
});