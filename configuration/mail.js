import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// mail inscription
export const mailRegister = (mailUser, username) => {
  return {
    from: process.env.EMAIL_USER,
    to: mailUser,
    subject: "Bienvenue sur notre plateforme !",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #5b7a99;">Bienvenue ${username} !</h2>
        <p>Félicitations ! Ton inscription a bien été enregistrée.</p>
        <p>Nous sommes ravi·e·s de te compter parmi nos <strong>contributeur·trices</strong> !</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Espaces o+</strong></p>
      </div>
    `,
  };
};
