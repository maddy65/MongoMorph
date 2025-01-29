import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTableData, resetTableData } from "../reducer/tableSlice";
import { RootState, AppDispatch } from "../store/store";

interface Header {
  label: string;
  field: string;
}

interface TableProps {
  headers: Header[];
  apiUrl: string;
  onEdit: (rowData: any) => void; 
  setSelectedRowData: (rowData: any) => void;
}

const Table: React.FC<TableProps> = ({ headers, apiUrl, onEdit,setSelectedRowData  }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.table[apiUrl] || { data: [], loading: false, error: null }
  );
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchTableData({ apiUrl, tableKey: apiUrl }));

    return () => {
      dispatch(resetTableData(apiUrl));
    };
  }, [apiUrl, dispatch]);
  
  const getNestedValue = (row: any, field: string) => {
    const keys = field.split(".");
    let value = row;

    for (const key of keys) {
      if (Array.isArray(value)) {
        // Handle array case
        return value.map((item) => item[key] || "—").join(", ");
      } else if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        return "—";
      }
    }

    return value || "—";
  };


  const toggleSelectRow = (rowId: string, rowData: any) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows[rowId]) {
        const updatedSelection = { ...prevSelectedRows };
        delete updatedSelection[rowId];
        setTimeout(() => setSelectedRowData(null), 0);
        return updatedSelection;
      } else {
        setTimeout(() => setSelectedRowData(rowData), 0);
        return { [rowId]: true }; // Ensure only one row is selected at a time
      }
    });
  };
  
  

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-b-2">
          <tr>
            <th className="px-6 py-3 font-medium tracking-wider text-left">
              {/* Checkboxes or selection column */}
            </th>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 font-medium tracking-wider text-left border-r-2">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers.length + 1} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={headers.length + 1} className="px-6 py-4 text-center text-red-500">
                {typeof error === "string" ? error : "An error occurred"}
              </td>
            </tr>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((row: any, rowIndex: number) => (
              <tr key={row._id} className={`hover:bg-gray-100 ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-6 py-4 border-t border-gray-200">
                  <input
                    type="checkbox"
                    checked={!!selectedRows[row._id]}
                    onChange={() => toggleSelectRow(row._id, row)}
                  />
                </td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 border-t border-gray-200">
                    {getNestedValue(row, header.field)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="px-6 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
