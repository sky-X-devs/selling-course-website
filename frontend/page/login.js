document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/user/signin";


    const loginButton = document.querySelector('.login-form button[type="submit"]');
    if( loginButton ) {
        loginButton.addEventListener('click', (event)=>{
            event.preventDefault(); // Prevent default anchor behavior
            const email = loginButton.form.email.value;
            const password = loginButton.form.password.value;
            console.log("Login button clicked, email: ", email, " password: ", password);
            fetch(url,{
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        });
    }

    const registerButton = document.querySelector('.login-form a');
    if( registerButton ) {
        registerButton.addEventListener('click', (event)=>{
            event.preventDefault(); // Prevent default anchor behavior
            console.log("Register button clicked");
            window.location.href = "/register";
        });
    }
});

