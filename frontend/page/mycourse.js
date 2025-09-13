document.addEventListener("DOMContentLoaded",()=>{
    const token = localStorage.getItem("token");  

    fetch("http://localhost:3000/user/purchases",{
        method:"GET",
        headers:{
            token:token,
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data =>{  
        if(!data){
            alert("Unable to fetch data")
            return;
        }
        const courseList = data;
        console.log("data comes from Purchase endpoint ",courseList)
        
        const mycourseList = document.querySelector(".mycourse-list");
        console.log("mycourseList: "+mycourseList);
        courseList.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.className = "mycourse-card";
            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p>Price: ₹${course.price}</p>
            `;
            mycourseList.appendChild(courseCard)
            
        });
    })
    .catch(err => console.log("Error from the server:",err));

});