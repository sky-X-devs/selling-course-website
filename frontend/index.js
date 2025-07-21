document.addEventListener('DOMContentLoaded', function() {
  const courses = [
    { id: 1, title: 'Web Development Bootcamp', price: 199, image: 'webdev.jpg' },
    { id: 2, title: 'Data Science with Python', price: 249, image: 'datascience.jpg' },
    { id: 3, title: 'Digital Marketing Essentials', price: 149, image: 'digitalmarketing.jpg' }
  ];

  const courseList = document.getElementById('course-list');

  courses.forEach(course => {
    const courseItem = document.createElement('div');
    courseItem.className = 'bg-white shadow-md rounded-lg p-4 m-4';
    courseItem.innerHTML = `
      <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover rounded-t-lg">
      <h2 class="text-xl font-semibold mt-2">${course.title}</h2>
      <p class="text-gray-600">$${course.price}</p>
      <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enroll Now</button>
    `;
    courseList.appendChild(courseItem);
  });
});