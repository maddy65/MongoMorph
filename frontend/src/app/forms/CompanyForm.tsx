"use client";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { addIndustry, fetchIndustries } from '../reducer/IndustrySlice';
import { createCompany, updateCompany } from "../reducer/CompanySlice";
import { AppDispatch } from "../store/store";
import {STATES} from "../../constant/States";


type CompanyFormProps = {
  onCancel: () => void;
  onSave: (updatedData: any) => void;
  initialData?: any;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ onCancel, onSave, initialData }) => {
  const dispatch = useDispatch<AppDispatch>();  
  const [industryOptions, setIndustryOptions] = useState<{ value: string; label: string }[]>([]);
  
  const [formData, setFormData] = useState({
    companyName: "",
    cin: "",
    industry: "",
    contactNo: "",
    email:"",
    scale: "",
    url: "",
    city: "",
    state: "",
    webPresence: "",
    address: "",
    communicationRemarks: "",
    filledBy: "",
  });

  useEffect(() => {
    fetchIndustry();
  }, []);

    
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData
      }));
    }
  }, [initialData]);
    
  const fetchIndustry = async () => {
    try {
        dispatch(fetchIndustries())
          .then((resultAction) => {
            if (fetchIndustries.fulfilled.match(resultAction)) {
              const response = resultAction.payload;
              
              const formattedOptions = response.map((option: { _id: { toString: () => any; }; name: any; }) => ({
                value: option._id.toString(),  
                label: option.name,            
              }));
              setIndustryOptions(formattedOptions);
            } else {
              console.error('Failed to fetch industry options:', resultAction.error);
            }
          });
      } catch (error) {
        console.error('API call error:', error);
      }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const updatedData = { ...formData };
      if (initialData?._id) {
        // Call updateSupplier for edit
        await dispatch(updateCompany({ id: initialData._id, data: updatedData })).unwrap();
        alert("Supplier updated successfully!");
        onSave(updatedData);
      } else {
        // Call createSupplier for new entry
        await dispatch(createCompany(updatedData)).unwrap();
        alert("Supplier added successfully!");
        onSave(updatedData);
      }
      /* const updatedData = { ...formData };
      await dispatch(createSupplier(updatedData)).unwrap();
      onSave(updatedData);  */
    } catch (error) {
      console.error("Failed to save supplier:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Company Form</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Supplier Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">CIN</label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Industry */}
        <div>
          <label className="block font-medium mb-1">Industry</label>
          <div className="mb-4">
            <Select
              name="industry"
              options={industryOptions}
              value={industryOptions.find((option) => option.value === formData.industry) || null}
              onChange={(selectedOption) => {
                setFormData({ ...formData, industry: selectedOption?.value || "" });
              }}
              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Select Industry"
            />
          </div>
        </div>
        
        {/* Additional Fields */}
        

        <div>
          <label className="block font-medium">Contact</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="text"
            name="scale"
            value={formData.scale}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* State */}
        <div>
          <label className="block font-medium">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select State</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Web Presence</label>
          <input
            type="text"
            name="webPresence"
            value={formData.webPresence}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Communication Remarks</label>
          <input
            type="text"
            name="communicationRemarks"
            value={formData.communicationRemarks}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Filled By</label>
          <input
            type="text"
            name="filledBy"
            value={formData.filledBy}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

      </div>



      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
