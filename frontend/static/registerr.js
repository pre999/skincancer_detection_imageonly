let signupBtn = document.getElementById("signupBtn");
let signupNameInput = document.getElementById("signupName");
let signupEmailInput = document.getElementById("signupEmail");
let signupPasswordInput = document.getElementById("signupPassword");
let loginAnchor = document.getElementById("loginAnchor");
let signupPasswordInput2 = document.getElementById("signupPassword2");

let users = [];

if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
    let user = {
      name: signupNameInput.value,
      email: signupEmailInput.value,
      password: signupPasswordInput.value,
    };
  
    if (
      signupNameInput.value === "" ||
      signupEmailInput.value === "" ||
      signupPasswordInput.value === "" ||
      signupPasswordInput2.value === ""
    ) {
      Swal.fire({
        text: "Please fill in all fields",
      });
      return;
    }

    if(signupPasswordInput.value !== signupPasswordInput2.value ){
        Swal.fire({
            text: "Passwords do not match",
          });
          return;
    }
  
    if (
      isValidEmail(signupEmailInput.value) &&
      isNewEmail(signupEmailInput.value)
    ) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      clearForm();
      /*console.log(users); check garna matra*/
      Swal.fire({
        text: "Sign up successful",
      });
    } else {
      Swal.fire({
        text: "Invalid email or email already in use",
      });
    }
  }
  
  signupBtn.addEventListener("click", function () {
    signUp();
  });
  
  function isValidEmail(email) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  function isNewEmail(email) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return false;
      }
    }
    return true;
  }
  
  function clearForm() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
    signupPasswordInput2.value = ""
  }
  
  loginAnchor.addEventListener("click", function () {
    window.location.href = "login.html";
  });