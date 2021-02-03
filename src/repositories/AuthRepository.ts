import bcrypt from "bcryptjs";

import User from "@models/User";
import config from "@config/index";

class AuthRepository {
  public register = async (data: Auth.Register) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, config.salt);
      const theUser = await User.create({
        ...data,
        password: hashedPassword,
      });
      return theUser;
    } catch (err) {
      throw err;
    }
  };

  public findByEmailAndPassword = async (data: Auth.Login) => {
    try {
      const userWithThisEmail = await User.findOne({
        where: { email: data.email },
      });
      if (!userWithThisEmail)
        throw new Error("There is no user with this email address!");
      const checkPassword = await bcrypt.compare(
        data.password,
        userWithThisEmail.password
      );
      if (!checkPassword) throw new Error("Password is invalid!");
      return userWithThisEmail;
    } catch (err) {
      throw err;
    }
  };
}

export default AuthRepository;
