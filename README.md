# DegreeSync

## Project Overview
DegreeSync is a web application designed for students to calculate their semester and cumulative GPA. The application allows users to create an account, log in using their email and password, input their grades and course credit hours, and receive an accurate GPA calculation based on common grading standards.

## Key Features:
Email Login: Users can create an account using their email and password to securely access the GPA calculator.
Semester GPA Calculation: Users can input their grades and credit hours for a given semester and receive an accurate GPA.
Cumulative GPA Calculation: The system allows users to calculate their cumulative GPA by considering multiple semesters' GPAs and credit hours.
Error Handling: The application provides feedback for invalid inputs, ensuring users are alerted when their data entries are incorrect.

## Setup Instructions
### Prerequisites
Before setting up the project, make sure you have the following installed:

Node.js (v14.x or higher)
MongoDB (for storing user data, grades, and GPA calculations)
Git (for version control)

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/swetha-balaji/DegreeSync.git
    ```

2. **Install dependencies**:
    Navigate to the project directory and install the required packages by running:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Ensure that you set up the following environment variables in a `.env` file:
    - `MONGO_URI` - The connection string for your MongoDB instance.

4. **Start the application**:
    You can start the server using the following command:
    ```bash
    npm start
    ```
    The application will be running at `http://localhost:3000`.

5. **View in Browser**:
    Open your browser and go to `http://localhost:3000` to interact with the GPA calculator.

## Usage Details

### Authentication:
- Users can log in with their email and password.
- Passwords are securely stored using hashing (bcrypt).
- Authenticated users can access GPA calculation features.

### GPA Calculation:
- Input the credit hours and the grade (A, B, C, etc.) for each course.
- The application multiplies the credit hours by the grade’s value (A = 4, B = 3, etc.) to compute quality points.
- The semester GPA is calculated by dividing the total quality points by the total credit hours.

### Routes:
- `/` - Home/Landing page where users can Login.
- `/signup` - Signup page where users can sign up for an account.
- `/dashboard` - A protected route accessible only to authenticated users, displaying grade data.
   
## Team Progress
Sprint 1: Requirements Gathering and Core Algorithm Development
In this sprint, the team focused on gathering the requirements and developing the core algorithm for GPA calculation. The main focus was:

Researching how GPAs are typically calculated.
Implementing the semester GPA calculation algorithm.
Starting the user login and authentication system using email and password.
The initial GPA calculation engine has been implemented and tested with sample data.
Getting the database setup for storing users.
