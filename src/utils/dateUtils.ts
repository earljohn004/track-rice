export const getFormattedDate = () => {
  const timestamp = Date.now();

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const getFormattedTime =(timestamp: number) =>{
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US")
}
