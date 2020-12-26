import socket, sys, string, os, login, threading


#TODO: Make this proper SMTP, as this right now is pretty shite...


def send_socket(msg, socket):
    msg = msg.encode()
    socket.send(msg)

#TODO: Save emails properly!
def save_email(email):
    message = email.decode('utf-8')
    original_stdout = sys.stdout
    with open('Store Emails/Lukas_er_homo.txt', 'w') as f:
            sys.stdout = f # Change the standard output to the file we created.
            print(message)
            sys.stdout = original_stdout # Reset the standard output to its original value
    


class engine():
    INIT = 0
    HELO = 1
    FROM = 2
    RCPT = 3
    DATA = 4
    MAIL = 5
    quit = 6
    
    def __init__(self, c, socket):
        self.c_socket = c
        self.inc_socket = socket
        self._state = engine.HELO
    
    def login(self, socket):
        
        msg = "Please provide username and password in two ways."
        send_socket(msg, socket)
        self.login_input = login.authendicate()

        for i in range(0, 3):
            username = socket.recv(1024).decode('utf-8')
            password = socket.recv(1024).decode('utf-8')
            if(self.login_input.login(username, password)):
                send_socket("1", socket)
                self.user_folder = "Store Emails/" + username
                return True, username
            else:
                send_socket("0", socket)
        return False, "Login failed"


    def run(self):
        logged_in, log_msg = self.login(self.c_socket)
        if(not logged_in):
            self.c_socket.close()    #Login successfull, proceed with communication in the engine.
            print(log_msg)
            return
        print(log_msg)

        msg = "220\r\n" #Standard STMP command to show connection is established.
        msg = msg.encode()
        self.c_socket.send(msg)
        

        #We only break this loop when re call return.
        while(1):
            next_command = 0 #Everytime we get out here, we are getting the next command.
            msg = ''

            while not next_command:
                command = self.c_socket.recv(1024).decode('utf-8')
                
                if(len(command)):
                    
                    next_command = 1 #The end of a command is presented with \r\n, so when we reach it we are ready for
                    #The next command.           
                    answer, keep = self.communication(command)
                    answer = answer.encode()
                    self.c_socket.send(answer)
                    if(not keep): #TODO: Make this a lot prettier
                        print("We got here")
                        self.c_socket.close()
                        return
                    

        #message = self.c_socket.recv(1024)
        #save_email(message)
        
        
        
        #TODO: Make this save in proper files in subdirectories, depending on the day, time
        #TODO: and subject name.

        
    def communication(self, command):
        cmd = command[0:4] #
        cmd = cmd.upper()

        if(cmd == 'HELO'):
            self._state = engine.FROM
            return "250\r\n", 1
        
        if(cmd == 'FROM'):
            if(self._state == engine.FROM):
                self._state = engine.RCPT
                return "250\r\n", 1
        
        elif(cmd == 'RCPT'):
            if(self._state == engine.RCPT):
                self._state = engine.DATA
                return "250\r\n", 1



        elif(cmd == 'QUIT'):
            return "404\r\n", 0 #TODO: Not make it 404, but the proper exit
        
            
        else:
            return "503, try again\r\n", 1





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
            self.engine = engine(c, self._socket)
            thread = threading.Thread(target=self.engine.run(), args=(c,))
            thread.start()
            #self.engine.run()


            #TODO: Make the login code prettier and give it tries.


if __name__ == "__main__":
    #server_login = login.authendicate()
    #server_login.make_profile("Lukas", "DiLler")
    test = server(25)
    test.start()
    

#TODO
#Make login
#Store mails properly using Maildir method (mailbox?)
#Implement SMTP protocols properly
#Tighten up
