Admin-Task-Manager 📝
Project Overview
Admin-Task-Manager is a tool designed to help administrative professionals keep track of their tasks. The application allows users to add tasks with text descriptions or images, helping them avoid forgetting important tasks during their busy workday.

Key Features:

🗂️ Task Management: Users can add tasks with a title, description, and optional image.
📋 Task Organization: Tasks are organized into three sections: an add section, a task list section, and a done section.
🔧 Task Actions:
➕ Add Button: Adds the task to the task list.
✅ Done Button: Moves the task to the done section.
🗑️ Delete Button: Removes the task entirely.
🔄 Undone Button: Moves a task from the done section back to the task list section.
✏️ Edit Button: Allows users to update the text and image of a task in the task list, with a save button to update the task.
ℹ️ About Me Section: Provides information about the project creator.
Tech Stack 🛠️
Frontend
⚛️ React: Used to build the user interface.
📡 Axios: Handles HTTP requests to the backend.
🧪 Testing Libraries:
🧪 @testing-library/react: Used for testing React components.
🧪 @testing-library/jest-dom: Provides custom Jest matchers for testing DOM nodes.
🧪 @testing-library/user-event: Simulates user interactions in tests.
🌐 Cross-Environment: Managed through cross-env to ensure consistency of environment variables across different platforms.
⚙️ React-Scripts: Used for configuration and scripts that create a React app.
Backend
🚀 NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
🗄️ TypeORM: An ORM (Object-Relational Mapping) library used with TypeScript and JavaScript (ES7, ES6, ES5).
🐘 PostgreSQL: The primary database used to store application data.
📦 Multer: Middleware for handling multipart/form-data, used for uploading files.
🔗 RxJS: A library for reactive programming using Observables, which makes it easier to compose asynchronous and callback-based code.
🧪 Jest: A testing framework used for unit tests and end-to-end testing.
🚨 Supertest: A library for testing HTTP requests.
Development Tools 🛠️
🔷 TypeScript: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
💻 ESLint & Prettier: Tools used for maintaining code quality and formatting consistency.
🛠️ Nest CLI: A command-line interface for managing the NestJS project lifecycle.
Database 🐘
PostgreSQL: Used as the database for storing application data, integrated with TypeORM for managing entities, migrations, and queries.
Installation Instructions 🚀
Prerequisites
Before you begin, ensure you have the following software installed on your machine:

🔧 Node.js: JavaScript runtime used to run the backend and frontend servers.
🐘 PostgreSQL: Relational database management system to store application data.
💻 Visual Studio Code: Recommended IDE for editing and running the project.
🛠️ PG Admin: Tool to manage your PostgreSQL databases.
🌐 Google Chrome: Web browser used to run the frontend. Install the React Developer Tools extension for enhanced debugging capabilities.
Backend Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/qmkDuran/Admin-Task-Manager.git
cd Admin-Task-Manager/backend
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables:

Open the .env file located in the backend directory.
Fill in the required database details:
DB_HOST: Your database host (usually localhost).
DB_PORT: The port PostgreSQL is running on (usually 5432).
DB_USER: Your PostgreSQL username.
DB_PASSWORD: Your PostgreSQL password.
DB_NAME: The name of your PostgreSQL database.
Start the Backend Server:

bash
Copy code
npm run start:dev
Frontend Setup
Navigate to the Frontend Directory:

bash
Copy code
cd ../frontend
Install Dependencies:

bash
Copy code
npm install
Start the Frontend Server:

bash
Copy code
npm start
This will open the project in Google Chrome. If not, you can manually open http://localhost:3001 in your browser.
Optional: Install the React Developer Tools extension in Google Chrome for enhanced debugging.

Database Setup
Install PostgreSQL:

Install PostgreSQL on your machine and set up PG Admin 4.
Create a New Database:

Open PG Admin and create a new database. You can name it whatever you like.
Set Up Database Credentials:

Ensure that your database has a username and password set up.
Connect the Backend to the Database:

Make sure the .env file in the backend directory is configured with the correct database details to connect to PostgreSQL.
Usage 💡
Enter Task Section
📝 Task Details: In this section, you can enter a task title, description, and choose a priority level from a dropdown menu. You can also upload an image using the "Choose File" option.
➕ Add Task: Once you’ve entered all the necessary information, click the "Add" button. This will move the task to the "Task List" section.
Task List Section
📋 View Tasks: Tasks that you’ve added will appear here. Each task displays the title, description, priority, and an image if one was uploaded.
✏️ Edit Task: Click the "Edit" button to modify the task. You can change the title, description, priority, and image. After saving, the new text and priority will update immediately, but the new image will only appear after you refresh the page.
✅ Done Task: Click the "Done" button to move the task to the "Done" section.
🗑️ Delete Task: Permanently remove the task by clicking the "Delete" button.
Done Section
📦 View Completed Tasks: Tasks that have been marked as done will appear in this section.
🔄 Undo Task: If you want to move a task back to the "Task List" section, click the "Undo" button.
🗑️ Delete Task: You can also permanently delete a task from this section. Note that tasks in the "Done" section cannot be edited.
About Me Section
ℹ️ Access: The "About Me" button is located at the bottom left corner of the page. It’s a blue button that, when clicked, opens a modal window.
🛠️ Information: The modal provides information about the project creator, including experience and a link to their LinkedIn profile.
❌ Close: To close the modal, click the "X" button in the top right corner.
Task Management and Layout
📜 Scrolling Feature: If you create multiple tasks, the sections (Enter Task, Task List, and Done) do not expand. Instead, each section has a scrolling feature that allows you to scroll through the tasks within the fixed container size.
📏 Consistent Layout: The containers for each section maintain the same width and height, regardless of the number of tasks, keeping the page layout clean and consistent.
Future Features 🔮
These are some planned features and improvements that will be added in future updates:

⚡ Reactive Image Updates: Ensure that when a user edits and saves an image, the new image updates immediately on the page without requiring a refresh.
🔍 Image Preview: Implement a feature where clicking on an image will display a preview, instead of requiring users to right-click and open the image in a new tab.
📊 Priority Sorting: Allow users to sort tasks based on priority levels to better manage their workload.
⏰ Due Dates and Reminders: Add functionality for setting due dates on tasks and receiving reminders as deadlines approach.
🌙 Dark Mode: Provide an option for users to switch to a dark mode theme for a more comfortable viewing experience.
🏷️ Task Categories: Introduce categories or tags that allow users to organize tasks into different groups.
🔐 User Authentication: Implement a secure login system that enables multiple users to manage their own task lists.
Contact Information 📬
If you have any questions or need further assistance, feel free to reach out:

🔗 LinkedIn: Michael Duran (USAA)
📧 Email: duran122410@gmail.com
FAQs ❓
If you encounter any issues or have questions about this project, please reach out to me directly. I’m happy to troubleshoot together!
