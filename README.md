# Notes
- Get sessions from pension and loan pages to send correct data to the webpages

# Project Description
A Full Stack Web Application that helps military retirees and leaver transition smoothly into civilian life.
Provides support for pensions, loans and accomodations to ensure a comfortable and stress-free retirement.

# How to setup the application
1. Install and Setup Node.js on your computer (https://nodejs.org/en/download/)
2. Install and Setup Git on your computer (https://git-scm.com/download/)
    - Use the same account as your GitHub repository
3. Install and Setup MySQL on your computer (https://dev.mysql.com/downloads/windows/installer/8.0.html)
    - Note your host, user, password and port number
4. Install the Redis MSI file on your computer (https://github.com/microsoftarchive/redis/releases)
    - Follow this tutorial only until the Redis is installed (https://www.youtube.com/watch?v=8OcOv7wh82Y)
    - Go to the folder where Redis was installed and copy the location
    - Open a new Command Prompt terminal in your Code Editor/IDE
    - Change the directory to the Redis folder using:
    ```
    cd "<redis-folder>"
    ```
    - To start the Redis server, only run:
    ```
    redis-server "<redis-folder>/<redis-config-file>"
    ```
    - The redis-config-file is usually 'redis.windows.conf' or 'redis.conf' in the Redis folder (check it properly)
    - There should be no errors in the CMD terminal and the Redis server must have started
    - Stop the Redis server using (Ctrl + C) [Might need to press it twice]
    - If errors occurs, enter the following and repeat the steps again from Step 4.5:
    ```
    redis-cli
    shutdown
    exit
    ```
5. Create a folder for the project and initialize it as a Nodejs App, enter in the terminal:
```
npm init -y
```
6. Initialize git in the folder and connect to the GitHub repository, enter in the terminal:
```
git init
git remote add origin https://github.com/BDGKK/Military_Webapp.git
git branch -M main
```
- Refer the git cheatsheet (https://training.github.com/downloads/github-git-cheat-sheet/)
7. Make you are signed in to your GitHub account in your browser
8. Pull the code from this repository into the folder, enter in the terminal:
```
git pull
or
git pull origin main
```
9. Install all the modules, enter in the terminal:
```
npm install cors dotenv express mysql bcrypt googleapis nodemailer redis multer express-session
```
10. Create a .env file in the main directory and enter the following:
```
PORT=(an-available-port-number-on-your-device-or-enter-3000)
DB_HOST='(mysql-host)'
DB_USER='(mysql-username)'
DB_PASSWORD='(mysql-host-password)'
DB_PORT=(mysql-host-password)
WEBSITE_EMAIL='(website-email-from-basecamp-docs)'
WEBSITE_PASSWORD='(website-app-password-from-basecamp-docs)'
```
11. Start the Redis server first
    - Revisit instructions from Step 4.5
12. Start the server using 'npm start' and open the link generated by the console
13. Stop the server by hitting 'Ctrl + C' in the terminal
14. For the frontend developers, only change codes in the client-side folder
15. After making a change to any piece, commit it to Git. For example:
    - If you enabled admin-user-page to send the data to the backend
    - Save the changes, enter in the terminal:
    ```
    git add .
    ```
    - Commit the code, enter in the terminal (Commit msg can be "Enabled admin-user-page to send data to backend"):
    ```
    git commit -m (commit msg)
    ```
    - At end of the day, push all your changes to the GitHub repository, enter in the terminal:
    ```
    git push
    ```
    Or
    ```
    git push -u origin main
    ```
16. Make sure only one person is changing a specific file, otherwise a Merge Conflict may occur
    - Send a message in the Group Chat, telling which file you are changing
    - Make sure no one else works on that file
    - Before changing another file, ask in the group chat whether someone is working on that file
    - Always make sure to push your changes to the GitHub repository after your changes in one day
17. Always pull the code from the repository before starting work, enter in the terminal:
```
git pull
```

# API connections
```
const domain = window.location.origin; // Put this is in the JS files to get the domain name
```

- admin-user page:
    - GET (domain)/adminUser/(userId)
        - This API gets the profile, pensions and loans of the user (Tables: user_table, user_rank, regiments, pension, loan, forces)
        - If 'profile' key is not in the retrieved object, the user does not exist
        - Open (domain)/adminUser?userId=(userId) when admin clicks a user

- admin-homepage:
    - GET (domain)/adminHomepage/allUserIds
        - This API gets all the user ids available in the database (Tables: user_table)

- admin-login page:
    - POST (domain)/adminLogin/adminLoginInfo
        - This API takes the email and password of the admin in the request body
		- It makes sure that the email exists in the database (Tables: user_table)
		- It encrypts the password and compares it to the password in the database
		- If the password matches, it will send an OK response
		- If email is not found/password is incorrect, it will send an error message

- download-application page:
    - (No APIs yet)

- forget-password page:
    - (No APIs yet - must wait till frontend has altered the page)

- loan page:
    - POST (domain)/loan/loanInfo
        - This API takes the amount,interestRate,timePeriod,partonName,userId in the request body
		- It inserts the loan data into the Database (Tables: loan)
		- It sends an OK response if data is inserted successfully
    - (Must implement code to get loan documents as well)

- need-help page:
    - (No APIs - does not require an API)

- pension page:
    - POST (domain)/pension/pensionInfo
        - This API takes the totalAmount,renewDate,userId in the request body
		- It inserts the pension data into the Database (Tables: pension)
		- It sends an OK response if data is inserted successfully
    - (Must implement code to get pension documents as well)

- profile page:
    - GET (domain)/profile/(userId)
        - This API gets the data of the user except for the password (Tables: user_table, user_rank, regiments, forces)

- registration page:
    - GET (domain)/registration/columnData
        - This API gets the ranks, regiments, cities and provinces data
        - This data is for the dropdown fields in the registry page

    - POST (domain)/registration/registryData
		- It inserts the data into the Database (Tables: user_table)
		- If there are no issues, it sends an OK response with the userId
		- It checks whether the gmail address already exists in the table
            - If so, it doesn't insert the data and sends an error message
		- It sends a Welcome message to the user's gmail address before inserting the data
		    - If an error occurs in this process, it doesn't insert the data and sends an error message
		- It checks whether the data 'registryData' body is null, if so, it only sends an error message
        - This API gets the 'registryData' in the request body containing:
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

- user-login page:
    - POST (domain)/user-log/userLoginInfo
        - This API gets the email and password of the user in the request body
		- It does the same as the admin login but checks in the user_table

# Group Members
- Gayantha Kavindu  (Project Manager & Security Consultant)
- Udari Sathsarani  (Business Analyst & Frontend Developer)
- Pasan Ranasinghe  (Frontend Developer & Backend Developer)
- Nadeesha Perera   (Database Admin & Frontend Developer)
- Kehan Insitha     (Backend Developer & Security Consultant)
- Dilshani Nawodya  (Frontend Developer & Database Admin)
