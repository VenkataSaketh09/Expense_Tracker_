import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import IncomeOverview from "../../components/income/IncomeOverview";
import IncomeTransactionsList from "../../components/income/IncomeTransactionsList";
import Modal from "../../components/Layouts/Modal";
import ConfirmDeleteModal from "../../components/Layouts/ConfirmDeleteModal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";
const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    item: null,
  });
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data && response.data.income) {
        setIncomeData(response.data.income);
      }
      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch income data";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in fetching income data", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddIncome = async (income) => {
    const loadingToast = toast.loading("Adding income...");

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        income
      );
      if (response.data) {
        // Refresh the income data after adding
        fetchIncomeDetails();
        setOpenAddIncomeModal(false);
        toast.dismiss(loadingToast);
        toast.success("Income added successfully! 🎉");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to add income";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in adding income:", error);
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

    const loadingToast = toast.loading("Deleting income...");

    try {
      const response = await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(deleteConfirmation.item._id)
      );
      if (response.data) {
        // Refresh the income data after deletion
        fetchIncomeDetails();
        setDeleteConfirmation({ isOpen: false, item: null });
        toast.dismiss(loadingToast);
        toast.success("Income deleted successfully! 🗑️");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to delete income";
      toast.error(`Error: ${errorMessage}`);
      console.log("Error in deleting income:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, item: null });
  };

  const handleDownloadExcel = async () => {
    const loadingToast = toast.loading("Preparing download...");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.DOWNLOAD_INCOME}`,
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
      let filename = "income_details.xlsx";
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
    fetchIncomeDetails();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <div className="">
            <IncomeTransactionsList
              transactions={incomeData}
              onDelete={handleDeleteRequest}
              onDownload={handleDownloadExcel}
            />
          </div>
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deleteConfirmation.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Income"
          message="Are you sure you want to delete this income entry?"
          itemName={deleteConfirmation.item?.source}
          type="income"
        />
      </div>
    </DashboardLayout>
  );
};

export default Income;
