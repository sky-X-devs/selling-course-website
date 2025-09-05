
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You must login first!");
        window.location.href = "http://localhost:5500/frontend/page/login.html";
        return;
    }
    getCourses();
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
