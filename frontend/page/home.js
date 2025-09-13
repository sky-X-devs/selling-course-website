
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        alert("You must login first! this page is protected and this comes from home.js file");
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
    const courseListContainer = document.getElementById("course-list");
    courseListContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("enroll-button")) {
            event.preventDefault();
            const courseCard = event.target.closest(".course-card");
            if (courseCard) {
                const courseId = courseCard.getAttribute("data-id");
                console.log("Enroll button clicked for course ID:", courseId);
                enroll(courseId);
            }
        }
    });

    const myCourseButton = document.getElementById("my-course");
    console.log("CourseButton is "+myCourseButton);
    myCourseButton.addEventListener("click",()=>{
        window.location.href="http://127.0.0.1:5500/frontend/page/mycourse.html"
    });
    
    const logoutButton = document.getElementById("log-out");
    logoutButton.addEventListener("click",(event)=>{
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
            if(!data){
                alert("Unable to fetch courses at the moment. Please try again later.");
                return;
            }
        const courseList = data.co;
        console.log("Response from server:", courseList);
        
        
        const container = document.getElementById("course-list");
        container.innerHTML = ""; 
        
        courseList.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.className = "course-card";
            courseCard.setAttribute('data-id', course._id);

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
    window.location.href = "http://localhost:5500/frontend/";
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
            token : token
        }
    }).then(res => {
            return res.json();
        })
        .then(data =>{
            const username = data.firstName;
            console.log("Username:", username);
            document.getElementById("profile").innerText = username.charAt(0).toUpperCase();
            document.getElementsByClassName('name')[0].innerText = username;
            console.log("User data:",data);

            
        })
}
function enroll(courseId){
        const token = localStorage.getItem("token");
        console.log("token in enroll function :",token);
        if(!token){
            alert('you must login first');
            window.location.href = 'http://localhost:5500/frontend/page/login';
            return;
        }

        fetch(`http://localhost:3000/course/purchase/${courseId}`,{
            method : "POST",
            headers :{
                token:token,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data =>{
            console.log("Enrollment response:",data);
            if(data.Message.trim() === "Course purchased successfully"){
                alert("Course enrolled successfully");
            }   
        })
        .catch(err => console.log("Error during enrollment:",err));
} 
    
const getmyCourse = ()=>{
        const myCourseButton = document.getElementById('my-course')

        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/user/purchases",{
            method:"GET",
            headers:{
                token:token,
                "Content-Type": "application/json"
            }
        })

}
