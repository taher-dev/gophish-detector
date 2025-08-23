document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('enabled-toggle');

    // Load the saved state from chrome.storage
    chrome.storage.sync.get(['isEnabled'], (result) => {
        toggle.checked = !!result.isEnabled;
    });

    // Save the state when the toggle is changed
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ isEnabled: isEnabled });
    });
});