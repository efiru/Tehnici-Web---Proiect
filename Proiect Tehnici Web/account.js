document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutSection = document.getElementById("logoutSection");
    const logoutButton = document.getElementById("logoutButton");
    const userWelcome = document.getElementById("userWelcome");
    const signUpButton = document.getElementById("signUpButton");
    const signInButton = document.getElementById("signInButton");
  
    const loginTitle = document.getElementById("loginTitle");
    const registerTitle = document.getElementById("registerTitle");
  
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      showLogoutSection(loggedInUser);
    } else {
      showLoginForm();
    }
  
    if (loggedInUser) {
      signUpButton.style.display = "none";
    } else {
      signUpButton.style.display = "inline";
    }
  
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.username === username && u.password === password);
  
      if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        showLogoutSection(username);
      } else {
        alert("Invalid username or password.");
      }
    });
  
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("regUsername").value;
      const password = document.getElementById("regPassword").value;
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((u) => u.username === username);
  
      if (existingUser) {
        alert("Username already exists. Please choose a different one.");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please log in.");
        registerForm.reset();
        showLoginForm();
      }
    });
  
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      signUpButton.style.display = "inline";
      showLoginForm();
    });
  
    signUpButton.addEventListener("click", () => {
      showRegisterForm();
    });
  
    signInButton.addEventListener("click", () => {
      showLoginForm();
    });
  
    function showLogoutSection(username) {
        userWelcome.textContent = username;
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        logoutSection.style.display = "block";
        signUpButton.style.display = "none";
        signInButton.style.display = "none";
        loginTitle.style.display = "none";
        registerTitle.style.display = "none";
    }
    
    function showLoginForm() {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      logoutSection.style.display = "none";
      signUpButton.style.display = "inline";
      signInButton.style.display = "none";
      loginTitle.style.display = "block";
      registerTitle.style.display = "none";
    }
  
    function showRegisterForm() {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      logoutSection.style.display = "none";
      signUpButton.style.display = "none";
      signInButton.style.display = "inline";
      loginTitle.style.display = "none";
      registerTitle.style.display = "block";
    }
});
