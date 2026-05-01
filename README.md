Hello, I have built a full-stack Team Task Manager application using Spring Boot and React.

In this application, users can register and login using JWT-based authentication. There are two roles: Admin and Member.

The Admin can create projects, add users to the project, create tasks, and assign tasks to members. The Admin also has a dashboard to monitor all tasks and their status.

The Member can log in and view only the tasks assigned to them. They can update the task status such as Pending, In Progress, or Done.

On the backend, I used Spring Boot with REST APIs, JPA for database operations, and Spring Security with JWT for authentication and role-based authorization.

On the frontend, I used React with Axios to call APIs, implemented protected routes, and managed authentication using JWT tokens stored in localStorage.

Overall, this project demonstrates role-based access control, secure authentication, and a clean separation between frontend and backend.
