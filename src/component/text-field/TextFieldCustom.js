import * as React from "react";
import PropTypes from "prop-types";
import IMask from "imask";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMask
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="VND  "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function TextFieldCustom({ labelText, sizeText, ChangeValue }) {
  const [values, setValues] = React.useState({
    numberformat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    ChangeValue(event.target.value);
  };

  return (
    <TextField
      size={sizeText}
      fullWidth
      label={labelText}
      value={values.numberformat}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumericFormatCustom,
        // endAdornment: (
        //   <InputAdornment position="end">VND</InputAdornment>
        //   )
      }}
      
    />
  );
}
