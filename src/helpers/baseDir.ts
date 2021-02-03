import path from "path";

export default (...rest: string[]) => {
    return path.join(__dirname, "..", "..", ...rest);
};