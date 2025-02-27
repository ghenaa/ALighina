// Fetch and load content.html into the #content div
fetch('content.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data;
        setupRSVPButtons();
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });

// Disable right-click (context menu)
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable F12 and other DevTools shortcuts
document.addEventListener('keydown', function (e) {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
    }
});

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const attending = document.querySelector('input[name="attending"]:checked')?.value || 'No Response';

    fetch('https://script.google.com/macros/s/AKfycbzEmGmKbKbaM6hPZdCih0m0Lsp0LRBAx6XhSUWvahleBt4dPv62OlhUIYdNXjL3Pf4iXg/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, attending })
    }).then(response => {
        if (response.ok) {
            alert('Thank you for your response!');
        } else {
            alert('Failed to submit. Please try again.');
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('Something went wrong.');
    });
});


function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var requestData = JSON.parse(e.postData.contents);

    var name = requestData.name || 'No Name';
    var attending = requestData.attending || 'No Response';

    sheet.appendRow([new Date(), name, attending]);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput("Error").setMimeType(ContentService.MimeType.TEXT);
  }
}

