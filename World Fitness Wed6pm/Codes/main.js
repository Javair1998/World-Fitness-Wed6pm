// 
// Names: Tavaughn Henry, Aljermaine Hutchinson , Nswain Shakespeare and Roxann Jahnson
// ID#: 2305252 , 2205641 , 2006054 , 2306621
// Class Day and Time: Wednesday 6pm - 8pm 

// Registration Page 
// Validate the form to ensure:
// ii.	all fields are filled (HTML validation). 
// iii.	passwords should be at least 8 characters long.
// iv.	visitor must be over 18 years old to register. Calculate using JavaScript.
// v.	trn is unique; must be of length and in the format (000-000-000). **trn is used instead of a username with login.
// vi.	store registration information (ie. first name, last name, date of birth, gender, phone number, email, tax registration number (trn), password, date of registration, cart{}, invoices[]) as a JavaScript object. Each registration record must be appended to localStorage key called RegistrationData using JavaScript (as an array of objects.)
// Include the following buttons: 
// vii.	Register (used to stored registration form data) 
// viii.	Cancel (used to clear data from the registration form)

function register() {
    const form = document.getElementById('Register');
    const dob = new Date(form.dob.value);
    const today = new Date();
    const age = calculateAge(dob, today);

    if (age < 18) {
        alert('You must be over 18 years old to register.');
        return;
    }

    const trn = (form.trn.value).trim();
    const registrationData = getRegistrationData();
    if (!isTrnUnique(trn, registrationData)) {
        alert('TRN must be unique.');
        return;
    }

    const newUser = {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        dob: form.dob.value,
        gender: form.gender.value,
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        trn: form.trn.value.trim(),
        password: form.password.value,
        dateOfRegistration: new Date().toISOString(),
        cart: {},
        invoices: []
    };
    
    registrationData.push(newUser);
    saveRegistrationData(registrationData);

    // Save TRN to localStorage
    localStorage.setItem('trn', trn);

    alert('Registration successful!');
    form.reset();
}

// Add event listener to the registration form
document.getElementById("Register").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    register();
});

// ii.	validate this login data by checking the currently entered trn and password against data associated with the localStorage key called, RegistrationData. 
// iii.	a visitor is given three (3) attempts to enter a correct trn and password. If login is successful, redirect the user to the product catalog. Otherwise, redirect the user to an error/account locked page.
// Include the following:
// iv.	Login button (validate user login information)
// v.	Cancel button (used to clear data from the Login form)
// vi.	Reset Password hyperlink (used to allow the user to change their password that is associated with the localStorage key called, RegistrationData by matching their trn.
// vii.	Display the number of login attempts remaining for the user.

// Login Page 
let attempts = 0;

function login() {
    const form = document.getElementById('Login');
    const trn = form['login-trn'].value.trim();
    const password = form['login-password'].value;
    const registrationData = getRegistrationData();

    const user = registrationData.find(user => user.trn === trn && user.password === password);
    const message = document.getElementById('message'); 
    
    if (user) {
        message.textContent = 'Login successful!';
        message.style.color = "green";
        setTimeout(() => {
            window.location.href = "Home.html"; 
        }, 500);
    } else {
        attempts++;
        if (attempts >= 3) {
            message.textContent = "You have exceeded the maximum attempts. Redirecting...";
            message.style.color = "red";
            setTimeout(() => {
                window.location.href = "Error.html";
            }, 1000); 
        } else {
            message.textContent = `Incorrect Username or Password! You have ${3 - attempts} attempts left.` ;
            message.style.color = "red";
        }
    }
}

// Add event listener to the login form
document.getElementById("login-submit").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    login();
});

function resetPassword() {
    const trn = prompt('Enter your TRN:').trim();
    const registrationData = getRegistrationData();
    const user = registrationData.find(user => user.trn === trn);

    if (user) {
        const newPassword = prompt('Enter your new password (at least 8 characters):');
        if (newPassword.length >= 8) {
            user.password = newPassword;
            saveRegistrationData(registrationData);
            alert('Password reset successful!');
        } else {
            alert('Password must be at least 8 characters long.');
        }
    } else {
        alert('TRN not found.');
    }
}

function calculateAge(dob, today) {
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return age - 1;
    }

    return age;
}

function getRegistrationData() {
    return JSON.parse(localStorage.getItem('RegistrationData')) || [];
}

function isTrnUnique(trn, registrationData) {
    return !registrationData.some(user => user.trn === trn);
}

function saveRegistrationData(registrationData) {
    localStorage.setItem('RegistrationData', JSON.stringify(registrationData));
}

function clearLoginForm() {
    document.getElementById('login-trn').value = ''; // Clear Tax Registration Number
    document.getElementById('login-password').value = ''; // Clear Password
    document.getElementById('message').innerText = ''; // Clear any message
}

function clearRegistrationForm() {
    // Get the registration form by its ID
    const registrationForm = document.getElementById('Register');
    
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('trn').value = '';
    document.getElementById('password').value = '';
}

