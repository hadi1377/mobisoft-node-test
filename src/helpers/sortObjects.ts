export default (obj: any[], order: "desc" | "asc", key: string = "id") => {
  if (order === "desc") {
    return obj.sort((a, b) => {
      if (a[key] > b[key]) return -1;
      else if (a[key] < b[key]) return 1;
      return 0;
    });
  } else {
    return obj.sort((a, b) => {
      if (a[key] > b[key]) return 1;
      else if (a[key] < b[key]) return -1;
      return 0;
    });
  }
};
