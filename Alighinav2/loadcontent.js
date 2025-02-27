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
            const response = button.textContent.trim();
            const guestName = prompt('Please enter your name:');
            if (guestName) {
                saveToCSV(guestName, response);
                alert(`Thank you, ${guestName}! Your response: "${response}" has been recorded.`);
            }
        });
    });
}

// Save RSVP data to CSV
function saveToCSV(name, response) {
    const csvContent = `Name,Response\n${name},${response}\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'RSVP_responses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
