document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/user/signin";
    // userData = {};

    const loginButton = document.querySelector('.login-form button[type="submit"]');
    if (loginButton) {
        const emailInput = document.querySelector('.login-form input[name="username"]');
        const passwordInput = document.querySelector('.login-form input[name="password"]');
        loginButton.addEventListener('click', (event) => {

            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;
            if(email.trim() === "" || password.trim() === ""){
                alert("Please fill in both email and password fields.");
                return;
            }
            console.log("Login button clicked, email: ", email, " password: ", password);
            fetch(url, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(Response=>Response.json())
            .then(data=>{
                console.log("Response from server:",data)
                if(data.Message.trim() === "Login successful"){     
                    localStorage.setItem("token",data.token);
                    requestAnimationFrame(() => {
            window.location.href = "home.html";
        });

                }
                else{
                    alert("login failed:"+data.Message);
                }
            })
            .catch(err=>{console.log("Error from the server:",err)})
            
            emailInput.value = "";
            passwordInput.value = "";
        });
    }

    const registerButton = document.getElementsByClassName('register-button')[0];
    console.log("Register button found:", registerButton);
    
    if (registerButton) {
        registerButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            console.log("Register button clicked");
            window.location.href = "http://127.0.0.1:5500/frontend/page/register.html";
            
        });
    }
    
});

// const getCourses = ()=>{
//     const url = "http://localhost:3000/";
//     console.log("Fetching courses...");
//     userData = {};
//     fetch(url+"course/preview",{
//         method:"GET",
//         headers:{
//             'Content-Type': 'application/json'
//         }   
//     })
//     .then(Response=>Response.json())
//     .then(data=>{
//         console.log("Response from server:",data)
//     })
//     .catch(err=>{console.log("Error from the server:",err)})
// //}