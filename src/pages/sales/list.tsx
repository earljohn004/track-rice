import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, List, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";

export const SalesList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "inventory.item",
        flex: 1,
        headerName: "Item",
        valueGetter: ({ row }) => row.inventory.item,
        minWidth: 150,
      },
      {
        field: "quantity",
        flex: 1,
        headerName: "Quantity",
        type: "number",
        minWidth: 140,
      },
      {
        field: "totalPrice",
        flex: 1,
        headerName: "Total Price",
        type: "number",
        minWidth: 140,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
