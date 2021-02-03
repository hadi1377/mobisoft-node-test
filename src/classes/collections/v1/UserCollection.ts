import User from "@models/User";
import formatIsoString from "@helpers/formatIsoString";

class UserCollection {
  protected user: User;
  protected users: User[];

  public static single = (user: User) => {
    return {
      ...user.toJSON(),
      createdAt: formatIsoString(user.createdAt),
      updatedAt: formatIsoString(user.updatedAt),
    };
  };

  public static collection = (users: User[]) => {
    return users.map((user) => {
      return UserCollection.single(user);
    });
  };
}

export default UserCollection;
