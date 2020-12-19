# Import socket module  
import socket             
  
# Create a socket object  
s = socket.socket()       
  
# Define the port on which you want to connect  
port = 25                
  
# connect to the server on local computer  
s.connect(('127.0.0.1', port))  
  
# receive data from the server  
print (s.recv(1024))

send_bytes = 'I see this as an absoloute success!\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)  

"""
print (s.recv(1024))
send_bytes = 'mail This is a test\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)  

print (s.recv(1024))
send_bytes = 'rcpt Daniel\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)   

# print (s.recv(1024))
# send_bytes = 'data idk what to type here \r\n'
# send_bytes = send_bytes.encode()
# s.sendall(send_bytes)

print (s.recv(1024))
send_bytes = 'quit\r\n'
send_bytes = send_bytes.encode()
s.sendall(send_bytes)
print (s.recv(1024))
"""

# close the connection  
s.close() 

#TODO: Make an actual client, man...