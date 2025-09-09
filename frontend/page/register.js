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
                body:JSON.stringify({firstName:username,
                    lastName:"jpj",
                    email:email,
                    password:password}),
                headers:{
                    'Content-Type':'application/json'
                }   
            })
            .then(Response=>Response.json())
            .then(data=>{console.log("Response from server:",data)})
            .catch(err=>{console.error("errror form server ",err)})

            window.location.href="http://127.0.0.1:5500/frontend";
        })
        usernameInput.value= "";
        emailInput.value = "";
        passwordInput.value = "";
    }
})
