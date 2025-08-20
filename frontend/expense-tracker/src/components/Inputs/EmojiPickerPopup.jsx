import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect, disabled = false }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    if (!disabled) {
      onSelect(emojiObject.emoji);
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="mb-4">
      <label className={`block text-sm font-semibold mb-2 ${
        disabled ? 'text-gray-400' : 'text-gray-700'
      }`}>
        Choose Icon
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setShowEmojiPicker(!showEmojiPicker)}
          className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-colors ${
            disabled 
              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60' 
              : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
          }`}
          disabled={disabled}
        >
          <span className="text-xl">{icon || "😊"}</span>
        </button>

        {showEmojiPicker && !disabled && (
          <div className="absolute top-14 left-0 z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
              searchDisabled={false}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerPopup;
