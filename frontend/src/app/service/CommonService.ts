import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});


export const fetchGridData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);  
    return response.data;  
  } catch (error) {
    throw new Error('Failed to fetch data: ' ); //error.message);
  }
};

export const API_POST_PRODUCT = <T>(data: T)  => {
  return axiosInstance.post('/api/products', data); // Use axiosInstance for consistency
};

export const API_GET_PRODUCT = () => {
  return axiosInstance.get('/api/products');
};

export const API_POST_INDUSTRY = <T>(data: T)  => {
  return axiosInstance.post('/api/industries', data);
};

export const API_GET_INDUSTRY = () => {
  return axiosInstance.get('/api/industries');
};

/** Supplier */

export const API_GET_SUPPLIER= () => {
  return axiosInstance.get("/api/supplier");
}

export const API_POST_SUPPLIER = <T>(data: T) => {
  return axiosInstance.post("/api/suppliers",data);
}

export const API_GET_SUPPLIER_FROM_ID = <T>(id: T) => {
  return axiosInstance.get("/api/suppliers/"+id);
}

export const API_UPDATE_SUPPLIER = <T>(data: T, id: T) => {
  return axiosInstance.put("/api/suppliers/"+id, data);
}

export const API_DELETE_SUPPLIER = <T>(id: T) => {
  return axiosInstance.delete("/api/suppliers/"+id);
} 


/** Companies */


export const API_GET_COMPANIES= () => {
  return axiosInstance.get("/api/companies");
}

export const API_POST_COMPANIES = <T>(data: T) => {
  return axiosInstance.post("/api/companies",data);
}

export const API_GET_COMPANIES_FROM_ID = <T>(id: T) => {
  return axiosInstance.get("/api/companies/"+id);
}

export const API_UPDATE_COMPANIES = <T>(data: T, id: T) => {
  return axiosInstance.put("/api/companies/"+id, data);
}

export const API_DELETE_COMPANIES = <T>(id: T) => {
  return axiosInstance.delete("/api/companies/"+id);
} 

export const API_GET_COMPANIES_NAME = () => {
  return axiosInstance.get("/api/companies/names");
} 

export const API_GET_COMPANIES_NAME_AND_CIN = () => {
  return axiosInstance.get("/api/companies/names-and-cin");
};


/** Person */

export const API_GET_PERSON = () => {
  return axiosInstance.get("/api/persons");
}

export const API_POST_PERSON= <T>(data: T) => {
  return axiosInstance.post("/api/persons",data);
}

export const API_GET_PERSON_FROM_ID = <T>(id: T) => {
  return axiosInstance.get("/api/persons/"+id);
}

export const API_UPDATE_PERSON = <T>(data: T, id: T) => {
  return axiosInstance.put("/api/persons/"+id, data);
}

export const API_DELETE_PERSON = <T>(id: T) => {
  return axiosInstance.delete("/api/persons/"+id);
} 





/** Projects */

export const API_GET_PROJECTS = () => {
  return axiosInstance.get("/api/projects");
}

export const API_POST_PROJECTS = <T>(data: T) => {
  return axiosInstance.post("/api/projects",data);
}

export const API_GET_PROJECTS_FROM_ID = <T>(id: T) => {
  return axiosInstance.get("/api/projects/"+id);
}

export const API_UPDATE_PROJECTS = <T>(data: T, id: T) => {
  return axiosInstance.put("/api/projects/"+id, data);
}

export const API_DELETE_PROJECTS = <T>(id: T) => {
  return axiosInstance.delete("/api/projects/"+id);
} 

