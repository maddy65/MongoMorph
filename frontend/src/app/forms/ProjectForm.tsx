"use client";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { createProject, updateProject } from "../reducer/ProjectSlice";
import { fetchCompanyNamesAndCin } from "../reducer/CompanySlice";
import { AppDispatch } from "../store/store";
import { fetchIndustries } from "../reducer/IndustrySlice";
import {STATES} from "../../constant/States";


type ProjectFormProps = {
  onCancel: () => void;
  onSave: (updatedData: any) => void;
  initialData?: any;
};



const PersonForm: React.FC<ProjectFormProps> = ({ onCancel, onSave, initialData }) => {
  
  const dispatch = useDispatch<AppDispatch>();  
  const [companyOptions, setcompanyOptions] = useState<{ value: string; label: string , cin: string}[]>([]);
  const [industryOptions, setIndustryOptions] = useState<{ value: string; label: string }[]>([]);
  
  const [formData, setFormData] = useState({
    companyName: "",
    cin: "",
    projectName : "",
    projectType : "",
    implimentationStage : "",
    costLACS : "",
    LatestUpdate: "",
    industry: "",
    ownership : "",
    location: "",
    state : "",
    promoterAddress : "",
    contactNo : "",
    contactPerson : "",
    email : "",
    remarks : "",
    url : "",
  });

 

  useEffect(() => {
    fetchCompany();
  }, []);
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
    
  const fetchCompany = async () => {
    try {
        dispatch(fetchCompanyNamesAndCin())
          .then((resultAction) => {
            if (fetchCompanyNamesAndCin.fulfilled.match(resultAction)) {
              const response = resultAction.payload;
              const formattedOptions = response.map((option: { _id: { toString: () => any; }; companyName: any; cin: any; }) => ({
                value: option.companyName,  
                label: option.companyName,    
                cin: option.cin
                
              }));
              setcompanyOptions(formattedOptions);
            } else {
              console.error('Failed to fetch company options:', resultAction.error);
            }
          });
      } catch (error) {
        console.error('API call error:', error);
      }
  };

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
        await dispatch(updateProject({ id: initialData._id, data: updatedData })).unwrap();
        alert("Project updated successfully!");
        onSave(updatedData);
      } else {
        await dispatch(createProject(updatedData)).unwrap();
        alert("Project added successfully!");
        onSave(updatedData);
      }
    } catch (error) {
      console.error("Failed to save Project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Project Form</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Company</label>
          <div className="mb-4">
            <Select
              name="company"
              options={companyOptions}
              value={companyOptions.find((option) => option.value === formData.companyName) || null}
              onChange={(selectedOption) => {
                setFormData({ ...formData, companyName: selectedOption?.value || "", cin:selectedOption?.cin || ""  });
              }}
           

              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Select Company"
            />
          </div>
        </div>


     
     

        <div>
          <label className="block font-medium">CIN</label>
          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            
            readOnly
          />
        </div>
        
        
        {/* Additional Fields */}
        

        <div>
          <label className="block font-medium">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

    

        <div>
          <label className="block font-medium">Project Type</label>
          <input
            type="text"
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

    

        <div>
          <label className="block font-medium">Implimentation Stage</label>
          <input
            type="text"
            name="implimentationStage"
            value={formData.implimentationStage}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

    
        <div>
          <label className="block font-medium">Cost LACS</label>
          <input
            type="text"
            name="costLACS"
            value={formData.costLACS}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>


        <div>
          <label className="block font-medium">Latest Update</label>
          <input
            type="text"
            name="LatestUpdate"
            value={formData.LatestUpdate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

    

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
       

        <div>
          <label className="block font-medium">Ownership</label>
          <input
            type="text"
            name="ownership"
            value={formData.ownership}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>


        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

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
          <label className="block font-medium">Project Address</label>
          <input
            type="text"
            name="promoterAddress"
            value={formData.promoterAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>


        
        <div>
          <label className="block font-medium">Contact No.</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>


   

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>


        <div>
          <label className="block font-medium">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
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

export default PersonForm;
