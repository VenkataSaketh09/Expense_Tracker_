import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    onSelect(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Choose Icon
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="w-12 h-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-xl">{icon || "😊"}</span>
        </button>

        {showEmojiPicker && (
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
