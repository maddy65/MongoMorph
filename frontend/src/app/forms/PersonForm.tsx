"use client";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { createPerson, updatePerson } from "../reducer/PersonSlice";
import { fetchCompanyNames } from "../reducer/CompanySlice";
import { AppDispatch } from "../store/store";


type PersonFormProps = {
  onCancel: () => void;
  onSave: (updatedData: any) => void;
  initialData?: any;
};

const PersonForm: React.FC<PersonFormProps> = ({ onCancel, onSave, initialData }) => {
  
  const dispatch = useDispatch<AppDispatch>();  
  const [companyOptions, setcompanyOptions] = useState<{ value: string; label: string }[]>([]);
  
  const [formData, setFormData] = useState({
    name :"",
    companyName: "",
    designations : "",
    contactNo : "",
    emailOffice : "",
    emailPersonal : "",
    pastCompanies: "",
    linkdinURL: "",
    facebookProfile : "",
    requirment: "",
    behaviourlPOV : "",
    followUp : "",
    leadNumber : "",
    incharge : "",
    remarks : "",
  });

  useEffect(() => {
    fetchCompany();
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
        dispatch(fetchCompanyNames())
          .then((resultAction) => {
            if (fetchCompanyNames.fulfilled.match(resultAction)) {
              const response = resultAction.payload;
              const formattedOptions = response.map((option: { _id: { toString: () => any; }; companyName: any; }) => ({
                value: option.companyName,  
                label: option.companyName,            
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
    try{
      const updatedData = { ...formData };
      if (initialData?._id) {
        // Call updateSupplier for edit
        await dispatch(updatePerson({ id: initialData._id, data: updatedData })).unwrap();
        onSave(updatedData);
      } else {
        // Call createSupplier for new entry
        await dispatch(createPerson(updatedData)).unwrap();
        onSave(updatedData);
      }
    } catch (error) {
      console.error("Failed to save person:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Person Form</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Supplier Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Company</label>
          <div className="mb-4">
            <Select
              name="company"
              options={companyOptions}
              value={companyOptions.find((option) => option.value === formData.companyName) || null}
              onChange={(selectedOption) => {
                setFormData({ ...formData, companyName: selectedOption?.value || "" });
              }}
              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Select Company"
            />
          </div>
        </div>

     

        <div>
          <label className="block font-medium">Designations</label>
          <input
            type="text"
            name="designations"
            value={formData.designations}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
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
          <label className="block font-medium">Email Office</label>
          <input
            type="text"
            name="emailOffice"
            value={formData.emailOffice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

    

        <div>
          <label className="block font-medium">Email Personal</label>
          <input
            type="text"
            name="emailPersonal"
            value={formData.emailPersonal}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
    
        <div>
          <label className="block font-medium">Past Companies</label>
          <input
            type="text"
            name="pastCompanies"
            value={formData.pastCompanies}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        

        {/* City */}

    
        <div>
          <label className="block font-medium">Linkdin Url</label>
          <input
            type="text"
            name="linkdinURL"
            value={formData.linkdinURL}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

       

        <div>
          <label className="block font-medium">Facebook Profile</label>
          <input
            type="text"
            name="facebookProfile"
            value={formData.facebookProfile}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Requirment</label>
          <input
            type="text"
            name="requirment"
            value={formData.requirment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

      
    
   

        <div>
          <label className="block font-medium">Behaviourl POV</label>
          <input
            type="text"
            name="behaviourlPOV"
            value={formData.behaviourlPOV}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Follow UP</label>
          <input
            type="text"
            name="followUp"
            value={formData.followUp}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Lead No.</label>
          <input
            type="text"
            name="leadNumber"
            value={formData.leadNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">InCharge</label>
          <input
            type="text"
            name="incharge"
            value={formData.incharge}
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
