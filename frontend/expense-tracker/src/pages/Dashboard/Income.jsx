import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverview from "../../components/income/IncomeOverview";
import Modal from "../../components/Layouts/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeTransactionsList from "../../components/income/IncomeTransactionsList";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("Fetching income details...");
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      console.log("API Response:", response);
      if (response.data) {
        console.log("Income data received:", response.data);
        // Extract the income array from the response object
        const incomeArray = response.data.income || [];
        console.log("Setting income array:", incomeArray);
        setIncomeData(incomeArray);
      }
    } catch (error) {
      console.error("Error in fetching income data", error);
      // You might want to show a toast or alert here
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    try {
      console.log("Adding income:", income);
      // Add your API call here to save income
      const response = await axiosInstance.post(API_PATHS.INCOME.CREATE, income);
      if (response.data) {
        console.log("Income added successfully:", response.data);
        // Refresh the income list
        await fetchIncomeDetails();
        // Close the modal
        setOpenAddIncomeModal(false);
        // Show success message
        // toast.success("Income added successfully!");
      }
    } catch (error) {
      console.error("Error adding income:", error);
      // Show error message
      // toast.error("Failed to add income");
    }
  };

  const handleDeleteIncome = async (transaction) => {
    try {
      console.log("Deleting income:", transaction);
      // Add your API call here to delete income
      const response = await axiosInstance.delete(`${API_PATHS.INCOME.DELETE}/${transaction._id}`);
      if (response.status === 200) {
        console.log("Income deleted successfully");
        // Refresh the income list
        await fetchIncomeDetails();
        // Show success message
        // toast.success("Income deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting income:", error);
      // Show error message
      // toast.error("Failed to delete income");
    }
  };

  const handleDownload = () => {
    console.log("Download functionality to be implemented");
    // Implement download functionality here
  };

  useEffect(() => {
    console.log("Component mounted, fetching income details");
    fetchIncomeDetails();
  }, []);

  useEffect(() => {
    console.log("Income data updated:", incomeData);
    console.log("Is incomeData an array?", Array.isArray(incomeData));
    console.log("Income data length:", incomeData?.length);
  }, [incomeData]);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Income Overview Section */}
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => {
                console.log("Opening add income modal");
                setOpenAddIncomeModal(true);
              }}
            />
          </div>

          {/* Income Transactions List */}
          <div>
            <IncomeTransactionsList
              transactions={incomeData}
              onDelete={(transaction) => {
                console.log("Delete requested for:", transaction);
                handleDeleteIncome(transaction);
              }}
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => {
            console.log("Closing add income modal");
            setOpenAddIncomeModal(false);
          }}
          title="Add Income"
        >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Income;