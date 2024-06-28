document.addEventListener('DOMContentLoaded', function() {
    const storedData = localStorage.getItem('contactData');
    if (storedData) {
        showThankYouMessage(JSON.parse(storedData));
    } else {
        document.getElementById('formContainer').style.display = 'block';
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const teamName = document.getElementById('teamName').value;

    //Form Validations
    if (!name.match(/^[a-zA-Z\s]+$/) || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || !phone.match(/^\d+$/) || !teamName) {
        document.getElementById('formError').innerText = 'Please check your data';
        document.getElementById('formError').classList.remove('d-none');
    } else {
        document.getElementById('formError').innerText = '';
        document.getElementById('formError').classList.add('d-none');
        const formData = {
            name,
            email,
            phone,
            teamName,
            notifications: document.getElementById('notifications').checked,
            likeT20: document.getElementById('likeT20').checked
        };
        localStorage.setItem('contactData', JSON.stringify(formData));
        showThankYouMessage(formData);
    }
});
//To show the data filled by the user and Thank You message
function showThankYouMessage(data) {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';
    thankYouMessage.innerHTML = `
        <h2>Thank you for your submission</h2>
        <h3>Your data is stored successfully in local storage</h3>
        <br>
        <h2>Here is Your data</h2>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Team Name: ${data.teamName}</p>
        <p>Notifications: ${data.notifications ? 'Yes' : 'No'}</p>
        <p>Like T20: ${data.likeT20 ? 'Yes' : 'No'}</p>
        <button id="deleteBtn" class="btn btn-danger">Delete Data</button>
    `;
    document.getElementById('deleteBtn').addEventListener('click', function() {
        localStorage.removeItem('contactData');
        thankYouMessage.style.display = 'none';
        formContainer.style.display = 'block';
        document.getElementById('contactForm').reset();
        showDeletionMessage();
    });
}
//Function to show the message for deleted data
function showDeletionMessage() {
    const deletionMessage = document.getElementById('deletionMessage');
    deletionMessage.style.display = 'block';
    setTimeout(() => {
        deletionMessage.style.display = 'none';
    }, 3000);
}

document.getElementById('teamName').addEventListener('change', function() {
    const additionalFields = document.getElementById('additionalFields');
    if (this.value) {
        additionalFields.style.display = 'block';
    } else {
        additionalFields.style.display = 'none';
    }
});
//To reset the form data
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('contactForm').reset();
    document.getElementById('formError').innerText = '';
    document.getElementById('formError').classList.add('d-none');
    document.getElementById('additionalFields').style.display = 'none';
});