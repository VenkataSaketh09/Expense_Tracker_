export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// export const BASE_URL = "https://expense-tracker-backend1-tqtc.onrender.com"

export const API_PATHS = {
  Auth: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_PROFILE: "/api/v1/auth/update-profile",
    UPDATE_PASSWORD: "/api/v1/auth/update-password",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
  },
  Expense: {
    ADD_Expense: "/api/v1/expense/add",
    GET_ALL_Expense: "/api/v1/expense/get",
    DELETE_Expense: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_Expense: "/api/v1/expense/downloadexcel",
  },
};
