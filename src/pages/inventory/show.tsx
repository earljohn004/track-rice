import { Divider, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  Show,
} from "@refinedev/mui";

export const InventoryShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1">{"Item"}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {record?.item}
        </Typography>
        <Divider />
        <Typography variant="body1">{"Retail Price in Kg"}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {record?.retailPriceKg}
        </Typography>
        <Divider />
        <Typography variant="body1">{"Retail Price per Sack"}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {record?.retailPriceSack}
        </Typography>
      </Stack>
    </Show>
  );
};
