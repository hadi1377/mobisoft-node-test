import bcrypt from "bcryptjs";

import User from "@models/User";
import Config from "@config/index";
import UserCollection from "@collections/v1/UserCollection";

const createAdmin = async () => {
  // let roleID = await Role.getRoleID("admin");
  // if (!roleID) {
  //   const role = await Role.create(
  //     {
  //       title: "admin",
  //     },
  //     {
  //       logging: false,
  //     }
  //   );
  //   roleID = role.id;
  // }
  // const user = await User.findOne({
  //   where: { roleId: roleID },
  //   logging: false,
  // });
  // let admin: User;
  // if (!user) {
  //   admin = new User({
  //     email: "hadi.wf77@gmail.com",
  //     password: "secret",
  //     name: "Hadi Ahmadzadeh",
  //     roleId: roleID,
  //     confirmedAt: new Date().toISOString(),
  //   });
  //   admin = await admin.save();
  // }
  // return true;
};

const run = async () => {
  await createAdmin();
  return true;
};

export default run;
