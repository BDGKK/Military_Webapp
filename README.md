# To-Do/Issues/Warnings/etc.
- Important Ones
0. Make logo available to all pages
1. Host admin pages on server
2. Connect the webpages to the server (sample responses only)
3. Use Google Oauth and Encryption before storing registry in db
4. Make a list of URIs of webpage connections to their APIs and send to frontend devs to implement the webpage connections, each consist of:
    - Web page name
    - URI name
    - What data to send to and get from the API
5. Create GET, POST, PUT methods for each API where needed and exchange sample data
6. Add database queries to the APIs where needed
7. Send user login data to backend
    - Use Google Oauth to verify the user email (change database tables accordingly)
8. Send user registration to backend
    - Use bcrypt module to encrypt the password (do not encrypt NIC and other details)
9. Deploy the node.js when the important parts of the project is done

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
- Open your IDE or Code Editor and install the module
    - To install them all, enter in the terminal:
```
npm install cors dotenv express mysql
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
