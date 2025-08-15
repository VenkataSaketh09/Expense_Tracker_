export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  Auth: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
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
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
