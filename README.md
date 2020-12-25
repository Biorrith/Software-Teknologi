# Software-Teknologi


In order to run this code, do the following:


install node.js outside of the folder. Download link:
https://nodejs.org/en/

-Make sure you have version 2.0.6
npm -v

Install nodemon:
npm install -g nodemon

Install sendmail on order to communicate with outside sources:
    $  npm install sendmail

    $  npm install cookie-parser

npm install body-parser

Install mysql (bottom version):
https://dev.mysql.com/downloads/installer/

In mysql, chose "Create a new schema" and create one called alphamail
with default settings.

Now right click the schema and make a new table, called users. 

In this table, make 3 new rows:
	-id (type INT - check auto incrememnt and unsigned data type)
	-email (type VARCHAR()
	-psw
string = "CREATE TABLE `alphamail`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `email` VARCHAR(255) NOT NULL, `psw` VARCHAR(20) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);"

Make a new query and execute the following code:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'


npm install express-ejs-layouts
npm install express-session

