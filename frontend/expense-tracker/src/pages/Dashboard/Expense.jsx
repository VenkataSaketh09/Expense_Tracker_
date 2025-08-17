import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import ExpenseTransactionsList from "../../components/expense/ExpenseTransactionsList";
import Modal from "../../components/Layouts/Modal";
import ConfirmDeleteModal from "../../components/Layouts/ConfirmDeleteModal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import toast from "react-hot-toast";

const Expense = () => {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    item: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.Expense.GET_ALL_Expense}`
      );
      if (response.data && response.data.expense) {
        setExpenseData(response.data.expense);
      }
      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expense data";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in fetching expense data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const loadingToast = toast.loading("Adding expense...");

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.Expense.ADD_Expense}`,
        expense
      );
      if (response.data) {
        // Refresh the expense data after adding
        fetchExpenseDetails();
        setOpenAddExpenseModal(false);
        toast.dismiss(loadingToast);
        toast.success("Expense added successfully! 💸");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to add expense";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in adding expense:", error);
    }
  };

  const handleDeleteRequest = (item) => {
    setDeleteConfirmation({
      isOpen: true,
      item: item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation.item) return;

    const loadingToast = toast.loading("Deleting expense...");

    try {
      const response = await axiosInstance.delete(
        API_PATHS.Expense.DELETE_Expense(deleteConfirmation.item._id)
      );
      if (response.data) {
        // Refresh the expense data after deletion
        fetchExpenseDetails();
        setDeleteConfirmation({ isOpen: false, item: null });
        toast.dismiss(loadingToast);
        toast.success("Expense deleted successfully! 🗑️");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to delete expense";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in deleting expense:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, item: null });
  };

  const handleDownloadExcel = async () => {
    const loadingToast = toast.loading("Preparing download...");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.Expense.DOWNLOAD_Expense}`,
        {
          responseType: "blob", // Important for file downloads
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Get filename from response headers or use default
      const contentDisposition = response.headers["content-disposition"];
      let filename = "expense_details.xlsx";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.dismiss(loadingToast);
      toast.success("Excel file downloaded successfully! 📊");
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to download file";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in downloading excel:", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <div className="">
            <ExpenseTransactionsList
              transactions={expenseData}
              onDelete={handleDeleteRequest}
              onDownload={handleDownloadExcel}
            />
          </div>
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <div>
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deleteConfirmation.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Expense"
          message="Are you sure you want to delete this expense entry?"
          itemName={deleteConfirmation.item?.category}
          type="expense"
        />
      </div>
    </DashboardLayout>
  );
};

export default Expense;
