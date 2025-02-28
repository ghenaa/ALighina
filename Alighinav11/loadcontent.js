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
const googleSheetURL = 'https://script.google.com/macros/s/AKfycbwxi7V3kUNm4R_IwHa1W21MIOZZzxZQW2zArGPQmFjI68EVobzKCeL5195cgFoFgbVuMg/exec';

// Get max guests from the Arabic label
function getMaxGuests() {
    const labelText = document.getElementById('maxGuestsLabel').textContent;
    const maxGuests = labelText.match(/\((\d+)\)/);
    return maxGuests ? parseInt(maxGuests[1], 10) : 1; // default to 1 if not found
}

// Render count-up buttons from 1 to max
function renderGuestCountOptions(maxGuests) {
    const container = document.getElementById('guestCountOptions');
    container.innerHTML = ''; // Clear previous buttons

    for (let i = 1; i <= maxGuests; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('guest-count-btn');
        button.addEventListener('click', () => selectGuestCount(i));
        container.appendChild(button);
    }
}

// Highlight selected count
let selectedGuestCount = 1; // default
function selectGuestCount(count) {
    selectedGuestCount = count;
    document.querySelectorAll('.guest-count-btn').forEach(btn => {
        btn.style.backgroundColor = btn.textContent == count ? '#4CAF50' : '#f1f1f1';
    });
}

// Show or hide guest count options
function toggleGuestCountOptions(show) {
    document.getElementById('guestCountContainer').style.display = show ? 'block' : 'none';
}

// Submit RSVP
function submitRSVP(attendance) {
    const guestName = document.getElementById('guestName').value.trim();
    const guestCount = attendance === 'Yes' ? selectedGuestCount : 0;

    if (!guestName) {
        alert('Please enter your name.');
        return;
    }

    fetch(googleSheetURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: guestName, 
            attending: attendance,
            guestCount: guestCount,
        }),
    }).then(() => {
        alert(`Thank you, ${guestName}, for your response!`);
    }).catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
}

// Button actions
document.getElementById('yesButton').addEventListener('click', () => {
    const maxGuests = getMaxGuests();
    renderGuestCountOptions(maxGuests);
    toggleGuestCountOptions(true);
    submitRSVP('Yes');
});

document.getElementById('noButton').addEventListener('click', () => {
    toggleGuestCountOptions(false);
    submitRSVP('No');
});

