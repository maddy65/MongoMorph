"use client";

import { useState } from "react";

interface TabPanelProps {
  tabs: string[];
  content: React.ReactNode[];
  toolbar: React.ReactNode;
  onTabChange: (index: number) => void; // Add onTabChange as a prop
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs, content, toolbar, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange(index); // Call the onTabChange function when a tab is clicked
  };

  return (
    <div className="flex w-full">
      {/* Left Panel (Tabs) */}
      <div className="w-1/5 bg-gray-100 p-4">
        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          {tabs.map((tab, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => handleTabClick(index)}
                className={`inline-flex items-center px-6 py-3 text-gray-700 rounded-lg w-full transition-colors duration-300 ${
                  activeTab === index
                    ? "bg-blue-700 dark:bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel (Main Content Area) */}
      <div className="w-4/5 p-4" style={{ margin: "2px" }}>
        {/* Header */}
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {tabs[activeTab]}
          </h3>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-50 p-4 mb-4 rounded-lg shadow-md">
          {toolbar}
        </div>

        {/* Table or Content */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default TabPanel;
