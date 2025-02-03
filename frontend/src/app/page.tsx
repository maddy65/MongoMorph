"use client";

import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from "./component/TabPanel"; // Import TabPanel component
import Toolbar from "./component/Toolbar"; // Import Toolbar component
import SupplierForm from "./forms/SupplierForm";
import CompanyForm from "./forms/CompanyForm";
import PersonForm from "./forms/PersonForm";
import ProjectForm from "./forms/ProjectForm";
import Table from "./component/Table"; // Import Table component
import { deleteSupplier } from "../../src/app/reducer/SupplierSlice";
import { fetchTableData, resetTableData } from "../../src/app/reducer/tableSlice";
import { AppDispatch } from "../../src/app/store/store";
import { deleteCompany } from "./reducer/CompanySlice";
import { deletePerson } from "./reducer/PersonSlice";
import { deleteProject } from "./reducer/ProjectSlice";


// Define the tabs and their corresponding headers and API URLs
const tabs = ["Supplier", "Project", "Person", "Company"];

type TabConfig = {
  [key: string]: {
    headers: { label: string; field: string }[];
    apiUrl: string;
  };
};


const tabConfig: TabConfig = {
  Supplier: {
    headers: [
      { label: "Supplier Name", field: "supplierName" },
      { label: "Product", field: "product.name" }, // Nested field for product name
      { label: "Class", field: "class" },
      { label: "Contact Number", field: "contactNo" },
      { label: "Email", field: "email" },
      { label: "URL", field: "url" }, // Nested field for product name
      { label: "City", field: "city" },
      { label: "State", field: "state" },
      { label: "Category", field: "category" },
      { label: "Sub Category", field: "subCategory" },
      { label: "Industry", field: "industry.name" },
      { label: "Application", field: "application" },
    ],
    apiUrl: "/api/suppliers",
  },
  Project: {
    headers: [
      { label: "Company", field: "companyName" },
      { label: "CIN", field: "cin" }, 
      { label: "Project Name", field: "projectName" },
      { label: "Project Type", field: "projectType" },
      { label: "Implimentation Stage", field: "implimentationStage" }, 
      { label: "Cost LACS", field: "costLACS" },
      { label: "Latest Updates", field: "LatestUpdate" },
      { label: "Industry", field: "industry.name" },
      { label: "Ownership", field: "ownership" },
      { label: "Location", field: "location" },
      { label: "State", field: "state" },
      { label: "Promoter Adress", field: "promoterAddress" },
      { label: "Contact Number", field: "contactNo" },
      { label: "Contact Person", field: "contactPerson" },
      { label: "Email Address", field: "email" },
      { label: "Remarks", field: "remarks" },
      { label: "URL", field: "url" },
     
    ],
    apiUrl: "/api/projects",
  },
  Person: {
    headers: [
      { label: "Name", field: "name" },
      { label: "Company", field: "companyName" },
      { label: "Designations Details", field: "designations" },
      { label: "Phone Number", field: "contactNo" },
      { label: "Email Office", field: "emailOffice" },
      { label: "Email Personal", field: "emailPersonal" },
      { label: "Past Companies", field: "pastCompanies" }, // Nested field for product name
      { label: "Linkdin URL", field: "linkdinURL" },
      { label: "FaceBook Profile", field: "facebookProfile" },
      { label: "Requirment", field: "requirment" },
      { label: "Behaviourl POV", field: "behaviourlPOV" },
      { label: "Follow Up", field: "followUp" },
      { label: "Lead Number", field: "leadNumber" },
      { label: "Incharge", field: "incharge" },
      { label: "Remarks", field: "remarks" },
    ],
    apiUrl: "/api/persons",
  },
  Company: {
    headers: [
      { label: "Company Name", field: "companyName" },
      { label: "CIN", field: "cin" }, // Nested field for product name
      { label: "Industry", field: "industry.name" },
      { label: "Scale", field: "scale" },
      { label: "Email", field: "email" },
      { label: "Contact Number", field: "contactNo" },
      { label: "URL", field: "url" }, // Nested field for product name
      { label: "City", field: "city" },
      { label: "State", field: "state" },
      { label: "Web Presence", field: "webPresence" },
      { label: "Address", field: "address" },
      { label: "Communication Remarks", field: "communicationRemarks" },
      { label: "Filled By", field: "filledBy" },
      
      
    ],
    apiUrl: "/api/companies",
  },
};

