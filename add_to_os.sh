echo "Adding the file_renamer command to the OS..."
echo "Run this command after you have run 'su <admin user>' and 'sudo su' from a standard account"

printf "%s " "Press enter to continue or Ctrl+C to cancel..."
read ans

cp dist/file_renamer.js /usr/local/bin/file_renamer