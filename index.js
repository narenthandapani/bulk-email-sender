const nodemailer = require("nodemailer");
const fs = require("fs");
const csvParser = require("csv-parser");
const dns = require("dns").promises;

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "narenthandapani@gmail.com",
        pass: "bjdx ttwy xghi iurl",
    },
});

// Function to validate email format
const isValidEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Function to check if the email domain has MX records
const hasMXRecords = async (email) => {
    try {
        const domain = email.split("@")[1]; // Get domain part (e.g., gmail.com)
        const mxRecords = await dns.resolveMx(domain);
        return mxRecords && mxRecords.length > 0;
    } catch (error) {
        return false;
    }
};

// Read emails from CSV and validate before sending
const emailList = [];
const invalidEmails = [];

fs.createReadStream("emails.csv")
    .pipe(csvParser())
    .on("data", (row) => {
        const email = row.email?.trim();
        if (email && isValidEmailFormat(email)) {
            emailList.push(email);
        } else {
            invalidEmails.push(email);
        }
    })
    .on("end", async () => {
        console.log(`📧 New batch: Sending emails to ${emailList.length} recipients...`);

        for (const email of emailList) {
            if (!(await hasMXRecords(email))) {
                console.log(`❌ Invalid email (no MX records found): ${email}`);
                invalidEmails.push(email);
                continue; // Skip sending this email
            }

            console.log(`Preparing to send email to: ${email}`);

            try {
                let info = await transporter.sendMail({
                    from: "your-email@gmail.com",
                    to: email,
                    subject: "Test Email",
                    text: "Hello! This is a test email.",
                });
                console.log(`✅ Email sent to ${email} (Message ID: ${info.messageId})`);
            } catch (error) {
                console.log(`❌ Failed to send email to ${email}: ${error.message}`);
            }
        }

        // Display invalid emails
        if (invalidEmails.length > 0) {
            console.log(`\n⚠️ ${invalidEmails.length} Invalid Email(s) Found:`);
            invalidEmails.forEach((email, index) => {
                console.log(`${index + 1}. ${email}`);
            });
        }

        console.log("🎉 All emails processed!");
    });
