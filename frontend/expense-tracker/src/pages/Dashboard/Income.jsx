import React from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import IncomeOverview from "../../components/income/IncomeOverview";
import Modal from "../../components/Layouts/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
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
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
      console.log(response.data)
    } catch (error) {
      console.log("Error in fetching income data", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddIncome = async (income) => {};
  const handleDeleteIncome = async (id) => {};
  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  },[]);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
        <Modal isOpen={openAddIncomeModal} onClose={()=>setOpenAddIncomeModal(false)} title="Add Income">
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </div>

        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