const Page: React.FC = () => {
  const [activeViews, setActiveViews] = useState<Record<string, "table" | "form">>(
    tabs.reduce((acc, tab) => ({ ...acc, [tab]: "table" }), {})
  );
  const [activeTab, setActiveTab] = useState(0);

  const [selectedRowData, setSelectedRowData] = useState<any | null>(null); // New state for selected row

  const dispatch = useDispatch<AppDispatch>();  
  const supplierLoading = useSelector((state: any) => state.supplier.loading);


  const switchToForm = (tab: string) => {
    setActiveViews((prev) => ({ ...prev, [tab]: "form" }));
  };

  const switchToTable = (tab: string) => {
    setActiveViews((prev) => ({ ...prev, [tab]: "table" }));
  };

  const handleEdit = (tab: string, rowData: any) => {
    setSelectedRowData(rowData); // Save selected row data
    switchToForm(tab);
  };

  const handleAdd = (tab: string) => {
    setSelectedRowData(null); // Reset the form for adding a new row
    switchToForm(tab);
  };

  const handleCancel = (tab: string) => {
    switchToTable(tab);
  };

  const handleSave = (tab: string, updatedData: any) => {
    // Save logic here (e.g., API call to save updated data)
    alert(`Data saved for ${tab}`);
    switchToTable(tab);
  };

  const handleDelete = async (tab: string) => {
    if (tab === "Supplier" && selectedRowData?._id) {
      try {
        await dispatch(deleteSupplier(selectedRowData._id)).unwrap();
        alert("Supplier deleted successfully.");
        setSelectedRowData(null); // Reset selected row after deletion
        const apiUrl = "/api/suppliers";
        refreshTableData(tab,apiUrl);
      } catch (error) {
        alert(`Failed to delete supplier: ${error}`);
      }
    }else if (tab === "Company" && selectedRowData?._id) {
      try {
        await dispatch(deleteCompany(selectedRowData._id)).unwrap();
        alert("Company deleted successfully.");
        setSelectedRowData(null); // Reset selected row after deletion
        const apiUrl = "/api/companies";
        refreshTableData(tab,apiUrl);
      } catch (error) {
        alert(`Failed to delete supplier: ${error}`);
      }
    }
    else if (tab === "Person" && selectedRowData?._id) {
      try {
        await dispatch(deletePerson(selectedRowData._id)).unwrap();
        alert("Person deleted successfully.");
        setSelectedRowData(null); // Reset selected row after deletion
        const apiUrl = "/api/persons";
        refreshTableData(tab,apiUrl);
      } catch (error) {
        alert(`Failed to delete persons: ${error}`);
      }
    }
    else if (tab === "Project" && selectedRowData?._id) {
      try {
        await dispatch(deleteProject(selectedRowData._id)).unwrap();
        alert("Person deleted successfully.");
        setSelectedRowData(null); // Reset selected row after deletion
        const apiUrl = "/api/projects";
        refreshTableData(tab,apiUrl);
      } catch (error) {
        console.log("Deleted")
      }
    }
  };

  const refreshTableData = async (tab: string, apiUrl:string) => {
    try{
      await dispatch(fetchTableData({ apiUrl, tableKey: apiUrl }));
    }catch (error) {
      console.log("Deleted")
    }
  }

  const tableData = (tab: string) => {
    const { headers, apiUrl } = tabConfig[tab] || {};
    if (!headers || !apiUrl) {
      return <div>No table data defined for {tab}</div>;
    }

    return (
      <Table
        headers={headers}
        apiUrl={apiUrl}
        onEdit={(rowData) => handleEdit(tab, rowData)}
        setSelectedRowData={setSelectedRowData} // Pass the function to set selected row data
      />
    );
  };

  const formData = (tab: string) => {
    if (tab === "Supplier") {
      return (
        <SupplierForm
          initialData={selectedRowData} // Pass the selected row data to the form
          onCancel={() => handleCancel(tab)}
          onSave={(updatedData) => handleSave(tab, updatedData)}
        />
      );
    } else if( tab === "Company"){
      return (
        <CompanyForm
          initialData={selectedRowData} // Pass the selected row data to the form
          onCancel={() => handleCancel(tab)}
          onSave={(updatedData) => handleSave(tab, updatedData)}
          />
      )
    } else if( tab === "Person"){
      return (
        <PersonForm
          initialData={selectedRowData} // Pass the selected row data to the form
          onCancel={() => handleCancel(tab)}
          onSave={(updatedData) => handleSave(tab, updatedData)}
          />
      )
    }
    else if( tab === "Project"){
      return (
        <ProjectForm
          initialData={selectedRowData} // Pass the selected row data to the form
          onCancel={() => handleCancel(tab)}
          onSave={(updatedData) => handleSave(tab, updatedData)}
          />
      )
    }
    // Add other forms for other tabs here
    return <div>No form defined for {tab}</div>;
  };

  const content = tabs.map((tab) =>
    activeViews[tab] === "table" ? tableData(tab) : formData(tab)
  );

  const isFormOpen = tabs.some((tab) => activeViews[tab] !== "table");

  /* const handleTabChange = (newActiveTab: string) => {
  
    setActiveViews((prev) =>
      tabs.reduce(
        (acc, tab) => ({ ...acc, [tab]: tab === newActiveTab ? "table" : "table" }),
        {}
      )
    );
    setSelectedRowData(null); // Reset selected row
  }; */

  const handleTabChange = (newActiveTabIndex: number) => {
    setActiveTab(newActiveTabIndex); 
    const newActiveTab = tabs[newActiveTabIndex];
    setActiveViews((prev) =>
      tabs.reduce(
        (acc, tab) => ({ ...acc, [tab]: tab === newActiveTab ? "table" : "table" }),
        {}
      )
    );
    setSelectedRowData(null); // Reset selected row
  };
  
  

  return (
    <div className="flex h-screen">
      <TabPanel
        tabs={tabs}
        content={content}
        onTabChange={handleTabChange}
        toolbar={
          !isFormOpen && ( // Hide the toolbar when a form is open
            <Toolbar
            onAdd={() => handleAdd(tabs[activeTab])} // Use the current active tab
            onEdit={() => handleEdit(tabs[activeTab], selectedRowData)} 
            onDelete={() => handleDelete(tabs[activeTab])}
            isEditDisabled={!selectedRowData}
            isDeleteDisabled={!selectedRowData}
            />
          )
        }
      />
    </div>
  );
};

export default Page;
