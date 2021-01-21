# Software-Teknologi

**Welcome to Alphamail!** 
In here we have multiple folders - most are old and nonfinished versions. The finished version of the code is located in the *Alphamail* folder.
________________________________________________________________________________

# Setting up the server

First, install node.js - [Download link](https://nodejs.org/en/), take the left version reccomended for most users.


Make sure you have version 6.14.6 or newer:

	$ npm -v

Download the files, and in a console navigate to the *Alphamail* directory - you can delete the other folders if you wish.

Now we need to install the libraries we used for developing the server. Install the following commands:

	$ npm install -g nodemon
    
	$ npm install sendmail

	$ npm install cookie-parser

	$ npm install body-parser
	
	$ npm install express-ejs-layouts

	$ npm install express-session
	
	$ npm install js-sha256

With the libraries installed, we now move on to install the database. For this, we use mySQL. 
Install the bottom version on [this link.](https://dev.mysql.com/downloads/installer/)
You can skip the account setup, and just download the software right away. For the installation, follow the developer default setup. However, for the password you must enter is ```Software_alphamail```, as this is the password the server connects with.

Now mySQL workbench automatically opens. Under mySQL connections should be an already created connection - click it to enter it, with password ```Software_alphamail```.

In mysql, choose "Create a new schema" and create one called *alphamail* with default settings:

![How to make schema](https://github.com/Biorrith/Software-Teknologi/blob/main/pictures/schema.png)


Make a new query by clicking the button seen below:

![How to make new query](https://github.com/Biorrith/Software-Teknologi/blob/main/pictures/query.png)

Now execute the following two commands, one at a time. The first makes a table in which we store the users of Alphamail, the second makes sure the server can connect to the database.
To execute, click the 'lightning':

```
CREATE TABLE `alphamail`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `email` VARCHAR(255) NOT NULL, `psw` VARCHAR(64) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
```

Delete the previous command, and execute the next in the same query (make sure to delete previous command):

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Software_alphamail'
```

Now everything should be set and ready to go. In a terminal, navigate to Alphamail directory, install npm sql and run the code:

	$ npm install mysql
	
	$ nodemon app.js

Now your server should be up and running on localhost, port 3000.

If, for some unlucky reason, nodemon is not recognized, you can also run the server with:

	$ node app.js
