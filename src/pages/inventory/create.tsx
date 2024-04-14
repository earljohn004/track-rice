import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useRef, useState } from "react";
import { getFormattedDate } from "../../utils/dateUtils";

export const InventoryCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    setValue,
  } = useForm({});

  const [retailPriceKg, setRetailPriceKg] = useState<number>(123);
  const [retailPriceSack, setRetailPriceSack] = useState<number>(456);
  const [markupPrice, setMarkupPrice] = useState<number>(250);
  const [sackContents, setSackContents] = useState<number>(48);

  const wholesalePriceRef = useRef<HTMLInputElement>(null);
  const markupPriceRef = useRef<HTMLInputElement>(null);
  const sackContentsRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (
      wholesalePriceRef.current &&
      markupPriceRef.current &&
      sackContentsRef.current
    ) {

      const retailPriceInSack =
        parseInt(wholesalePriceRef.current.value) +
        parseInt(markupPriceRef.current.value);

      const retailPriceInKg =
        retailPriceInSack / parseInt(sackContentsRef.current.value);

      setRetailPriceSack(retailPriceInSack);
      setRetailPriceKg(parseInt(retailPriceInKg.toFixed(1)));
      setMarkupPrice(markupPrice);
      setSackContents(parseInt(sackContentsRef.current.value));

      setValue("timestamp", Date.now());
      setValue("createdAt", getFormattedDate())
    }
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("item", {
            required: "This field is required",
          })}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Item"}
          name="item"
        />
        <TextField
          {...register("wholesalePrice", {
            required: "This field is required",
          })}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Wholesale Price (sack)"}
          name="wholesalePrice"
          inputRef={wholesalePriceRef}
          onChange={handleInputChange}
        />
        <TextField
          {...register("markupPrice", {
            required: "This field is required",
          })}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Markup Price"}
          name="markupPrice"
          defaultValue={markupPrice}
          inputRef={markupPriceRef}
          onChange={handleInputChange}
        />
        <TextField
          {...register("sackContents", {
            required: "This field is required",
          })}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={"Sack Contents (kg)"}
          name="sackContents"
          defaultValue={sackContents}
          inputRef={sackContentsRef}
          onChange={handleInputChange}
        />
        <TextField
          {...register("retailPriceKg")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Retail Price (kg)"}
          name="retailPriceKg"
          value={retailPriceKg}
          InputProps={{ readOnly: true }}
        />
        <TextField
          {...register("retailPriceSack")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Retail Price (sack)"}
          name="retailPriceSack"
          value={retailPriceSack}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Create>
  );
};
