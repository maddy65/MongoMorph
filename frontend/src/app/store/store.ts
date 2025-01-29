import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../reducer/tableSlice";
import productSlicer from "../reducer/ProductSlice";
import IndustrySlicer from "../reducer/IndustrySlice";
import SupplierSlicer from "../reducer/SupplierSlice";
import CompanySlicer from "../reducer/CompanySlice";
import PersonSlicer from "../reducer/PersonSlice";
import ProjectSlicer from "../reducer/ProjectSlice"

const store = configureStore({
  reducer: {
    table: tableReducer,
    product : productSlicer,
    industry : IndustrySlicer,
    supplier : SupplierSlicer,
    company : CompanySlicer,
    person : PersonSlicer,
    project : ProjectSlicer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
