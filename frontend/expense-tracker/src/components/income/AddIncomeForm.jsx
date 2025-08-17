import React from "react";
import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../Inputs/EmojiPickerPopup";
import toast from "react-hot-toast";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    icon: "",
    source: "",
    amount: "",
    date: "",
  });

  const handleChange = (key, value) =>
    setIncome({
      ...income,
      [key]: value,
    });

  const handleSubmit = () => {
    // Basic validation with toast messages
    if (!income.source.trim()) {
      toast.error("Please enter an income source");
      return;
    }
    if (!income.amount || parseFloat(income.amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }
    if (!income.date) {
      toast.error("Please select a date");
      return;
    }

    // Check if date is not in the future
    const selectedDate = new Date(income.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today

    if (selectedDate > today) {
      toast.error("Income date cannot be in the future");
      return;
    }

    onAddIncome(income);
  };

  return (
    <div className="space-y-6">
      {/* Emoji Picker Section */}
      <div>
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <Input
          type="text"
          placeholder="Freelance, Salary, etc"
          value={income.source}
          onChange={(e) => handleChange("source", e.target.value)}
          label="Income Source"
        />

        <Input
          type="number"
          placeholder="0"
          value={income.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          label="Amount"
        />

        <Input
          type="date"
          placeholder="dd/mm/yyyy"
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
          label="Date"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          onClick={handleSubmit}
          disabled={!income.source.trim() || !income.amount || !income.date}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
