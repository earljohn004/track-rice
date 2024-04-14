import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";
import { getFormattedDate } from "../../utils/dateUtils";

export const SalesList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "off",
    },
    filters: {
      initial: [
        {
          field: "createdAt",
          operator: "eq",
          value: getFormattedDate(),
        },
      ],
    },
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "inventory.item",
        flex: 1,
        headerName: "Item",
        valueGetter: ({ row }) => row.inventory.item,
        minWidth: 120,
      },
      {
        field: "quantity",
        headerName: "Qty",
        type: "number",
        minWidth: 120,
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
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid hideFooter {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
