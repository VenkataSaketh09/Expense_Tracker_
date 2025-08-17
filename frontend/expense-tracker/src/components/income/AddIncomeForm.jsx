import React from "react";
import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../Inputs/EmojiPickerPopup";
import toast from "react-hot-toast";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    icon: "💰",
    source: "",
    amount: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    console.log(`Updating ${key}:`, value);
    setIncome({
      ...income,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    console.log("Form submission started with data:", income);
    
    // Basic validation with toast messages
    if (!income.source.trim()) {
      console.log("Validation failed: No income source");
      toast.error("Please enter an income source");
      return;
    }
    if (!income.amount || parseFloat(income.amount) <= 0) {
      console.log("Validation failed: Invalid amount");
      toast.error("Please enter a valid amount greater than 0");
      return;
    }
    if (!income.date) {
      console.log("Validation failed: No date selected");
      toast.error("Please select a date");
      return;
    }

    // Check if date is not in the future
    const selectedDate = new Date(income.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today

    if (selectedDate > today) {
      console.log("Validation failed: Future date");
      toast.error("Income date cannot be in the future");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Validation passed, calling onAddIncome with:", income);
      await onAddIncome(income);
      
      // Reset form after successful submission
      setIncome({
        icon: "💰",
        source: "",
        amount: "",
        date: "",
      });
      console.log("Form reset after successful submission");
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Emoji Picker Section */}
      <div>
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => {
            console.log("Emoji selected:", selectedIcon);
            handleChange("icon", selectedIcon);
          }}
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
          min="0"
          step="0.01"
        />

        <Input
          type="date"
          placeholder="dd/mm/yyyy"
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
          label="Date"
          max={new Date().toISOString().split('T')[0]} // Prevent future dates
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          onClick={handleSubmit}
          disabled={!income.source.trim() || !income.amount || !income.date || isSubmitting}
        >
          {isSubmitting ? "Adding Income..." : "Add Income"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;