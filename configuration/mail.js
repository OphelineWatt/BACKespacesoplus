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
        <p>Félicitations ! Votre inscription a bien été enregistrée.</p>
        <p>Nous sommes ravi·e·s de vous compter parmi nos <strong>contributeur·trices</strong> !</p>
        <p>Vous pouvez maintenant vous connecter à votre compte et accéder à toutes les fonctionnalités de notre plateforme.</p>
        <p style="margin-top: 30px;">À bientôt,<br><strong>L'équipe Espaces o+</strong></p>
      </div>
    `,
  };
};


//mail maj mail ok
export const mailUpdateMail = (mailUser, username) =>{
    return {
  from: process.env.EMAIL_USER,
  to: mailUser, 
  subject: 'Confirmation de modification du mail',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Bonjour ${username},</p>
      <p>Nous confirmons que ton mail a bien été mis à jour sur <strong>espaces O+</strong>.</p>
      <p>Tu peux maintenant te connecter avec celle-ci.</p>
      <br/>
      <p>L’équipe espaces 0+ reste disponible et te remercie pour ta confiance</p>
    </div>
  `
};
 };

 //mail maj mdp ok
export const mailUpdatePassword = (mailUser, username) =>{
    return {
  from: process.env.EMAIL_USER,
  to: mailUser, 
  subject: 'Confirmation de modification du mot de passe',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Bonjour ${username},</p>
      <p>Nous confirmons que ton mot de passe a bien été mis à jour sur <strong>espaces O+</strong>.</p>
      <p>Tu peux maintenant te connecter avec celui-ci.</p>
      <br/>
      <p>L’équipe espaces 0+ reste disponible et te remercie pour ta confiance</p>
    </div>
  `
};
 };