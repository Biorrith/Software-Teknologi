import sys, hashlib, os
from os import path

class authendicate():
    def __init__(self):
        if(not path.isdir('Logins')): #If the directory doesnt exsist then make the directory.
            dir_name = os.getcwd() + "/Logins"
            os.mkdir(dir_name)
        print("Login initialized...")

        
    def login(self, username, password):
        filename = "Logins/" + username + ".txt" #The directory where the password of the user is stored.
        try:
            test_passw = password.encode()
            m = hashlib.sha256(test_passw) #Hash the password to check if equals the hashed password
            string = m.digest()


            """
            This is fucking stupid, but the only way i can compare hashes. I have to write it
            into a new txt file, otherwise im comparing strings to bytes, and not strings to strings...
            """

            original_stdout = sys.stdout
            with open("tmp_hash", 'w') as f:
                sys.stdout = f # Change the standard output to the file we created.
                print(string)
                sys.stdout = original_stdout # Reset the standard output to its original value

            #Reading from both the files to compare the password.
            hashed_psw = open(filename, "r").read()
            test_passw = open("tmp_hash", "r").read()

            #If correct password, let entry.
            if(test_passw == hashed_psw):
                return True
            else:
                print("Wrong password.")
                return False
            #TODO: make a prettier hash compare, for the love of god.
            #TODO: give more attempts.

        except OSError:
            print ("That user doesn't exists.")
            return False
        


    def make_profile(self, username, password):
        if(path.exists(username)):
            print("Profile already exists.")
        else:
            file_code = password.encode() #Convert the code to bits
            file_name = 'Logins/' + username + '.txt' #The directory plus the file name.
            m = hashlib.sha256() #Hash the password
            m.update(file_code)
            hashed_pass = m.digest() #Get the hashed password.

            original_stdout = sys.stdout
            with open(file_name, 'w') as f:
                sys.stdout = f # Change the standard output to the file we created.
                print(hashed_pass)
                sys.stdout = original_stdout # Reset the standard output to its original value
        
        #TODO: Add option to change password?
