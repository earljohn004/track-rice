import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const InventoryList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  // const { data: categoryData, isLoading: categoryIsLoading } = useMany({
  //   resource: "categories",
  //   ids:
  //     dataGridProps?.rows
  //       ?.map((item: any) => item?.category?.id)
  //       .filter(Boolean) ?? [],
  //   queryOptions: {
  //     enabled: !!dataGridProps?.rows,
  //   },
  // });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "item",
        flex: 1,
        headerName: "Item",
        minWidth: 200,
      },
      {
        field: "retailPriceKg",
        flex: 1,
        headerName: "Retail Price (kg)",
        type: "number",
        minWidth: 200,
      },
      {
        field: "retailPriceSack",
        flex: 1,
        headerName: "Retail Price (sack)",
        type: "number",
        minWidth: 200,
      },
      {
        field: "wholesalePrice",
        flex: 1,
        headerName: "Wholesale Price",
        type: "number",
        minWidth: 200,
      },
      {
        field: "markupPrice",
        flex: 1,
        headerName: "MarkUp Price",
        type: "number",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
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
              <ShowButton hideText recordItemId={row.id} />
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
