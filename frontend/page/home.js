
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You must login first!");
        window.location.href = "http://localhost:5500/frontend/page/login.html";
        return;
    }
    getUserDetails();
    getCourses();
    const profile = document.getElementById("profile");
    const profileMenu = document.getElementById("profileMenu");

    profile.addEventListener("click",()=>{
        console.log("Profile clicked");
        profile.classList.toggle("active");
    })
    profile.addEventListener("click",(event)=>{
        if(!profile.contains(event.target) && !profileMenu.contains(event.target)){
            profileMenu.classList.remove("active");
        }
    });
    const logoutButton = document.getElementById("log-out");
    logoutButton.addEventListener("click",()=>{
        event.preventDefault();
        logout();
    });
});

const getCourses = () => {
    console.log("Fetching courses...");
    fetch("http://localhost:3000/course/preview", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(data => {
        const courseList = data.co;
        console.log("Response from server:", courseList);
        
        
        const container = document.getElementById("course-list");
        container.innerHTML = ""; 
        
        courseList.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.className = "course-card";

            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p>Price: ₹${course.price}</p>
                <a href="#" class="enroll-button">Enroll Now</a>
            `;
            container.appendChild(courseCard);
            
        });
    })
    .catch(err => console.log("Error from the server:", err)); 
};

function logout() {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5500/frontend/page/login.html";
}

const getUserDetails = ()=>{
    const token = localStorage.getItem("token");
    if(!token){
        alert("You must login first");
        window.location.href = "http://localhost:5500/frontend/page/login.html";
        return;
    }
    fetch("http://localhost:3000/user/me",{
        method :"GET",
        headers :{
            contentType : "application/json",
        }
    }).then(res => {
            return res.json();
        })
        .then(data =>{
            const username = data.username;
            document.getElementById("username").innerText = username;
            document.getElementById("name").innerText = username.charAt(0).toUpperCase();
            console.log("User data:",data);
        })
    }