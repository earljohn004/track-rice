import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const InventoryList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "off"
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "view",
        headerName: "View",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 5,
      },
      {
        field: "item",
        flex: 1,
        headerName: "Item",
        minWidth: 130,
      },
      {
        field: "retailPriceKg",
        flex: 1,
        headerName: "Retail Price (kg)",
        type: "number",
        minWidth: 140,
      },
      {
        field: "retailPriceSack",
        flex: 1,
        headerName: "Retail Price (sack)",
        type: "number",
        minWidth: 140,
      },
      {
        field: "wholesalePrice",
        flex: 1,
        headerName: "Wholesale Price",
        type: "number",
        minWidth: 140,
      },
      {
        field: "markupPrice",
        flex: 1,
        headerName: "MarkUp Price",
        type: "number",
        minWidth: 150,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created",
        minWidth: 250,
        renderCell: function render({ value }) {
          return (
            <>
              <DateField value={new Date(value)} />
            </>
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
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
