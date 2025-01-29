"use client";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { addProduct, fetchProducts } from '../reducer/ProductSlice';
import { addIndustry, fetchIndustries } from '../reducer/IndustrySlice';
import { createSupplier, updateSupplier } from "../reducer/SupplierSlice";
import { AppDispatch } from "../store/store";


type SupplierFormProps = {
  onCancel: () => void;
  onSave: (updatedData: any) => void;
  initialData?: any;
};

const SupplierForm: React.FC<SupplierFormProps> = ({ onCancel, onSave, initialData }) => {
  const dispatch = useDispatch<AppDispatch>();  
  
  const [productOptions, setProductOptions] = useState<{ value: string; label: string }[]>([]);
  const [industryOptions, setIndustryOptions] = useState<{ value: string; label: string }[]>([]);
  
  const [newProduct, setNewProduct] = useState("");
  const [newIndustry, setNewIndustry] = useState("");

  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    supplierName: "",
    product: [],
    class: "",
    contactNo: "",
    email: "",
    url: "",
    city: "",
    state: "",
    category: "",
    subCategory: "",
    industry: "",
    application: "",
  });

  const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar","Chhattisgarh", "Goa","Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram","Nagaland", "Odisha", "Punjab", "Rajasthan","Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh","Uttarakhand", "West Bengal" ];

    useEffect(() => {
      fetchProduct();
    }, []);

    useEffect(() => {
      fetchIndustry();
    }, []);

    

    /* useEffect(() => {
      if (initialData) {
        setFormData({
          ...initialData,
          product: initialData.product ? [initialData.product._id] : [], // Convert product to an array of ids
        });
      }
    }, [initialData]); */
    

    useEffect(() => {
      if (initialData) {
        setFormData((prevData) => ({
          ...prevData,
          ...initialData,
          product: Array.isArray(initialData.product) ? initialData.product.map((prod: { _id: any; }) => prod._id) : [], // Ensure product is an array
          industry: initialData.industry._id || "",
        }));
      }
    }, [initialData]);
    

  const handleProductDropdownClick = () => {
    if (!isProductDropdownOpen) {
        fetchProduct();
    }
    setProductDropdownOpen(!isProductDropdownOpen);
  };

  const fetchProduct = async () => {
    try {
        dispatch(fetchProducts())
          .then((resultAction) => {
            if (fetchProducts.fulfilled.match(resultAction)) {
              const response = resultAction.payload;
              
              const formattedOptions = response.map((option) => ({
                value: option.name,  
                label: option.name,            
              }));
              setProductOptions(formattedOptions);
            } else {
              console.error('Failed to fetch industry options:', resultAction.error);
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
                value: option?._id.toString(),  
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

  const handleAddProduct = () => {
    const productData = {
      name: newProduct,  
    };
  dispatch(addProduct(productData))
    .then((resultAction) => {
      if (addProduct.fulfilled.match(resultAction)) {
        setNewProduct(''); // Clear input field after adding
        fetchProduct();
      } else {
        console.error('Failed to add product:', resultAction.error);
      }
    });
  };

  const handleAddIndustry = () => {
    dispatch(addIndustry(newIndustry))
      .then((resultAction) => {
        if (addIndustry.fulfilled.match(resultAction)) {
          setNewIndustry(''); // Clear input field after adding
          fetchIndustry();
        } else {
          console.error('Failed to add Industry:', resultAction.error);
        }
    });
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
        await dispatch(updateSupplier({ id: initialData._id, data: updatedData })).unwrap();
        alert("Supplier updated successfully!");
        onSave(updatedData);
      } else {
        // Call createSupplier for new entry
        await dispatch(createSupplier(updatedData)).unwrap();
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
      <h2 className="text-xl font-bold mb-4">Supplier Form</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Supplier Name */}
        <div>
          <label className="block font-medium">Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Product */}
       
        <div>
  <label className="block font-medium mb-1">Product</label>
  
  {/* Product Dropdown */}
        {/* <div className="mb-4">
          <Select
            isMulti
            name="product"
            options={productOptions}
            value={productOptions.filter((option) =>
              formData.product.includes(option.value)
            )}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map((option) => option.value);
              setFormData({ ...formData, product: selectedValues });
            }}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Product"
          />
        </div> */}

        

        {/* New Product Input */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="New Product"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          />
          <button
            type="button"
            onClick={handleAddProduct}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
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
        {/* New Industry Input */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="New Industry"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          />
          <button
            type="button"
            onClick={handleAddIndustry}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
        </div>

         {/* Class */}

        <div>
          <label className="block font-medium">Class</label>
          <input
            type="text"
            name="class"
            value={formData.class}
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

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Sub-Category */}
        <div>
          <label className="block font-medium">Sub-Category</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Application */}
        <div>
          <label className="block font-medium">Application</label>
          <input
            type="text"
            name="application"
            value={formData.application}
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

export default SupplierForm;
