// Fetch and load content.html into the #content div
fetch('content.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data;
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
// RSVP button functionality
function addRSVPListeners() {
    document.querySelectorAll('.rsvp-button').forEach(button => {
        button.addEventListener('click', () => {
            alert(`Thank you! Your response: "${button.textContent}" has been recorded.`);
        });
    });
}
