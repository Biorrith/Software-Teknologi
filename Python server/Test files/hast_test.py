import string, hashlib, sys


msg = "test"
msg = msg.encode()
m = hashlib.sha256()
m.update(msg)
print(m.digest())


original_stdout = sys.stdout
        
    #TODO: Make this save in proper files in subdirectories, depending on the day, time
    #TODO: and subject name.
with open('Store Emails/Lukas_er_homo.txt', 'w') as f:
    sys.stdout = f # Change the standard output to the file we created.
    print(m.digest())
    sys.stdout = original_stdout # Reset the standard output to its original value
