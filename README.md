# API SOCIAL NETWORK

### OBJETIVO :dart:
This proyect has as objetive to recreate the backend of a basic social network in which you can send post to be seen by all users and interact with the other members's posts.

### INDICE :open_file_folder: 
- [API SOCIAL NETWORK](#api-social-network)
    - [OBJETIVO :dart:](#objetivo-dart)
    - [INDICE :open\_file\_folder:](#indice-open_file_folder)
    - [STACK :wrench:](#stack-wrench)
    - [ABOUT API :blue\_book:](#about-api-blue_book)
    - [HOW TO DOWNLOAD AND RUN IT :mag:](#how-to-download-and-run-it-mag)
    - [DISEÑO DE LA BASE DE DATOS :computer:](#diseño-de-la-base-de-datos-computer)
    - [AUTOR :pencil2:](#autor-pencil2)
    - [POSIBLES MEJORAS :heavy\_check\_mark:](#posibles-mejoras-heavy_check_mark)
    - [AGRADECIMIENTOS :raised\_hands:](#agradecimientos-raised_hands)

### STACK :wrench:
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="HTML5" /><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="CSS"/>
<img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="CSS" /><img src="https://camo.githubusercontent.com/0f98e0edc3ae47a19fac8a8679ba0a4f678ed9872c18771cb53f493b21ddaf90/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a61766173636970742d4546443831443f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b" alt="CSS" /><img src="https://camo.githubusercontent.com/7e95531437f8c91626ae46cb69240160dfde5c39c1119c550cd174ba8a19e712/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d2532333465613934622e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465" alt="CSS" />


### ABOUT API :blue_book:

This API allows to create and login a user to write posts to share with the rest of people. You will interact in different ways:

- Registering and login your new user before doing any action over your profile or posts
- Reading any post from any user by searching for his account.
- Checking or update your profile info
- Creation of new posts where you can add a title and a text. This post can receive likes from all others users and you can also give or remove likes to your own or other users posts
- Delete, update or look for your own posts. Also look for other users posts by his profile ID, or by Post ID
- Consulting all existent users info (super_admin)


### HOW TO DOWNLOAD AND RUN IT :mag: 

Here you can find the link to the repository:

https://github.com/MR-ant1/API-Backend-rrss.git

Follow the next steps to prepare the API's environment and make it work correctly:
<details>
<summary>INSTRUCTIONS</summary>

 1. First install Visual Studio Code, docker, some client (like "Thunder", "Postman" or "Insomnia") and MongoDB Compass. Here I leave the links to download each one. (as client, can be downloaded Postman or Insomnia, or install thunder from the extensions area in visual studio)
- <a href=https://www.docker.com/products/docker-desktop/ >Docker Desktop </a>
- <a href=https://www.mongodb.com/try/download/compass > MongoDB Compass</a>
- <a href=https://www.postman.com/downloads/ > Postman</a>
- <a href=https://code.visualstudio.com/ > Visual studio Code</a>  


 2. Then we open windows powershell and type the next command to download the MongoDB's image
```hash 
docker pull MongoDB
```
seguido de este otro comando para establecer un contenedor con esa imagen. Detras de name, daremos el nombre que queramos al contenedor, despues de -p, estableceremos los puertos que usaremos (siendo el de la derecha el de nuestro equipo) y en ROOT y 1234, introduciremos nuestro usuario y contraseña para este contenedor.
After this command, we type the down here command to create the Mongo container. After name, we choose our container's title, then, after -p we'll set the ports we are using and finally we type our username and password in both words in command.
``` hash
docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest
```

3. Create a folder to the proyect, open it and execute this command in console:
``` hash
git: init
```
Una vez lo hayamos hecho, Clonaremos el repositorio con el comando "git clone https://github.com/MR-ant1/Tattoo-API.git"
Once we do it, Clone the repository with command "git clone https://github.com/MR-ant1/Tattoo-API.git

4. Execute in terminal, in order of appaerance, next commands:
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
6. Create a new connection in MongoDB Compass. is as simple as copy paste the MONGO_URI link which is over this sentence.

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


### DISEÑO DE LA BASE DE DATOS :computer:


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
With dbConnection defined, next code is added to server.js configuration for server and databse connection. Const PORT contains port information imported from .env file. app.use create the first component for the next routes each endpoints will have. 
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

The next step is to create models for Users and Posts, what set the properties of this entities and relations between them. This will allow interacting with endpoints in order to add, update, get or delete registers.
![alt text](img/UserModelPic.png)

Las dos últimas que se aprecian, son de los dos tipos de relación utilizados en este proyecto, onetoMany y ManyToOne, al ser role_id una foreign_key de roles, una tabla mas fuerte que Users.
En caso contrario, tenemos appointments al ser Users mas fuerte y haber una columna "user_id" en appointments

![alt text](img/UserModel.png)

In previous picture, the final field called "likes" represent the amount of likes that every post received from users. In this one, we introduce a reference to User to make possible relations with the other model.


</details>
<details>
<summary>MIDDLEWARES</summary>

Their function is to control user's access to the different actions in API. Two middlewares were created, "auth" to check if user has logged in to be able to make any action, and "isSuperAdmin", that checks if user owns this role who has some especial permissions to some endpoints.
We include this middlewares after the route to give an extra comprobation before the endpoint executes, depending on which users we'll allow to make any action.

    AUTH
![alt text](img/AuthMiddlewarePicture.png)
  Auth variable is defined. This will use req, res and next parameters. Then, const Token is defined by taking authorization headers from user and spliting [] characters. 
  Finally, we defined decoded const to verify the token obtained and the secret word definded in .env. If both parameters are correct, req.tokenData is created to use it in endpoints and get userId or UserRole and next function allows to execute next step.

    IS_SUPER_ADMIN
![alt text](img/isSuperAdminMiddlewarePicture.png)
Comprueba si el rolename asociado al user_id del token, es super_admin y da acceso al endpoint limitado a dicho rol.
After we defined req.tokenData, this is used in the other middleware to check if user has a super_admin role in his token and allow him to run "super admin" endpoints.
</details>

<details>
<summary>ENDPOINTS</summary>
<details>
<summary>AUTH ENDPOINTS</summary>

- Registration: 
![alt text](img/RegisterControllerPicture.png)
First of all, we require to new user his personal info through the body.


Una vez introducidos, se llevan acabo validaciones sobre el formato y el tamaño de los datos y se trata la contraseña para encriptarla mediante bcrypt. Este endpoint sustituye en si mismo a la función de crear usuarios que a priori se pensaba incluir en "userControler"
Para llevar a cabo este endpoint, iremos anuestro client y mediante el metodo POST, añadiremos la ruta asociada al registro:
localhost:PORT/api/auth/register.
Donde localhost se usa al ejecutarse en local, y PORT representa el puerto introducido en el archivo .env que ocupa la base de datos.
Si importamos la colección que adjunto en la carpeta HTTP, deberían venir todo preparado y solo hará falta cambiar el puerto de ser distinto al que ahi vendrá.
Tras esto, iremos a la pestaña "Body", en introduciremos en el cuadro inferior de texto las 4 columnas a crear del usuario con sus valores donde aparecen las "x" tal y como vienen escritas aqui respetando comillas:
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
 Con login volvemos a saltar la primera parte. Se aprecia arriba de la imagen como se define la función usando request y response, después se piden tanto email como contraseña por body y, tras dos validaciones, se pasa a la parte que se ilustra.

 Se hace una búsqueda de un solo usuario que tenga ese mismo email (no puede haber dos usuarios con un mismo email), y se obtienen sus datos mediante select. 
 Tras esto, se hace una comparación mediante bcrypt con la contraseña almacenada (este se encarga de desencriptarla) y por último, se lleva a cabo la creación de un token temporal para ese usuario con jwt, importado arriba del documento. Le indicamos aqui que contendrá tanto el user_id como el rol del usuario loggeado.Y en el archivo aparte "types>index",
 ```
export interface TokenData {
    userId: number;
    roleName: string;
};

declare global {
    // Express
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}
 ```
damos formato a la función de token creada en el login.
Este token será el que se use a partir de ahora para autentificar a cualquier usuario como perteneciente a la base de datos.
Para hacer funcionar esta endpoint, debemos de nuevo acudir al body de nuestro client, y con mediante el metodo post y la ruta:
- localhost:PORT/api/auth/login
 client, y consultar algun correo de algún usuario randomizado, aunque se recomienda usar el el correo con derechos de super_admin junto a la contraseña indicada(todos los usuarios randomizados y admin, tienen la misma contraseña por defecto)
 ``` bash
 "email": "superadmin@superadmin.com",
 "password": "useruser"
```
COPIAREMOS EL NUMERO DE TOKEN QUE LA CONSOLA DEL CLIENT DEVUELVA PARA, A PARTIR DE AHORA, UTILIZARLO EN NUESTRO CLIENT INTRODUCIENDOLO EN EL APARTADO AUTH>BEARER
</details>
<details>
<summary>ROLES ENDPOINTS</summary>
    GET ROLES (super_admin): GET -> localhost:PORT/api/roles
Obtendremos como super admins la posibilidad de consultar todos los roles disponibles para los usuarios. Por defecto: user, admin y super_admin

    CREATE ROLES (super_admin): POST -> localhost:PORT/api/roles
    ![alt text](img/CreateRoles.png)
Podremos crear nuevos roles para la BD(base de datos), necesitaremos introducir la columna "name" con su valor en el body como veniamos haciendo anteriormente mas el token que guardamos al loggear
</details>
<details>
<summary>USER ENDPOINTS</summary>
    GET USERS (super_admin): GET -> localhost:4001/api/users?limit=2&page=2
Este endpoint nos traerá a todos los usuarios. La ruta varía respecto a los demas dado que en este hemos añadido un limitador de usuarios por página a mostrar para evitar largas listas en casos de muchos registros. Se pueden manipular las cifras tras limit y page para modificar el numero de registros por pagina y la pagina en la que situarse. Puede quitarse la elección de pagina

     GET USERS BY ID (super_admin): GET -> localhost:PORT/api/users/id
Podremos obtener los datos de un usuario concreto. Pondremos el numero de de id del usuario en lugar del "id" de la ruta para indicar cual buscamos.
     CREATE USERS (super_admin): POST -> localhost:PORT/api/users
Añadir nuevos usuarios a la BD. Tendremos que introducir en el body de nuestro client, los siguientes registros con nuestra elección para cada uno. tambien el token en auth>bearer, como en todos los endpoints salvo login y register:
``` bash
{
    "firstName": "xxxxxxx",
    "lastName": "xxxxxxxx",
    "email": "xxxxxx@xxx.xxx",
    "password": "xxxxxxx"
}
```
    GET PROFILE: GET -> localhost:PORT/api/users/profile
Obtener los datos de la propia cuenta logueada. Utilizará el token asignado para identificar al dueño de la petición.

    UPDATE PROFILE: PUT -> localhost:PORT/api/users/profile
    ![alt text](img/UpdateProfileController.png)
De nuevo, mediante la identificación por token, obtendremos el usuario que realiza petición y, mediante body, le introduciremos los registros y valores nuevos para nuestro usuario. Los introduciremos de la misma forma que explicamos en Register y en CREATE USERS.

</details>
</details>

###  AUTOR :pencil2:
- Antonio Rodrigo - Full Stack Developer student

- <a href="https://github.com/MR-ant1">GitHub - <a>Linkedin</a>

### POSIBLES MEJORAS :heavy_check_mark: 

-En el futuro se podrían implementar mas funciones como borrar usuarios, roles o citas.
-Podría mejorarse algún endpoint añadiendole mas información a devolver para mejorar la accesibilidad y manejo del programa.

### AGRADECIMIENTOS :raised_hands:

Muchísimas gracias como siempre al equipo de GeeksHubs Achademy por brindarme esta posibilidad de desarrollarme en el mundo y a todos mis compañeros que siempre están ahi para echar una mano cuando hace falta!

[def]: #Agradecimientos-

:arrow_up: [INDICE](#INDICE-open_file_folder)