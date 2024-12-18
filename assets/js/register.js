document.getElementById('registerButton').addEventListener('click', function() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    fetch('https://675864a560576a194d10537e.mockapi.io/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            city,
            country
        })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'home.html';
    })
    .catch(error => console.error('Error:', error));
});