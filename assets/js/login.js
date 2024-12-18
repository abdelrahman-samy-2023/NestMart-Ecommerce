document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('https://675864a560576a194d10537e.mockapi.io/users?email=' + email + '&password=' + password)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            localStorage.setItem('token', data[0].token);
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Password Toggle Icons (Keep this only for login)
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

// Use the correct ID for the password input field
const passwordInput = document.getElementById('loginPassword');

togglePassword.addEventListener('click', function () {
    // Toggle password visibility
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    // Fade out the current icon
    eyeIcon.classList.add('fade-out');
    
    // Wait for the fade-out animation to complete
    setTimeout(() => {
        // Change the icon
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
        
        // Fade in the new icon
        eyeIcon.classList.remove('fade-out');
        eyeIcon.classList.add('fade-in');

        // Wait for the fade-in animation to complete before resetting classes
        setTimeout(() => {
            eyeIcon.classList.remove('fade-in'); // Reset fade-in class
        }, 300); // Match this duration with the CSS animation duration
    }, 300); // Match this duration with the CSS animation duration
});

// CSS for fade-in and fade-out (Keep this only for login)
const style = document.createElement('style');
style.innerHTML = `
    .fade-out {
        animation: fadeOut 0.3s forwards;
    }
    .fade-in {
        animation: fadeIn 0.3s forwards;
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);