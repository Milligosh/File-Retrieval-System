import nodemailer from 'nodemailer'
export class GeneratePassword{
    static async sendCredentialsEmail(email: string, password: string): Promise<void> {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your New Account Credentials",
      text: `Welcome to The FRS! Your account has been created. 
             Email: ${email}
             Password: ${password}
             
             You can now log in with these credentials.`,
      html: `<p>Welcome! Your account has been created.</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Password:</strong> ${password}</p>
             <p>You can now log in with these credentials.</p>`,
        };
    
        await transporter.sendMail(mailOptions);
    }
    
    static async updateCredentialsEmail(email: string, password: string): Promise<void> {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Account Update",
      text: ` Your FRS account has been updated. 
             Email: ${email}
             Password: ${password}
             
             You can now log in with these credentials.`,
      html: `<p>Welcome! Your account has been updated.</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Password:</strong> ${password}</p>
             <p>You can now log in with these credentials.</p>`,
        };
    
        await transporter.sendMail(mailOptions);
    }
}
