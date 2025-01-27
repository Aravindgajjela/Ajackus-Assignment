# User Management System

This is a simple **User Management System** built using **React**. It allows users to view a list of users, add new users, edit existing users, and delete users. The project fetches and interacts with data from the **JSONPlaceholder API**.

## Features:
- **View**: Display a list of users fetched from the `/users` endpoint.
- **Add**: Allows adding a new user by sending a POST request to the `/users` endpoint (though the data won't actually persist in the JSONPlaceholder API).
- **Edit**: Allows editing an existing user by sending a PUT request to the `/users` endpoint.
- **Delete**: Allows deleting users by sending a DELETE request to the `/users` endpoint.
- **Error Handling**: Handles scenarios where the API request fails and shows error messages to the user.

## Project Setup Instructions

To set up the project on your local machine, follow these steps:

### 1. Clone the repository:
```bash
git clone <your-repository-url>
cd <project-directory>

2. Install dependencies:
    If you don't have Node.js installed, download and install it from here.

      After that, install the project dependencies using npm:
 npm install

3. Run the project:
Once the dependencies are installed, start the development server by running:

npm start


4.Directory Structure
Here is an overview of the project directory structure:


my-app/
├── src/
│   ├── components/
│   │   ├── App.js           # Main component that renders the UserList component.
│   │   ├── ErrorBoundary.js  # Catches JavaScript errors in child components and displays a fallback UI.
│   │   ├── UserForm.js       # Form component to add or edit a user.
│   │   └── UserList.js       # Displays the list of users, handles adding, editing, and deleting users.
│   ├── index.js              # Entry point for the React app.
│   ├── index.css             # Global CSS file.
├── package.json              # Contains project dependencies and scripts.
└── README.md                 # Project overview and setup instructions.

5.Explanation of Components:
  App.js: The main component that renders the entire app and imports other components like UserList.
      ErrorBoundary.js: A higher-order component to catch JavaScript errors and display a fallback UI.
            UserForm.js: A form to add or edit a user's information, including name, email, and department.
                UserList.js: Displays the list of users, handles adding, editing, and deleting users, and also includes pagination.

6.Challenges Faced  
Handling API Requests: Managing asynchronous requests and ensuring the UI updates properly after adding, editing, or deleting users.
Pagination: Implementing pagination for the user list and ensuring smooth transitions between pages.
State Management: Handling state for multiple components (form, user list, etc.) and ensuring consistency.
Error Handling: Managing different error scenarios and displaying appropriate messages to the user.

6.Potential Improvements
Persist Data: Integrate with a real backend API or database to persist changes made to users.
Form Validation: Improve client-side validation for the UserForm to provide more detailed feedback for invalid input.
Styling: Enhance the styling using CSS frameworks like Bootstrap or Material-UI for a better user interface.
Unit Testing: Add unit tests using libraries like Jest and React Testing Library for better test coverage.
Optimized Pagination: Implement infinite scrolling to load more users as the user scrolls, rather than using pagination.