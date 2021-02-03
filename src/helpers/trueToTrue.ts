export default (
  str: string | number | boolean,
  undefinedBool: boolean = false,
  defaultBool: boolean = false
) => {
  switch (str) {
    case undefined:
      return undefinedBool;
    case "true":
    case "1":
    case 1:
    case true:
      return true;
    case "false":
    case "0":
    case 0:
    case false:
      return false;
    default:
      return defaultBool;
  }
};
