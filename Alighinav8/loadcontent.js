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

document.getElementById('yesButton').addEventListener('click', () => submitResponse('Yes'));
document.getElementById('noButton').addEventListener('click', () => submitResponse('No'));

function submitResponse(attending) {
    const name = document.getElementById('guestName').value;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    fetch('https://script.google.com/macros/s/AKfycbyunFnNUH4tFiWWi5WnD8s31TOctqh5OVV5zhNR4WAuQn3BruJDoaAlQKqt0rlmsYf7Gg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
}




