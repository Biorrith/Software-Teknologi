const sendmail = require('sendmail')()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const mysql = require('mysql')
const app = express()
const port = 3000;

// app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/pictures', express.static('pictures'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: '123456cat',
  resave: false,
  email: '',
  saveUninitialized: true,
  cookie: {
      expires: 600000 //60 seconds?
  }
}));


/* 
! get connection to our DB
*/
function getConnection(){
  return mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Sambasamba98',
    database: 'alphamail'
  });
}

//Saves mails that are recieved.
function saveMail_recieved(from, to, subject, mail){
  insert_position = to
  insert_position = insert_position.slice(0, -14) + "_recieved"
  
  queryString = "INSERT INTO " + insert_position + " (sender, rcpt, sbjt, mail_body, _read) VALUES (?, ?, ?, ?, ?)"
  
  getConnection().query(queryString, [from, to, subject, mail, false], (err) =>{
      if (err){
        console.log(err);
        res.sendStatus(500);
        res.redirect('/homepage');
      }
      console.log("Inserted recieved email successfully into database.");
  });
}

//Saves mails that get send.
function saveMail_send(from, to, subject, mail){
  insert_position = from.slice(0, -14) + "_send"
  
  queryString = "INSERT INTO " + insert_position + " (rcpt, sbjt, mail_body) VALUES (?, ?, ?)"
  
  getConnection().query(queryString, [to, subject, mail], (err) =>{
      if (err){
        console.log(err);
        res.sendStatus(500);
        res.redirect("/homepage");
      }
      console.log("Inserted send email successfully into database.");
  });
}

//Saves mails that get send.
function saveMail_draft(from, to, subject, mail){
  insert_position = from.slice(0, -14) + "_drafts"
  console.log("Insert position = ", insert_position)
  
  queryString = "INSERT INTO " + insert_position + " (rcpt, sbjt, mail_body) VALUES (?, ?, ?)"
  
  getConnection().query(queryString, [to, subject, mail], (err) =>{
      if (err){
        console.log(err);
        res.sendStatus(500);
        res.redirect("/homepage");
      }
      console.log("Inserted send email successfully into draft.");
  });
}


/* 
! ROUTING METHOS. These methos are used to send the user to the desired location.
*/
app.get('/', (req, res) => {
  res.render('login');
})

app.get('/homepage', (req, res) => {
  if (req.session.loggedin) {
  res.render('homepage.ejs');
  } else res.redirect('/')
})

