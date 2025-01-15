const styleProperties = [
  {
    key: "padding",
    label: "Padding",
    value: 8,
    suffix: "px",
    mode: "input",
    type: "number",
  },
  {
    key: "margin",
    label: "Margin",
    value: 0,
    suffix: "px",
    mode: "input",
    type: "number",
  },
  {
    key: "borderRadius",
    label: "Border Radius",
    value: 4,
    suffix: "px",
    mode: "input",
    type: "number",
  },
  {
    key: "borderWidth",
    label: "Border Width",
    value: 1,
    suffix: "px",
    mode: "input",
    type: "number",
  },
  {
    key: "borderColor",
    label: "Border Color",
    value: "#d1d5db",
    mode: "input",
    type: "color",
  },
  {
    key: "fontSize",
    label: "Font Size",
    value: 14,
    suffix: "px",
    mode: "input",
    type: "number",
  },
  {
    key: "color",
    label: "Font Color",
    value: "#231F20",
    mode: "input",
    type: "color",
  },
];

const validationProperties = [
  {
    key: "required",
    label: "Required",
    value: false,
    mode: "switch",
    type: "boolean",
  },
  {
    key: "minLength",
    label: "Minimum Length",
    value: "",
    mode: "input",
    type: "number",
  },
  {
    key: "maxLength",
    label: "Maximum Length",
    value: "",
    mode: "input",
    type: "number",
  },
  {
    key: "pattern",
    label: "Regex Pattern",
    value: "",
    mode: "input",
    type: "text",
  },
];

const InputAttributes = [
  {
    key: "placeholder",
    label: "Placeholder",
    value: "Placeholder text",
    mode: "input",
    type: "text",
  },
  {
    key: "defaultValue",
    label: "Default Value",
    value: "",
    mode: "input",
    type: "text",
  },
];

const TextAreaAttributes = [
  {
    key: "placeholder",
    label: "Placeholder",
    value: "Placeholder text",
    mode: "input",
    type: "text",
  },
  {
    key: "defaultValue",
    label: "Default Value",
    value: "",
    mode: "input",
    type: "text",
  },
  {
    key: "rows",
    label: "Rows",
    value: 5,
    mode: "input",
    type: "number",
  },
  {
    key: "cols",
    label: "Columns",
    value: 30,
    mode: "input",
    type: "number",
  },
];

const CheckBoxAttributes = [
  {
    key: "checked",
    label: "Checked",
    value: false,
    mode: "switch",
  },
];

const InputProperties = {
  attributes: InputAttributes,
  style: styleProperties,
  validation: validationProperties,
};

const TextAreaProperties = {
  attributes: TextAreaAttributes,
  style: styleProperties,
  validation: validationProperties,
};

const CheckBoxProperties = {
  attributes: CheckBoxAttributes,
  style: styleProperties,
  validation: validationProperties,
};

export const defaultProperties = {
  input: InputProperties,
  textarea: TextAreaProperties,
  checkbox: CheckBoxProperties,
};
