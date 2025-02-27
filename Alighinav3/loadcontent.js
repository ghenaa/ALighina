// Fetch and load content.html into the #content div
fetch('content.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data;
        setupRSVPButtons(); // Ensure buttons work after loading content
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });

// Disable right-click (context menu)
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable F12 and other DevTools shortcuts
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' || // F12 for DevTools
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U') // Ctrl+U (view source)
    ) {
        e.preventDefault();
    }
});

// Function to submit RSVP response to Google Sheets
function submitRSVP(attendance) {
    const googleSheetURL = 'https://script.google.com/macros/s/AKfycbzEmGmKbKbaM6hPZdCih0m0Lsp0LRBAx6XhSUWvahleBt4dPv62OlhUIYdNXjL3Pf4iXg/exec'; // Replace with your deployed Web App URL

    fetch(googleSheetURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: attendance }),
    }).then(() => {
        alert('Thank you for your response!');
    }).catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
}

// Attach event listeners to RSVP buttons after content loads
function setupRSVPButtons() {
    document.getElementById('yesButton').addEventListener('click', () => submitRSVP('Yes'));
    document.getElementById('noButton').addEventListener('click', () => submitRSVP('No'));
}
