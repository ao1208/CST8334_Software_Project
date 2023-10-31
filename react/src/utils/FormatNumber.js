export const formatNumber = (number) => {
  const formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  });

  return formattedNumber.replace("CA", "");
};
