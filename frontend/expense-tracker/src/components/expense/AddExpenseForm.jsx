import React from "react";
import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../Inputs/EmojiPickerPopup";
import toast from "react-hot-toast";

const AddExpenseForm = ({ onAddExpense, isLoading = false }) => {
  const [expense, setExpense] = useState({
    icon: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (key, value) =>
    setExpense({
      ...expense,
      [key]: value,
    });

  const handleSubmit = () => {
    // Basic validation with toast messages
    if (!expense.category.trim()) {
      toast.error("Please enter an expense category");
      return;
    }
    if (!expense.amount || parseFloat(expense.amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }
    if (!expense.date) {
      toast.error("Please select a date");
      return;
    }

    // Check if date is not in the future
    const selectedDate = new Date(expense.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today

    if (selectedDate > today) {
      toast.error("Expense date cannot be in the future");
      return;
    }

    onAddExpense(expense);
  };

  return (
    <div className="space-y-6">
      {/* Emoji Picker Section */}
      <div>
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
          disabled={isLoading}
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <Input
          type="text"
          placeholder="Shopping, Dining, Travel..."
          value={expense.category}
          onChange={(e) => handleChange("category", e.target.value)}
          label="Expense Category"
          disabled={isLoading}
        />

        <Input
          type="number"
          placeholder="0"
          value={expense.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          label="Amount"
          disabled={isLoading}
        />

        <Input
          type="date"
          placeholder="dd/mm/yyyy"
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
          label="Date"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          onClick={handleSubmit}
          disabled={
            isLoading ||
            !expense.category.trim() || 
            !expense.amount || 
            !expense.date
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding Expense...
            </div>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
