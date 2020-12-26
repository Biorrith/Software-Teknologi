# Import socket module  
import socket             
  

def send_socket(msg, socket):
    msg = msg.encode()
    socket.send(msg)


# Create a socket object  
s = socket.socket()       
  
# Define the port on which you want to connect  
port = 25                
  
# connect to the server on local computer  
s.connect(('127.0.0.1', port))  
print (s.recv(1024))


logged_in = False
while(not logged_in): #TODO Make statement
    username = input("Enter username:")
    password = input("Enter password:")
    send_socket(username, s)
    send_socket(password, s)
    answer = s.recv(1024)
    answer = answer.decode('utf-8')
    print(answer)
    if(answer == "1"):
        logged_in = True

# receive data from the server  

send_bytes = 'HELO I see this as an absoloute success!\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)  
print (s.recv(1024))


send_bytes = 'quit\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)
print (s.recv(1024))


s.close() 

#TODO: Make an actual client, man...