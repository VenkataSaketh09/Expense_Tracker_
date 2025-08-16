const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  
  const [integerPart, fractionalPart] = num.toString().split(".");
  
  // Add thousands separator to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}` 
    : formattedInteger;
};


export {validateEmail,addThousandsSeparator}