import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

export const SalesCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: inventoryItems } = useAutocomplete({
    resource: "inventory",
  });
  const quantityRef = useRef<HTMLInputElement>(null);

  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name={"inventory.item"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...inventoryItems}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.id);
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
              const total = parseInt(quantityRef.current.value) * retailPrice;
              setTotalPrice(total);
              console.log(total);
            }
          }}
        />
        <Typography sx={{ marginTop: 5 }} align="right" variant="h4">
          Total: {totalPrice ? totalPrice : 0}
        </Typography>
      </Box>
    </Create>
  );
};
