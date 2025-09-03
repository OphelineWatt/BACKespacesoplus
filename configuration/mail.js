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
export const mailUpdateMail = (mailUser, username) => {
  return {
    from: process.env.EMAIL_USER,
    to: mailUser,
    subject: "Confirmation de modification du mail",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Bonjour ${username},</p>
      <p>Nous confirmons que ton mail a bien été mis à jour sur <strong>espaces O+</strong>.</p>
      <p>Tu peux maintenant te connecter avec celle-ci.</p>
      <br/>
      <p>L’équipe espaces 0+ reste disponible et te remercie pour ta confiance</p>
    </div>
  `,
  };
};

//mail maj mdp ok
export const mailUpdatePassword = (mailUser, username) => {
  return {
    from: process.env.EMAIL_USER,
    to: mailUser,
    subject: "Confirmation de modification du mot de passe",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Bonjour ${username},</p>
      <p>Nous confirmons que ton mot de passe a bien été mis à jour sur <strong>espaces O+</strong>.</p>
      <p>Tu peux maintenant te connecter avec celui-ci.</p>
      <br/>
      <p>L’équipe espaces 0+ reste disponible et te remercie pour ta confiance</p>
    </div>
  `,
  };
};

//mail réinitialisation mot de passe
export const mailForgottenPassword = (mailUser, username, tokenReset) => {
  return {
    from: process.env.EMAIL_USER,
    to: mailUser,
    subject: "Réinitialisation de votre mot de passe",
    html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #1976d2; margin-bottom: 20px;">Bonjour ${username},</h2>

    <p>Nous avons bien reçu une demande de réinitialisation de mot de passe pour votre compte <strong>espaces 0+</strong>.</p>

    <p>Pour créer un nouveau mot de passe, veuillez cliquer sur le bouton ci-dessous :</p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="${process.env.FRONTEND_URL}/passewordReset/${tokenReset}" style="background-color: #1976d2; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
        Réinitialiser mon mot de passe
      </a>
    </p>

    <p>Ce lien est valable pendant une durée limitée. Si vous n'avez pas demandé cette réinitialisation, vous pouvez simplement ignorer cet email.</p>

    <p style="margin-top: 40px;">Bien à vous,<br><strong>L’équipe espaces 0+</strong></p>
  </div>
</div>
    `,
  };
};
