"use client";
import React from "react";

interface ToolbarProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isEditDisabled: boolean;
  isDeleteDisabled: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAdd, onEdit, onDelete, isEditDisabled, isDeleteDisabled  }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add
      </button>
      <button
        onClick={onEdit}
        disabled={isEditDisabled}
        className="px-4 py-2 bg-yellow-600 text-white rounded"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        disabled={isDeleteDisabled}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default Toolbar;
