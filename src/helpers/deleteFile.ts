import fs, { NoParamCallback } from "fs";

export default (
  path: string | null,
  cb: NoParamCallback = () => console.log("Deleted")
) => {
  if (path && fs.existsSync(path)) {
    fs.unlink(path, cb);
  }
  return true;
};
