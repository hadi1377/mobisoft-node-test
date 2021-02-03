import User from "@models/User";
import formatIsoString from "@helpers/formatIsoString";

class UserCollection {
  protected user: User;
  protected users: User[];

  public static single = async (user: User) => {
    return {
      ...user.toJSON(),
      createdAt: formatIsoString(user.createdAt),
      updatedAt: formatIsoString(user.updatedAt),
      profileImage: `${process.env.APP_URL}/uploads/user/${user.id}.jpg`,
      // role: await RoleCollection.single(role),
    };
  };

  public static collection = async (users: User[]) => {
    return await Promise.all(
      users.map((user) => {
        return UserCollection.single(user);
      })
    );
  };
}

export default UserCollection;
