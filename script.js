const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const contact = document.getElementById("contact");
  const password = document.getElementById("password");
  const confirmpassword = document.getElementById("confirmpassword");
  const city = document.getElementById("city");
  const country = document.getElementById("country");
  const successMessage = document.getElementById("successMessage");

  let isValid = true;
  let firstinvalidfield = null;

  function validateFiled(field, regex, errorMessage) {
    const errorElement = field.nextElementSibling;
    if (!regex.test(field.value.trim())) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      if (!firstinvalidfield) {
        firstinvalidfield = field;
      }
      isValid = false;
    } else {
      errorElement.style.display = "none";
    }
  }

  // Validation rules
  validateFiled(name, /^[a-zA-Z0-9\s]+$/, "Name must contain only letters.");
  validateFiled(email, /^\S+@\S+\.\S+$/, "Enter a valid email address.");
  validateFiled(contact, /^\d{10}$/, "Contact must be a 10-digit number.");
  validateFiled(city, /^[a-zA-Z\s]+$/, "City must contain only letters.");
  validateFiled(country, /^[a-zA-Z\s]+$/, "Country must contain only letters.");
  validateFiled(
    password,
    /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
    "Password must have 8+ chars, a number, a special char, and an uppercase."
  );

  // Password confirmation validation
  if (confirmpassword.value.trim() !== password.value.trim()) {
    confirmpassword.nextElementSibling.textContent = "Passwords must match.";
    confirmpassword.nextElementSibling.style.display = "block";
    if (!firstinvalidfield) {
      firstinvalidfield = confirmpassword;
    }
    isValid = false;
  } else {
    confirmpassword.nextElementSibling.style.display = "none";
  }

  if (isValid) {
    const formData = {
      Name: name.value.trim(),
      Email: email.value.trim(),
      Contact: contact.value.trim(),
      Password: password.value.trim(),
      City: city.value.trim(),
      Country: country.value.trim(),
    };
    console.log("Form Data Submitted", formData);

    // Show custom alert box
    const customAlert = document.getElementById("customAlert");
    customAlert.innerHTML = "Form submitted successfully!";
    customAlert.style.display = "block";

    form.reset();
  } else {
    successMessage.style.display = "none";
  }
});

// Toggle button for password visibility
function togglebutton(togglebuttonid, passwordFieldid) {
  const togglebutton = document.getElementById(togglebuttonid);
  const passwordField = document.getElementById(passwordFieldid);
  togglebutton.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      togglebutton.textContent = "🙈";
    } else {
      passwordField.type = "password";
      togglebutton.textContent = "👁️";
    }
  });
}

// Attach toggle button functionality to both password and confirm password fields
togglebutton("togglePassword", "password");
togglebutton("togglePasswordconfirm", "confirmpassword");
