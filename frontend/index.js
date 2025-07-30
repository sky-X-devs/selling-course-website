document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (event)=>{
            event.preventDefault(); // Prevent default anchor behavior
            window.location.href = '/project/week-8 Course Selling WebApp/frontend/page/login.html'; // Redirect to login page
            console.log("Login button clicked, redirecting to login page.");
        });
    }
});

function fetchData() {
  console.log("Fetching courses...");

  fetch("http://localhost:3000/course/preview")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch courses. Status: " + res.status);
      }
      return res.json();
    })
    .then(response => {
      // Handle both: array or { data: array }
      const courses = Array.isArray(response) ? response : response.data;

      if (!Array.isArray(courses)) {
        throw new Error("Invalid response format: expected an array.");
      }

      const courseList = document.querySelector('.courses-grid');
      courseList.innerHTML = ''; // Clear previous content

      courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.setAttribute('class', 'course-card');
        courseItem.innerHTML = `
          <h4 class="course-title">${course.title}</h4>
          <p class="course-description">${course.description}</p>
          <p class="course-price">₹${course.price}</p>
          <a href="#" class="course-link">Enroll Now</a>
        `;
        courseList.appendChild(courseItem);
      });
    })
    .catch(error => {
      console.error("Error fetching courses:", error);
      const courseList = document.querySelector('.courses-grid');
      courseList.innerHTML = `<p style="color: red;">Unable to load courses. Try again later.</p>`;
    });
}
