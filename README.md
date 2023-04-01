# To-Do/Issues/Warnings/etc.
- Important Ones
2. Work on feedback form sending message through email
3. Work on storing documents in google cloud (Or use Google Drive API)
4. Work on forget-password verification
    - Get email and new password from frontend
    - Make sure that email is in the database
    - Use uuid module to send a verification code to user's email
    - Save verification code in server memory
    - Get verification code entered by user on frontend
    - Check if user VC and server VC matches
    - If yes, update user's password in database to the new password
    - If no, send error message accordingly
5. Use sessions to dynamically render the webpages for the user
6. Plan and implement a tree for the webpage links (eg: user going to user page and admin goin to admin page)
7. Implement securities in website to prevent unauthorized access (eg: Admin can never visit the admin homepage or user page unless they pass the login page)
7. Deploy the node.js when the important parts of the project is done

- Optional
1. Host all common images and make HTML file use '(domain_name)/(image)' where the image was used previously
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
WEBSITE_EMAIL=(website-email-from-basecamp-docs)
WEBSITE_PASSWORD=(website-app-password-from-basecamp-docs)
```
- Make sure mysql is installed in your device
- With everything prepared, launch the server using 'npm start' and open the link generated by the console

# API connections
```
const domain = window.location.origin; // Put this is in the JS files to get the domain name
```

- admin-user page:
GET (domain)/adminUser/(userId)	=> This API gets the profile, pensions and loans of the user (Tables: user_table, user_rank, regiments, pension, loan, forces)
				                => If 'profile' key is not in the retrieved object, the user does not exist
				                => Open (domain)/adminUser?userId=(userId) when admin clicks a user

- admin-homepage:
GET (domain)/adminHomepage/allUserIds	=> This API gets all the user ids available in the database (Tables: user_table)

- admin-login page:
POST (domain)/adminLogin/adminLoginInfo	=> This API takes the email and password of the admin in the request body
					                    => It makes sure that the email exists in the database (Tables: user_table)
					                    => It encrypts the password and compares it to the password in the database
					                    => If the password matches, it will send an OK response
					                    => If email is not found/password is incorrect, it will send an error message

- download-application page:
(No APIs yet)

- forget-password page:
(No APIs yet - must wait till frontend has altered the page)

- loan page:
POST (domain)/loan/loanInfo	=> This API takes the amount,interestRate,timePeriod,partonName,userId in the request body
				            => It inserts the loan data into the Database (Tables: loan)
				            => It sends an OK response if data is inserted successfully
(Must implement code to get loan documents as well)

- need-help page:
(No APIs - does not require an API)

- pension page:
POST (domain)/pension/pensionInfo	=> This API takes the totalAmount,renewDate,userId in the request body
					                => It inserts the pension data into the Database (Tables: pension)
					                => It sends an OK response if data is inserted successfully
(Must implement code to get pension documents as well)

- profile page:
GET (domain)/profile/(userId)   => This API gets the data of the user except for the password (Tables: user_table, user_rank, regiments, forces)

- registration page:
GET (domain)/registration/columnData	=> This API gets the ranks, regiments, cities and provinces data
					                    => This data is for the dropdown fields in the registry page

POST (domain)/registration/registryData	=> This API gets the 'registryData' in the request body containing:
```
{
    firstName,
    lastName,
    gender,
    permanentAddress: {
        streetAddress,
        city,
        province,
        postCode
    },
    temporaryAddress: {
        streetAddress,
        city,
        province,
        postCode
    },
    dateOfBirth,
    mobileNumber,
    landNumber,
    NIC,
    emailAddr,
    password,
    soldierNumber,
    salary,
    recruitedDate,
    yearsOfService,
    retiredDate,
    rankID,
    regimentID
}
```
					                    => It inserts the data into the Database (Tables: user_table)
					                    => If there are no issues, it sends an OK response with the userId
					                    => It checks whether the gmail address already exists in the table
					                    	If so, it doesn't insert the data and sends an error message
					                    => It sends a Welcome message to the user's gmail address before inserting the data
					                    	If an error occurs in this process, it doesn't insert the data and sends an error message
					                    => It checks whether the data 'registryData' body is null, if so, it only sends an error message

- user-login page:
POST (domain)/user-log/userLoginInfo	=> This API gets the email and password of the user in the request body
					                    => It does the same as the admin login but checks in the user_table

# Group Members
- Gayantha Kavindu  (Project Manager & Security Consultant)
- Udari Sathsarani  (Business Analyst & Frontend Developer)
- Pasan Ranasinghe  (Frontend Developer & Backend Developer)
- Nadeesha Perera   (Database Admin & Frontend Developer)
- Kehan Insitha     (Backend Developer & Security Consultant)
- Dilshani Nawodya  (Frontend Developer & Database Admin)
