# Notes/Issues/Warnings/etc. 
- Create a server script file to insert data into the forces, regiments ranks table
    - Insert the data into each file in order to avoid foreign key errors
    - Use error handling to identify if data already exists in the table - using PK constraint
    - If data exists, don't insert - else insert

- Put regiments, ranks and forces in one file, create a GET method API for registration page to use it
- Use the regiments, ranks and forces from registration page to choose the correct rank and regiment in db user_table

- Add the image for the homepage into the home-page folder
- Put all web pages in their own directory with suitable names in the client-side folder
- Host the web pages - create their own files in server-side folder and create a router for each page

# Project Description
A Full Stack Web Application that helps military retirees and leaver transition smoothly into civilian life.
Provides support for pensions, loans and accomodations to ensure a comfortable and stress-free retirement.

# How to setup the Node.js App
- Install and Setup Node.js on your computer (https://nodejs.org/en/download/)
- Create a folder and enter 'node init -y' to initialize it as a Node.js App
- Install and Setup Git on your computer (https://git-scm.com/download/)
- Setup the git folder to use this repository
- Pull the code from this repository into the folder using 'git pull'
- Open your IDE or Code Editor and install these modules
    - cors
    - dotenv
    - express
    - mysql
- To install them all, enter 'npm install cors dotenv express mysql' in the CLI of the IDE

# How to run the server code
- Create a .env file in the Node.js folder and enter the following:
    - PORT=<port_name>
    - DB_HOST=<mysql-host>
    - DB_USER=<mysql-username>
    - DB_PASSWORD=<mysql-host-password>
    - DB_PORT=<mysql-host-password>
- Make sure mysql is installed in your device
- With everything prepared, launch the server using 'npm start' and open the link generated by the console

# Group Members
- Gayantha Kavindu  (Project Manager)
- Udari Sathsarani  (Business Analyst)
- Pasan Ranasinghe  (Frontend Developer)
- Nadeesha Perera   (Database Analyst)
- Kehan Insitha     (Backend Developer)
- Dilshani Nawodya  (Frontend Developer)
