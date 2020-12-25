# Software-Teknologi

Welcome to Alphamail! In here we have multiple folders - most are old and nonfinished versions. The finished version of the code is located in the *Alphamail* folder.
________________________________________________________________________________

# Setting up the server

First, install node.js - [Download link.](https://nodejs.org/en/)


Make sure you have version 6.14.6 or newer:

	$ npm -v

Navigate to the *Alphamail* folder in the console.

Now we need to install the libraries we used for developing the server. Install the following commands:

	$ npm install nodemon
    
	$ npm install sendmail

	$ npm install cookie-parser

	$ npm install body-parser
	
	$ npm install express-ejs-layouts

	$ npm install express-session

With the libraries installed, we now move on to install the database. For this, we use mySQL. Install the bottom version on [this link.] (https://dev.mysql.com/downloads/installer/)
You can skip the account setup, and just download the software right away. For the installation, follow the default setup. However, for the password you must enter ```Software_alphamail```, as this is what the server connects with.


In mysql, chose "Create a new schema" and create one called alphamail with default settings:

![How to make schema](https://github.com/Biorrith/Software-Teknologi/blob/main/pictures/schema.png)


Make a new query, by clicking the button seen below:

![How to make new query](https://github.com/Biorrith/Software-Teknologi/blob/main/pictures/query.png)

Now execute the following two commands:

```
CREATE TABLE `alphamail`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `email` VARCHAR(255) NOT NULL, `psw` VARCHAR(20) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
```
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Software_alphamail'
```

Now everything should be set and ready to go. In a terminal, navigate to Alphamail directory, and run the code:

	$ npm install mysql
	
	$ nodemon app.js

Now your localhost should be up and running on localhost, port 3000.

