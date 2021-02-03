import dateTime from "date-and-time";

export default (isoString: string | Date, format: string = "YYYY-MM-DD HH:mm:ss") => {
  const theDate = new Date(isoString);
  const formatted = dateTime.format(theDate, format);
  return formatted;
};
