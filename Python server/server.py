import socket, sys, string, os, login


#TODO: Make this proper SMTP, as this right now is pretty shite...


class engine():
    def __init__(self, c, socket, username):
        self.c_socket = c
        self.inc_socket = socket
        self.user_folder = username
    
    def run(self):
        msg = "The server is up and running, please give input"
        msg = msg.encode()
        self.c_socket.send(msg)
        
        while(1):
            break
        message = self.c_socket.recv(1024)
        message = message.decode('utf-8')
        original_stdout = sys.stdout
        
        #TODO: Make this save in proper files in subdirectories, depending on the day, time
        #TODO: and subject name.

        with open('Store Emails/Lukas_er_homo.txt', 'w') as f:
            sys.stdout = f # Change the standard output to the file we created.
            print(message)
            sys.stdout = original_stdout # Reset the standard output to its original value




class server():
    def __init__(self, port):
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #Basic
        self._socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) 
        self._socket.bind(("", port)) #Empty string so you can take inputs
        self._socket.listen(5) #So you can listen to up to five at once
        self.logged_in = False

    def start(self):
        print("Server started successfully.\n")
        while 1:
            c, addr = self._socket.accept()
            self.login_input = login.authendicate()
            username = "Malthe"
            if(self.login_input.login(username, "test")):
                print("Access granted.")
                self.engine = engine(c, self._socket, username)
                self.engine.run()
            else:
                msg = "Username or password were incorrect."
                msg = msg.encode()
                c.send(msg)
                c.close()

            #TODO: Make the login code prettier and give it tries.


if __name__ == "__main__":
    server_login = login.authendicate()
    server_login.make_profile("Malthe", "test")
    #test = server(25)
    #test.start()
    

#TODO
#Make login
#Store mails properly using Maildir method (mailbox?)
#Implement SMTP protocols properly
#Tighten up
