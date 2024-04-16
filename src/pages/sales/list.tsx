import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";
import { useEffect, useMemo, useState } from "react";
import { getFormattedDate, getFormattedTime } from "../../utils/dateUtils";
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
        headerName: "Item",
        valueGetter: ({ row }) => row.inventory.item,
        minWidth: 120,
      },
      {
        field: "quantity",
        headerName: "Qty",
        type: "number",
        minWidth: 100,
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        type: "number",
        minWidth: 120,
      },
      {
        field: "addedBy",
        headerName: "Added By",
        minWidth: 130,
      },
      {
        field: "createdAt",
        headerName: "Created",
        minWidth: 120,
      },
      {
        field: "timestamp",
        headerName: "Time",
        minWidth: 100,
        renderCell: function render({ value }) {
          return getFormattedTime(value);
        },
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
