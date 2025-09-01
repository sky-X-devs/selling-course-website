document.addEventListener("DOMContentLoaded",()=>{
    const url = "http://localhost:3000/user/signup";
    const registerButton = document.querySelector('.register-form button[type="submit"]');
    if( registerButton ) {
        console.log("register button found:", registerButton);
        const usernameInput = document.querySelector('.register-form input[name="username"]');
        const emailInput = document.querySelector('.register-form input[name="email"]');
        const passwordInput = document.querySelector('.register-form input[name="password"]');
        registerButton.addEventListener('click',(event)=>{
            event.preventDefault();
            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            if( !username || !email || !password ) {
                alert("Please fill in all fields");
                return;
            }
            console.log("Register button clicked, username: ", username, " email: ", email, " password: ", password);
            fetch(url,{
                method:"post",
                body:JSON.stringify({username,email,password}),
                headrrs:{
                    'Content-Type':'application/json'
                }   
            })
        })
        usernameInput.value= "";
        emailInput.value = "";
        passwordInput.value = "";
    }


})
