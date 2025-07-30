# 📚 Course Selling Web Application 🚀

This project is a full-stack web application designed to facilitate the selling and purchasing of online courses. It provides a platform for administrators to create and manage courses, and for users to browse and enroll in them. The application features user authentication, course browsing, and a purchase system.

## 🌟 Key Features

- **User Authentication:** Secure signup and sign-in functionality for users using JWT.
- **Admin Authentication:** Secure signup and sign-in functionality for admins using JWT.
- **Course Management:** Admins can create, update, and manage courses.
- **Course Browsing:** Users can browse available courses.
- **Course Purchase:** Users can purchase courses.
- **Secure Password Handling:** Uses bcrypt for password hashing.
- **Data Validation:** Employs Zod for robust data validation.
- **MongoDB Integration:** Utilizes MongoDB for data storage.

## 🛠️ Tech Stack

- **Frontend:**
  - JavaScript (ES6+)
  - HTML
  - CSS
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB
  - Mongoose
- **Authentication:**
  - JSON Web Tokens (JWT)
  - bcrypt
- **Validation:**
  - Zod
- **Environment Management:**
  - dotenv
- **Development Tools:**
  - nodemon

## 📦 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB installed and running

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    # No dependencies listed in the provided code, but if you have any, install them here
    # npm install
    cd ..
    ```

4.  **Configure environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables:

    ```
    MONGOOSE_URL=<your_mongodb_connection_string>
    JWT_USER_SECRET=<your_user_jwt_secret>
    JWT_ADMIN_SECRET=<your_admin_jwt_secret>
    ```

    Replace `<your_mongodb_connection_string>`, `<your_user_jwt_secret>`, and `<your_admin_jwt_secret>` with your actual MongoDB connection string and JWT secrets.

### Running Locally

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run start
    ```

    This will start the backend server on port 3000 (as defined in `backend/index.js`).

2.  **Start the frontend:**
    Since the frontend code provided directly manipulates the DOM, you can simply open the `index.html` file (if you have one) in your browser. If you have a more complex frontend setup (e.g., using a framework like React), follow the specific instructions for that framework.

## 📂 Project Structure

```
├── backend/
│   ├── index.js               # Main backend entry point
│   ├── package.json           # Backend dependencies and scripts
│   ├── middleware/
│   │   ├── adminMiddleware.js   # Admin authentication middleware
│   │   └── userMiddleware.js    # User authentication middleware
│   ├── db/
│   │   ├── purchaseModel.js   # Purchase model
│   │   ├── userModel.js       # User model
│   │   ├── adminModel.js      # Admin model
│   │   └── courseModel.js     # Course model
│   ├── routes/
│   │   ├── course.js          # Course routes
│   │   ├── user.js            # User routes
│   │   └── admin.js           # Admin routes
│   └── .env                   # Environment variables
├── frontend/
│   └── index.js               # Main frontend JavaScript file
├── README.md                # This file
```

## 📸 Screenshots

(Add screenshots of the application here to showcase its features and UI)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [your_email@example.com](mailto:your_email@example.com).

## 💖 Thanks

Thank you for checking out this project! Your interest and contributions are greatly appreciated.

This README is written by [readme.ai](https://readme-generator-phi.vercel.app/) - Generate yours today!
