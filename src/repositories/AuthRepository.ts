import bcrypt from "bcryptjs";

import User from "@models/User";
import config from "@config/index";
import errorThrower from "@helpers/errorThrower";

class AuthRepository {
  public register = async (data: Auth.Register) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, config.salt);
      const theUser = await User.create({
        ...data,
        password: hashedPassword,
      });
      return {
        user: theUser.format(),
        loginInfo: theUser.getJWT(),
      };
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
        errorThrower(null, 404, [
          { msg: "There is no user with this email address!" },
        ]);
      const checkPassword = await bcrypt.compare(
        data.password,
        userWithThisEmail.password
      );
      if (!checkPassword)
        errorThrower(null, 401, [{ msg: "Password is invalid!" }]);
      return {
        user: userWithThisEmail.format(),
        loginInfo: userWithThisEmail.getJWT(),
      };
    } catch (err) {
      throw err;
    }
  };
}

export default AuthRepository;
