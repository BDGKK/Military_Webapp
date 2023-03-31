# To-Do/Issues/Warnings/etc.
- Important Ones
2. Create API for admin-user page to send all (profile, pension, loan) user details to frontend
    - Use GET method
    - Join user_table, pension, loan, rank, regiment, force, etc. tables to send the combined data of user
    - Send admin to homepage after their login
    - Open URL '(domain)/adminUser?userid={userid}' when admin selects a user
    - Use the '(domain)/adminUser/(userid)' API to get all data of the user
2. Work on feedback form sending message through email
3. Work on storing documents in google cloud (Or use Google Drive API)
4. Connect the webpages to the database (sample responses only)
5. Use sessions to dynamically render the webpages for the user
6. Plan and implement a tree for the webpage links (eg: user going to user page and admin goin to admin page)
7. Implement securities in website to prevent unauthorized access (eg: Admin can never visit the admin homepage or user page unless they pass the login page)
7. Deploy the node.js when the important parts of the project is done

- Optional
1. Host all common images and make HTML file use '(domain_name)/(image)' where the image was used previously
2. Add express.js code to make all webpages have the favicon logo image
3. Optimizing webpages
4. Language Translation in web pages
5. Use socket.io module (websocket) and allow user to interact with admin on chatbot
    - If user enters unavailable questions, chatbot asks user if they want to connect with admin
    - If yes, chatbot backend is removed from websocket connection and replaced with admin
    - Admin gets a notification to interact with user
    - Test this first with 2 users interacting using socket.io and implement in chatbot window later

# Project Description
A Full Stack Web Application that helps military retirees and leaver transition smoothly into civilian life.
Provides support for pensions, loans and accomodations to ensure a comfortable and stress-free retirement.

# How to setup the Node.js App
- Install and Setup Node.js on your computer (https://nodejs.org/en/download/)
- Create a folder and enter 'node init -y' to initialize it as a Node.js App
- Install and Setup Git on your computer (https://git-scm.com/download/)
    - Use the same account as your github repository
- Setup the git folder to use this repository 
- Make you are signed in to your GitHub account in your browser
- Pull the code from this repository into the folder using 'git pull'
- Open your IDE or Code Editor and install the modules
    - To install them all, enter in the terminal:
```
npm install cors dotenv express mysql bcrypt googleapis nodemailer
```

# How to run the server code
- Create a .env file in the Node.js folder and enter the following:
```
PORT=(port_name)
DB_HOST=(mysql-host)
DB_USER=(mysql-username)
DB_PASSWORD=(mysql-host-password)
DB_PORT=(mysql-host-password)
```
- Make sure mysql is installed in your device
- With everything prepared, launch the server using 'npm start' and open the link generated by the console

# Group Members
- Gayantha Kavindu  (Project Manager & Security Consultant)
- Udari Sathsarani  (Business Analyst & Frontend Developer)
- Pasan Ranasinghe  (Frontend Developer & Backend Developer)
- Nadeesha Perera   (Database Admin & Frontend Developer)
- Kehan Insitha     (Backend Developer & Security Consultant)
- Dilshani Nawodya  (Frontend Developer & Database Admin)
