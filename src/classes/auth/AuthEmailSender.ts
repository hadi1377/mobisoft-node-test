import dateAndTime from "date-and-time";
import config from "@config/index";
import emailConnection from "@helpers/emailConnection";
import getRandomInt from "@helpers/getRandomInt";
import User from "@models/User";
import Token from "@models/Token";
import formatIsoString from "@helpers/formatIsoString";

class AuthEmailSender {
  protected hashedCode: string;
  protected user: User;
  protected type: "forgot" | "confirm";
  protected transport: any;

  public constructor(user: User, type: "forgot" | "confirm") {
    this.type = type;
    this.user = user;
    if (!this.user) {
      throw new Error("The user does not exist!");
    }
    this.createHashedCode();
    this.transport = emailConnection();
  }

  public sendEmail = async () => {
    return this.type === "confirm"
      ? await this.confirmEmail()
      : await this.forgotEmail();
  };

  protected confirmEmail = async () => {
    const info = await this.transport.sendMail({
      from: config.emails.defaultConfirmEmail,
      to: this.user.email,
      subject: "Your confirmation email",
      html: `
        Hello buddy!<br/>
        This is your confirmation code, please copy it and paste into the website page:<br/>
        ${this.hashedCode}<br/>
        Thank you!
    `,
    });
    return await this.createRecord(info);
  };

  protected forgotEmail = async () => {
    const info = await this.transport.sendMail({
      from: config.emails.defaultConfirmEmail,
      to: this.user.email,
      subject: "Reset Password Request",
      html: `
        Hello buddy!<br/>
        This is your reset password, please copy it and paste into the website page:<br/>
        ${this.hashedCode}<br/>
        Thank you!
    `,
    });
    return await this.createRecord(info);
  };

  protected createHashedCode = () => {
    this.hashedCode =
      process.env.NODE_ENV === "production"
        ? getRandomInt(1000, 9999).toString()
        : "1111";
  };

  protected createRecord = async (emailInfo: any) => {
    const expire = dateAndTime.addDays(new Date(), 1).toISOString();
    if (emailInfo) {
      await Token.destroy({
        where: { userId: this.user.id, type: this.type },
      });
      const token = new Token({
        token: this.hashedCode,
        used: false,
        expireAt: expire,
        type: this.type,
        userId: this.user.id,
      });
      await token.save();
      return {
        sent: true,
        expire: formatIsoString(expire),
      };
    }
    return {
      sent: false,
    };
  };
}

export default AuthEmailSender;
