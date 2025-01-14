let loginBtn = document.getElementById("loginBtn");
let signupAnchor = document.getElementById("signupAnchor");

loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    signIn();
});

signupAnchor.addEventListener("click", function () {
    window.location.href = "registerr.html";
});

function signIn() {
    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    if (!loginEmail || !loginPassword) {
        Swal.fire({
            text: "Please fill in all fields",
        });
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: loginEmail,
            password: loginPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("userName", data.user.name);
        window.location.href = "check_lesion.html";
    })
   .catch(error => {
    console.error('Error:', error);
    if (error instanceof TypeError) {
        // Network error or other errors
        Swal.fire({
            text: "Network error. Please try again later",
        });
    } else {
        // Server returned an error status
        Swal.fire({
            text: "Incorrect email or password",
        });
    }
});
}