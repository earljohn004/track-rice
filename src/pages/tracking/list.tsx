import { Divider, List, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import { useEffect, useMemo, useState } from "react";

export const TrackingList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "off",
    },
  });

  const [totalSales, setTotalSales] = useState<number>(0);

  useEffect(() => {
    if(dataGridProps.rows.length > 0){
        let total = 0;
        dataGridProps.rows.map((item)=>{
            total += parseFloat(item.totalSales);
        })
        setTotalSales(total)
    }
  }, [dataGridProps])
  

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        flex: 1,
        headerName: "Date",
        type: "string",
        minWidth: 140,
      },
      {
        field: "totalSales",
        flex: 1,
        headerName: "Total",
        type: "string",
        minWidth: 140,
      },
    ],
    []
  );

  return (
    <List>
        <Typography align="right" variant="h4">Total Sales: {totalSales} </Typography>
        <Divider sx={{marginTop: 4, marginBottom: 4}}/>
      <DataGrid hideFooter {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
