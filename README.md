# API SOCIAL NETWORK
![alt text](img/WelcomePicture.jpg)
### TARGET :dart:
The target of this proyect is to recreate the backend of a basic social network in which you can send posts to be seen by all users and interact with the other members's posts.

### INDEX :open_file_folder: 
- [API SOCIAL NETWORK](#api-social-network)
    - [TARGET :dart:](#target-dart)
    - [INDEX :open\_file\_folder:](#index-open_file_folder)
    - [STACK :wrench:](#stack-wrench)
    - [ABOUT API :blue\_book:](#about-api-blue_book)
    - [HOW TO DOWNLOAD AND RUN IT :mag:](#how-to-download-and-run-it-mag)
    - [DATABASE DESIGN :computer:](#database-design-computer)
    - [AUTHOR :pencil2:](#author-pencil2)
    - [POSIBLE IMPROVEMENTS :heavy\_check\_mark:](#posible-improvements-heavy_check_mark)
    - [ACKNOWLEDGEMENTS :raised\_hands:](#acknowledgements-raised_hands)

### STACK :wrench:
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="HTML5" /><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="CSS"/>
<img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="CSS" /><img src="https://camo.githubusercontent.com/0f98e0edc3ae47a19fac8a8679ba0a4f678ed9872c18771cb53f493b21ddaf90/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a61766173636970742d4546443831443f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b" alt="CSS" /><img src="https://camo.githubusercontent.com/7e95531437f8c91626ae46cb69240160dfde5c39c1119c550cd174ba8a19e712/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465" alt="CSS" />


### ABOUT API :blue_book:

This API allows to create and to log in a user to write posts to share with the rest of the people. You will interact in different ways:

- Registering and log in your new user before doing any action over your profile or posts
- Reading any post from any user by searching for their account.
- Checking or update your profile info
- Creation of new posts where you can add a title and a text. This post can receive likes from all others users and you can also give or remove likes to your own or other users posts
- Delete, update or look for your own posts. Also look for other users posts by their profile ID, or by Post ID
- Consulting all existent users info (super_admin)


### HOW TO DOWNLOAD AND RUN IT :mag: 

Here you can find the link to the repository:

https://github.com/MR-ant1/API-Backend-rrss.git

Follow the next steps to prepare the API's environment and make it work correctly:
<details>
<summary>INSTRUCTIONS</summary>

 1. First install Visual Studio Code, Docker, some client (like "Thunder", "Postman" or "Insomnia") and MongoDB Compass. Here I leave the links to download each of them (as client, it can be downloaded Postman or Insomnia, or install thunder from the extensions area in visual studio).
- <a href=https://www.docker.com/products/docker-desktop/ >Docker Desktop </a>
- <a href=https://www.mongodb.com/try/download/compass > MongoDB Compass</a>
- <a href=https://www.postman.com/downloads/ > Postman</a>
- <a href=https://code.visualstudio.com/ > Visual studio Code</a>  


 2. Then we open windows powershell and type the next command to download the MongoDB's image
```hash 
docker pull MongoDB
```
After this command, we type the command down here to create the Mongo container. After the name, we choose our container's title, then, after -p we'll set the ports we are using and finally we type our username and password in both words in command.
``` hash
docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest
```

3. Create a folder to the proyect, open it and execute this command in console:
``` hash
git: init
```
Once we do it, Clone the repository with the command "git clone https://github.com/MR-ant1/Tattoo-API.git

4. Execute in terminal, in order of appaerance, the next commands:
``` bash
npm init --y
```
``` bash
npm install
```
5. Create file ".env". Use sample incluided with references needed to introduce our container data and be able to run server and database. 
``` bash
PORT=4001

MONGO_URI=mongodb+srv://Antonio:RvtT3Dhgv1agfpAQ@apitattoo.e78cn4e.mongodb.net/

JWT_SECRET=SECRETO
```
6. Create a new connection in MongoDB Compass. It's as simple as copy paste the MONGO_URI link which is over this sentence.

7. Execute seeders through command:
``` bash
npm run seed
```
or
``` bash
node ./src/database/seeders/seeder.js 
```
With this, we'll adding our models and registers to our Database, so we can check all data in compass
8. Run the server with command:
``` bash
npm run dev
```
9. Go to the client an import collection file included in HTTP folder
10. Now you have all prepared to try the different functions from the API. Continue reading to find all instructions about it.
</details>


### DATABASE DESIGN :computer:


In first place, a variable "app" in file Server.js was created to be linked with express, to allow the server work properly.
```
const app = express();

app.use(express.json());
```
Then. db.js file was created and here variable dbConnection is defined, which contains all database asociated data to make connection and also seeders work.
```
export const dbconnection = () => {
    return mongoose.connect(
        process.env.MONGO_URI, {}
    )
}
```
With dbConnection defined, next code is added to server.js configuration for server and database connection. Const PORT contains port information imported from .env file app.use create the first component for the next routes that will have each endpoint. 
In dbConnection function, we make the db connection (by calling it and importing from db.js) and also the server run (through app.listen) with a message confirming it.
```
const PORT = process.env.PORT || 4002

app.use("/api", router)

dbconnection()
    .then(() => {
        console.log("Database connected")


        app.listen(PORT, () => {
            console.log(`server is running in port ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error)
    }
    )
```
<details>
<summary>MODELS</summary>

The next step is to create models for Users and Posts, this sets the properties of this entities and relations between them. This will allow interacting with endpoints in order to add, update, get or delete registers.

![alt text](img/UserModel.png)

In previous picture, the final field called "likes" represent the amount of likes that every post received from users. In this one, we introduce a reference to User to make possible relations with the other model.


</details>
<details>
<summary>MIDDLEWARES</summary>

Their function is to control user's access to the different actions in API. Two middlewares were created, "auth" to check if the user has logged in to be able to make any action, and "isSuperAdmin", that checks if the user owns this role who has some especial permissions to some endpoints.
We include this middlewares after the route to give an extra comprobation before the endpoint executes, depending on which users we'll allow to make any action.

    AUTH
![alt text](img/AuthMiddlewarePicture.png)

  Auth variable is defined. This will use req, res and next parameters. Then, const Token is defined by taking authorization headers from user and spliting [""] characters. 
  Finally, we defined decoded const to verify the token obtained and the secret word definded in .env. If both parameters are correct, req.tokenData is created to use it in endpoints and get userId or UserRole and the next function allows to execute next step.

    IS_SUPER_ADMIN
![alt text](img/isSuperAdminMiddlewarePicture.png)

After we defined req.tokenData, this is used in the other middleware to check if the user has a super_admin role in his token and allow him to run "super admin" endpoints.
</details>

<details>
<summary>ENDPOINTS</summary>
<details>
<summary>AUTH ENDPOINTS</summary>

Before anything, to make endpoints work, we create routes. The first part of the route "/api" was located in the server to start from here all endpoints. Then, a router file redirects each type of routes to a group (auth endpoints, users endpoints and posts endpoints).
![alt text](img/RouterPicture.png)
Finally, the route ends in each type of endpoints file(auth.routes, user.routes or post.routes) where the method and the end of route are assigned to complete the whole url. /api/users/:id(example)
![alt text](img/PostRoutesPicture.png)
Thanks to this distribution, we have the route separated in different files and dont concentrate all responsability in an unique file (server) where there are other importants processes for the app work.


- Registration: 
![alt text](img/RegisterControllerPicture.png)
First of all, we require to the new user his personal info through the body. Then, some text validations execute with conditionals to detect a wrong characters input, a password's lenght bigger than allowed or an incorrect email composition, followed by the encryption of the typed password.
We'll go to our client and to make this endpoint work, we are going to type the next route with the POST method (if we imported the endpoint collection, all should be prepared by default):
https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/auth/register. (POST METHOD)
After this we go to body section and introduce in the "x" place, the next parameters to add to our user:

``` bash
{
  "firstName": "xxxxx",
  "lastName": "xxxxxxx",
  "email": "xxxxxxxxx",
  "password": "xxxxxx"
}
```

- Login:
![alt text](img/LoginControllerPicture.png)
In login, email and password are asked in body, then, the same validations take place to check email format and decrypt the password. 
Then, a user find is done using the email given in body, once It's found, password given and both are compared, and depending on this, we receive a confirmation or a negative response. 
If the email and the password match with a user in DB, the token function runs and creates a new token unique for the user that just logged in, assigning a tokendata which contains user's id and role.
This will be used allowing next comprobations of authenticity in the rest of endpoints reserved to registered users.
Try this endpoint exactly like register, but this time introduce the next route:
https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/auth/login  (POST METHOD)

When we get the token number in our clients screen, we copy it and will paste it in all endpoints auth>bearer section to identificate. We recommend the use of this credentials to try the API, it belongs to a super_admin user and has permission to use all endpoints:
 ``` bash
 "email": "superadmin@superadmin.com",
 "password": "12345678"
```
</details>

<details>
<summary>USER ENDPOINTS</summary>
GET ALL USERS (super_admin): GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/users
It brings all user information. It's reserved only for super_admin users (to not compromise personal information from the users like the email. The password appears encrypted)

     
UPDATE PROFILE (super_admin): PUT -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/users
It changes all info you want from your profile. You'll find four fields in the body. You can modify those you want and will be changed in your user in database.
Don't leave any field empty, just type the same value if dont wanna change this field.
``` bash
{
    "firstName": "xxxxxxx",
    "lastName": "xxxxxxxx",
    "email": "xxxxxx@xxx.xxx",
    "password": "xxxxxxx"
}
```
GET PROFILE: GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/users/profile
Through your user ID in token, API will take you to your profile info. You only need to paste the token in auth section.

DELETE USER BY ID: DELETE -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/users/profile/ID
You can delete any user from db introducing its ID in route where ID is located. Only super admins can use this endpoint. Authentification take place through tokenData.


</details>
<details>
<summary>POSTS ENDPOINTS</summary>
GET ALL POSTS: GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts
Get all posts from all users. Function available for all kind of users to read the different posts and interact with all of them.

GET POST BY ID: GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts/ID
Bring a specific post from any user adding its ID in the route (replacing ID)

GET OWN POSTS : GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts/own
Retrieve all posts sent by your user. Only needs de token in auth to work.

GET OTHER USER POSTS : GET -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/users/posts/USERID
Retrieve all posts sent by other user. Insert the user's ID instead of USERID in the route.

CREATE POST : POST -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts
Create a new entry in db where you can send a title and a description to the post. All users will be able to read it. Insert both fields in body

UPDATE POST BY ID : PUT -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts/ID
Change your post's title or description using this endpoint. Only can edit post owned by your user. Introduce post ID in route and write your new values in body. If its not your post, an error advises you.

DELETE POST BY ID : DELETE -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts/ID
Erase an entry which belong to your user and you dont want to have anymore. Introduce its ID in route and if it belongs to your account, bye bye post.

LIKE A POST : PUT -> https://api-backend-rrss-dev-hhmf.1.ie-1.fl0.io/api/posts/ID
Introduce the ID in route of the post you wanna like and instantanely, the post will show your like at the same time your profile will show your liked posts.

</details>
</details>

###  AUTHOR :pencil2:
- Antonio Rodrigo - Full Stack Developer student

- <a href="https://github.com/MR-ant1">GitHub - <a>Linkedin</a>

### POSIBLE IMPROVEMENTS :heavy_check_mark: 

- A follow users function could be included in future versions to improve the experience of the network
- Controllers and validations could have been more abstracted and separated in different files in order to locate each action in different files and make the API more scalable
- Some more possible changes to allow create a better Timeline with the users each one follows, after include follow function.

### ACKNOWLEDGEMENTS :raised_hands:
Big shout out like always to the GeeksHubs team for giving me the change of learning in this wonderful world of developping! 


[def]: #Acknowledgements-

:arrow_up: [TABLE OF CONTENTS](#TABLE_OF_CONTENTS-open_file_folder)