app.get('/send', (req, res) => {
  if (req.session.loggedin) {
  res.render('send.ejs');
  } else res.redirect('/')
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.get('/inbox', (req, res) => {
  if (req.session.loggedin) {
  queryString = "SELECT * FROM " + req.session.email.slice(0, -14) + "_recieved";
  
  getConnection().query(queryString, (err, rows, fields) => {
    if (err){ 
      console.log(err);
    }
  res.render('inbox', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
})

app.get('/outbox', (req, res) => {
  if (req.session.loggedin){
  
  queryString = "SELECT * FROM " + req.session.email.slice(0, -14) + "_send";
  
  getConnection().query(queryString, (err, rows, fields) => {
    if (err){ 
      console.log(err);
    }
  res.render('outbox', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
})

app.get('/drafts', (req, res) => {
  if (req.session.loggedin) {
  queryString = "SELECT * FROM " + req.session.email.slice(0, -14) + "_drafts";
  
  getConnection().query(queryString, (err, rows, fields) => {
    if (err){ 
      console.log(err);
    }
  res.render('drafts', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
})

app.get('/deletein/:id', (req, res) =>{
  if (req.session.loggedin){
  
  console.log("trying to delete an email")
  const mailId = req.params.id
  console.log(mailId)
  queryString = "DELETE FROM " + req.session.email.slice(0, -14) + "_recieved WHERE id = ?"
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
  res.redirect('/inbox')
  })
  } else res.redirect('/')
})

app.get('/deleteout/:id', (req, res) =>{
  if (req.session.loggedin){
  
  console.log("trying to delete an email")
  const mailId = req.params.id
  
  queryString = "DELETE FROM " + req.session.email.slice(0, -14) + "_send WHERE id = ?"
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
  res.redirect('/outbox')
  })
  } else res.redirect('/')
})

app.get('/deletedraft/:id', (req, res) =>{
  if (req.session.loggedin){
  
  console.log("trying to delete an email")
  const mailId = req.params.id
  
  queryString = "DELETE FROM " + req.session.email.slice(0, -14) + "_drafts WHERE id = ?"
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
  res.redirect('/drafts')
  })
  } else res.redirect('/')
})

app.get('/viewin/:id', (req, res) =>{
  if (req.session.loggedin){
  
  queryString1 = "SELECT * FROM "+ req.session.email.slice(0, -14) +"_recieved WHERE id = ?"
  queryString2 = "UPDATE " + req.session.email.slice(0, -14) + "_recieved SET _read = TRUE WHERE id = ?"
  queryString = queryString1 + queryString2
  const mailId = req.params.id
  
  getConnection().query(queryString2, [mailId], (err, rows, fields) => {
    if (err) console.log(err)
  })

  getConnection().query(queryString1, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
    console.log(rows)
    res.render('viewin', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
  
})

app.get('/viewout/:id', (req, res) =>{
  if (req.session.loggedin){
  
  queryString = "SELECT * FROM "+ req.session.email.slice(0, -14) +"_send WHERE id = ?"
  const mailId = req.params.id
  
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
    res.render('viewout', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
})

app.get('/viewdraft/:id', (req, res) =>{
  if (req.session.loggedin){
  
  queryString = "SELECT * FROM "+ req.session.email.slice(0, -14) +"_drafts WHERE id = ?"
  const mailId = req.params.id
  
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
    res.render('viewdraft', { title: 'User List', userData: rows})
  })
  } else res.redirect('/')
})

app.get('/markasread/:id', (req, res) =>{
  if (req.session.loggedin){
  
  const mailId = req.params.id
  queryString = "UPDATE " + req.session.email.slice(0, -14) + "_recieved SET _read = TRUE WHERE id = ?"
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
  res.redirect('/inbox')
  })
  } else res.redirect('/')
})

app.get('/markasunread/:id', (req, res) =>{
  if (req.session.loggedin){
  const mailId = req.params.id
  queryString = "UPDATE " + req.session.email.slice(0, -14) + "_recieved SET _read = FALSE WHERE id = ?"
  getConnection().query(queryString, [mailId], (err, rows, fields) => {
    if (err) console.log(err);
  res.redirect('/inbox')
  })
  } else res.redirect('/')
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

/*
! POST METHODS. These methos are usede when a button is clicked in html.
*/

app.post('/savedraft', (req, res) => {
  if (req.session.loggedin){

  saveMail_draft(req.session.email, req.body.to, req.body.subject, req.body.body)

  res.redirect('/homepage');
  } else res.redirect('/')

});

app.post('/send', (req, res) => {
  if (req.session.loggedin){
  console.log("trying to send an email");
  to = req.body.to

  //If multiple mails, we split them into array positions in the array mails.
  var index = 0
  var mails = []
  var length = to.length

  for (i = 0; i < length; i++){
    //console.log(to[i])
    if(to[i] === ","){
      console.log(i)
      mails.push(to.substring(index, i))
      if(to[i+1] == " ")
        index = i + 2
      else index = i+1
    }     
  }

  mails.push(to.substring(index, length)) //Enter the last email, as that is not included in the loop.

  length = mails.length
  for(i = 0; i < length; i++){
  if(to.substr(to.length - 13) == "alphamail.com"){
   saveMail_recieved(req.session.email, mails[i], req.body.subject, req.body.body)
  }
  }

  saveMail_send(req.session.email, req.body.to, req.body.subject, req.body.body)

  sendmail({
      from: req.session.email,
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.body,
    }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
  });

  res.redirect('/homepage');
  } else res.redirect('/')
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  queryString = "SELECT * FROM users WHERE email = '" + email + "'";
  
  getConnection().query(queryString, (err, rows, fields) => {
    if (err){ 
      console.log(err);
      console.log("User doesn't exists.")
    }

    //Get password from the database
    const pass = rows.map((row) =>{
      return row.psw
    })

    if(password == pass) {
      req.session.email = email;
      req.session.loggedin = true;
      console.log("User logged in.")
      res.redirect('/homepage');}
    
    else 
      //TODO: alert("Wrong email address or password.")
      res.redirect('/');
    
    res.end();
    });
});

app.post('/register', (req, res) => {
    const alphamail = "@alphamail.com"
    const eml = req.body.email + alphamail;
    
    for(i = 0; i < req.body.email.length; i++){
      if(req.body.email[i] === '@' || req.body.email[i] === '/' || req.body.email[i] === '&' || req.body.email[i] === '$')
        return res.redirect('/register')
    }

    const psw = req.body.password;

    queryString = "INSERT INTO users (email, psw) VALUES (?, ?)"
    getConnection().query(queryString, [eml, psw], (err, results, fields) =>{
      if (err){
        console.log("Failed to insert new user: " + err);
        res.sendStatus(500);
        return res.redirect('/register');
      }
      // req.session.email = req.body.email + alphamail;
      req.session.email = eml
      req.session.loggedin = true
      console.log("Inserted a new user with email: ")
      
      //Messages recieved.
      file_name = req.body.email + "_recieved"
      var file_setup = "CREATE TABLE "+ file_name + " (id INT KEY AUTO_INCREMENT, sender VARCHAR(255), rcpt VARCHAR(255), _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, mail_body TEXT, sbjt VARCHAR(255), _read BOOLEAN)";
      getConnection().query(file_setup, function (err, result) {  
      if (err) res.redirect('/register');  
        console.log("Table created")
        });
      
      //Messages send.
      file_name = req.body.email + "_send"
      var file_setup = "CREATE TABLE "+ file_name + " (id INT KEY AUTO_INCREMENT, rcpt VARCHAR(255), _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, mail_body TEXT, sbjt VARCHAR(255))";
      getConnection().query(file_setup, function (err, result) {  
      if (err) res.redirect('/register');  
        console.log("Table created")
        });
      
      file_name = req.body.email + "_drafts"
      var file_setup = "CREATE TABLE "+ file_name + " (id INT KEY AUTO_INCREMENT, rcpt VARCHAR(255), _time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, mail_body TEXT, sbjt VARCHAR(255))";
      getConnection().query(file_setup, function (err, result) {  
      if (err) res.redirect('/register');  
        console.log("Table created")
        });


      res.redirect('/homepage')
    });
});


/*
! app listen
 */

app.listen(port, () => console.log(`app listening on port ${port}!`));







