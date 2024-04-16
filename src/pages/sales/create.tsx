import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { getFormattedDate } from "../../utils/dateUtils";
import { useGetIdentity } from "@refinedev/core";

interface IIdentity {
  email: string;
  uid: string;
}

export const SalesCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    setValue,
    control,
  } = useForm({});

  const { autocompleteProps: inventoryItems } = useAutocomplete({
    resource: "inventory",
  });
  const quantityRef = useRef<HTMLInputElement>(null);

  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [option, setOption] = useState<string>("");

  const quickButtons = ["1/4", "1/2", "3/4", "1", "5", "10"];
  const { data: identity } = useGetIdentity<IIdentity>();

  useEffect(() => {
    if (quantityRef.current) {
      setValue("totalPrice", totalPrice);
      setValue("quantity", quantityRef.current.value);
      setValue("inventory.retailPrice", retailPrice);
      setValue("inventory.item", option);

      setValue("timestamp", Date.now());
      setValue("createdAt", getFormattedDate());
      setValue("addedBy", identity?.email)
    }
  }, [totalPrice, setValue, setRetailPrice, retailPrice, option, identity]);

  function computeTotal(num1: number, num2: number) {
    const total = num1 * num2;
    setTotalPrice(total);
  }

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name={"inventory.id"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...inventoryItems}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
                console.log(value);
                setOption(value.item);
                setTotalPrice(0);
                setRetailPrice(value?.retailPriceKg);
                if (quantityRef?.current) quantityRef.current.value = "";
              }}
              getOptionLabel={(item) => {
                return (
                  inventoryItems?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.id?.toString()
                        : item?.toString();
                    const pId = p?.id?.toString();
                    return itemId === pId;
                  })?.item ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Item"}
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
            />
          )}
        />
        <Box display="flex" gap={2}>
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Retail Price per Kg"}
            name="retailPrice"
            value={retailPrice}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
            label={"Quantity"}
            name="quantity"
            inputRef={quantityRef}
            onChange={() => {
              if (quantityRef.current) {
                computeTotal(
                  parseFloat(quantityRef.current.value),
                  retailPrice
                );
              }
            }}
          />
        </Box>
        <Typography variant="body2">Quick buttons</Typography>
        <Box display="flex" gap={0.5}>
          {quickButtons.map((value) => (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                if (quantityRef.current) {
                  if (value === "1/4") quantityRef.current.value = "0.25";
                  else if (value === "1/2") quantityRef.current.value = "0.50";
                  else if (value === "3/4") quantityRef.current.value = "0.75";
                  else quantityRef.current.value = value;

                  computeTotal(
                    parseFloat(quantityRef.current.value),
                    retailPrice
                  );
                }
              }}
            >
              {value}
            </Button>
          ))}
        </Box>
        <Typography sx={{ marginTop: 5 }} align="right" variant="h4">
          Total: {totalPrice ? totalPrice : 0}
        </Typography>
      </Box>
    </Create>
  );
};
