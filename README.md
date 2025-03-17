

## Features & Screens

### Authentication

- Signup Screen

Users can register with their name, email, and password.

- Login Screen

Users can log in using their email and password.

Token-based authentication is implemented using AsyncStorage to store JWT tokens.

- Task Management

- Home 

Fetch and display tasks from the backend.

Implement pull-to-refresh for refreshing task data.

- Create Task 
 - Users can create a task with a title and description.
- Displays detailed information about the task.
- Users can edit or delete tasks.

### Logout

Includes a logout button that:

Clears the stored JWT token from AsyncStorage.

Navigates the user back to the Login Screen.

Tech Stack & Tools

Frontend Framework: React Native with Expo

### State Management: Redux Toolkit

Navigation: React Navigation (Stack Navigator)

Storage: AsyncStorage for securely storing JWT tokens

UI Components: React Native Paper or NativeBase for enhanced UI

Installation & Setup

Clone the repository:

git clone `https://github.com/Chandugit171/TaskManagement.git`
cd expo-task-management-app

Install dependencies:

yarn install

Start the Expo development server:

expo start

Run the app on your preferred device/emulator:

For Android: Press 'a' in the terminal.

For iOS: Press 'i' in the terminal (only available on macOS with Xcode).

Environment Variables

Create a .env file in the root directory and add the following:

API_URL=`https://authmodule-ifyk.onrender.com/tasks`
