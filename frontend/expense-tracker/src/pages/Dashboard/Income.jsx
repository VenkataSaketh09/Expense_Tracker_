import React, { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import IncomeTransactionsList from "../../components/income/IncomeTransactionsList";
import Modal from "../../components/Layouts/Modal";
import ConfirmDeleteModal from "../../components/Layouts/ConfirmDeleteModal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import { 
  useIncome, 
  useAddIncome, 
  useDeleteIncome, 
  useDownloadIncomeExcel 
} from "../../hooks/useQueries";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    item: null,
  });

  // React Query hooks
  const { data: incomeData = [], isLoading, error } = useIncome();
  const addIncomeMutation = useAddIncome();
  const deleteIncomeMutation = useDeleteIncome();
  const downloadExcelMutation = useDownloadIncomeExcel();

  const handleAddIncome = async (income) => {
    await addIncomeMutation.mutateAsync(income);
    setOpenAddIncomeModal(false);
  };

  const handleDeleteRequest = (item) => {
    setDeleteConfirmation({
      isOpen: true,
      item: item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation.item) return;
    await deleteIncomeMutation.mutateAsync(deleteConfirmation.item._id);
    setDeleteConfirmation({ isOpen: false, item: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, item: null });
  };

  const handleDownloadExcel = async () => {
    await downloadExcelMutation.mutateAsync();
  };

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Income">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout activeMenu="Income">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load income data</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-violet-700 text-white rounded-lg hover:bg-violet-800"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
            <AddIncomeForm 
              onAddIncome={handleAddIncome}
              isLoading={addIncomeMutation.isPending}
            />
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
          isLoading={deleteIncomeMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
};

export default Income;
