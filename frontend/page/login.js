document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/user/signin";


    const loginButton = document.querySelector('.login-form button[type="submit"]');
    if( loginButton ) {
        const emailInput = document.querySelector('.login-form input[name="username"]');
        const passwordInput = document.querySelector('.login-form input[name="password"]');
        loginButton.addEventListener('click', (event)=>{

            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;
            console.log("Login button clicked, email: ", email, " password: ", password);
            fetch(url,{
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            emailInput.value = "";
            passwordInput.value = "";
        });
    }

    const registerButton = document.getElementsByClassName('register-button')[0];
    console.log("Register button found:", registerButton);  
    if( registerButton ) {
        registerButton.addEventListener('click', (event)=>{
            event.preventDefault(); // Prevent default anchor behavior
            console.log("Register button clicked");
            window.location.href = "http://127.0.0.1:5500/frontend/page/register.html";
        });
    }
});

