## Bulk Email Sender



## Project Overview
**Bulk Email Sender** is a Node.js-based tool that allows you to send bulk emails from a CSV file using **Nodemailer**. It validates emails, handles errors, and logs failed attempts, making it an ideal solution for **email campaigns and automated outreach**.

##  Features
-  **Send bulk emails** from a CSV file.
-  **Email validation** to check format and domain existence.
- **Error handling** for failed deliveries.
- **Logging** for sent and failed emails.
- **Configurable SMTP settings** for different email providers.

## Technologies Used
-  **Node.js** – Backend runtime environment.
- **Nodemailer** – Email-sending library.
-  **CSV Parser** – Reads recipient data from a CSV file.
- **DNS Lookup** – Verifies email domain validity.

## Project Structure
```
/bulk-email-sender
│── index.js            # Main script
│── emails.csv          # List of recipients
│── config.js           # SMTP configuration
│── logs/               # Stores sent/failed email logs
│── package.json        # Project metadata
│── README.md           # Documentation
```

##  Installation & Setup
### **1 Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/bulk-email-sender.git
```
### **2 Navigate to the Project Folder**
```sh
cd bulk-email-sender
```
### **3 Install Dependencies**
```sh
npm install
```
### **4 Configure SMTP Credentials**
Update the `config.js` file with your email credentials:
```js
module.exports = {
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password"
    }
};
```
### **5 Prepare Your CSV File**
Ensure `emails.csv` contains:
```csv
email,name
example1@gmail.com,John Doe
example2@gmail.com,Jane Doe
```
### **6 Run the Script**
```sh
node index.js
```

##  Example Output
```
 Sending emails to 2 recipients...
 Email sent to example1@gmail.com
 Failed to send email to example2@gmail.com: Invalid email address
 All emails processed!
```

##  Deployment Options
### **GitHub Deployment**
1. Initialize Git and push the project to GitHub:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bulk-email-sender.git
   git push -u origin main
   ```
### **Server Deployment (Linux VPS or Cloud Server)**
1. Upload files to the server.
2. Install Node.js and dependencies:
   ```sh
   sudo apt update && sudo apt install nodejs npm -y
   npm install
   ```
3. Run the script using PM2 for long-term execution:
   ```sh
   npm install -g pm2
   pm2 start index.js --name bulk-email-sender
   ```
### **Automate with Cron Jobs (Linux)**
1. Open the crontab editor:
   ```sh
   crontab -e
   ```
2. Add a cron job to run the script daily at 9 AM:
   ```sh
   0 9 * * * /usr/bin/node /path/to/index.js
   ```

## Troubleshooting
### ** Gmail Authentication Error**
- Ensure you have **enabled "Less Secure Apps" or used an App Password** in your Gmail settings.
- Check your **username and password** in `config.js`.
- If using **2FA**, generate an **App Password**.

### ** Emails Not Sending**
- Verify SMTP server settings.
- Check **logs/** for error messages.
- Test using a different email provider.

##  Contact & Support
For any issues or improvements, feel free to **open an issue** or **submit a pull request**.
 

