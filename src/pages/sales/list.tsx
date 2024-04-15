import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";
import { useEffect, useMemo, useState } from "react";
import { getFormattedDate } from "../../utils/dateUtils";
import { Typography } from "@mui/material";

export const SalesList = () => {
  const [totalSales, setTotalSales] = useState<number>(0);

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

  useEffect(() => {
    if (dataGridProps.rows.length > 0) {
      let total = 0;
      dataGridProps.rows.map((item) => {
        total += parseFloat(item.totalPrice);
      });
      setTotalSales(total);
    }
  }, [dataGridProps]);

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
      <Typography
        sx={{ marginTop: 2, marginBottom: 4 }}
        align="right"
        variant="h4"
      >
        Total Sales: {totalSales}{" "}
      </Typography>
      <DataGrid hideFooter {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
