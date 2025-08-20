import React, { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import ExpenseTransactionsList from "../../components/expense/ExpenseTransactionsList";
import Modal from "../../components/Layouts/Modal";
import ConfirmDeleteModal from "../../components/Layouts/ConfirmDeleteModal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import { 
  useExpenses, 
  useAddExpense, 
  useDeleteExpense, 
  useDownloadExpenseExcel 
} from "../../hooks/useQueries";

const Expense = () => {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    item: null,
  });

  // React Query hooks
  const { data: expenseData = [], isLoading, error } = useExpenses();
  const addExpenseMutation = useAddExpense();
  const deleteExpenseMutation = useDeleteExpense();
  const downloadExcelMutation = useDownloadExpenseExcel();

  const handleAddExpense = async (expense) => {
    await addExpenseMutation.mutateAsync(expense);
    setOpenAddExpenseModal(false);
  };

  const handleDeleteRequest = (item) => {
    setDeleteConfirmation({
      isOpen: true,
      item: item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation.item) return;
    await deleteExpenseMutation.mutateAsync(deleteConfirmation.item._id);
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
      <DashboardLayout activeMenu="Expense">
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
      <DashboardLayout activeMenu="Expense">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load expense data</p>
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
            <AddExpenseForm 
              onAddExpense={handleAddExpense}
              isLoading={addExpenseMutation.isPending}
            />
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
          isLoading={deleteExpenseMutation.isPending}
        />
      </div>
    </DashboardLayout>
  );
};

export default Expense;
