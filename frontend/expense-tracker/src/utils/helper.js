import moment from "moment";

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
    ?  `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

const prepareIncomeBarChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: parseFloat(item?.amount) || 0,
    source: item?.source,
    date: item?.date,
  }));

  return chartData;
};

const prepareExpenseLineChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: parseFloat(item?.amount) || 0,
    category: item?.category,
    date: item?.date,
  }));

  return chartData;
};

export {
  validateEmail,
  addThousandsSeparator,
  prepareIncomeBarChartData,
  prepareExpenseLineChartData,
};