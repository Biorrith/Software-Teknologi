# Software-Teknologi

Welcome to Alphamail! In here we have multiple folders - most are old and nonfinished versions. The finished version of the code is located in the *Alphamail* folder.
________________________________________________________________________________

# Setting up the server

First, install node.js - [Download link.](https://nodejs.org/en/)


Make sure you have version 6.14.8:

	$ npm -v

Now we need to install the libraries we used for developing the server. Install the following commands:

	$ npm install -g nodemon
    
	$ npm install sendmail

	$ npm install cookie-parser

	$ npm install body-parser
	
	$ npm install express-ejs-layouts

	$ npm install express-session

With the libraries installed, we now move on to install the database. For this, we use mySQL. Install the bottom version on [this link.](https://dev.mysql.com/downloads/installer/)
For the instalation, follow the default setup. However, the password you enter must be ```Software_alphamail```, as this is what the server connects with.


In mysql, chose "Create a new schema" and create one called alphamail
with default settings.

Now right click the schema and make a new table, called users. 

Make a new query, by clicking the button seen below:

![How to make new query](https://github.com/Biorrith/Software-Teknologi/blob/main/pictures/query.png)

Now execute the following two comamands:

```
CREATE TABLE \`alphamail\`.\`users\` (\`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT, \`email\` VARCHAR(255) NOT NULL, \`psw\` VARCHAR(20) NOT NULL, PRIMARY KEY (\`id\`), UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC) VISIBLE);
```
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```

Now everything should be set and ready to go. In a terminal, navigate to the position of the app.js file, and run the code:

	$ nodemon app.js



