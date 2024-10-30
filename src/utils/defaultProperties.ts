const styleProperties = [
  {
    key: "padding",
    label: "Inner space",
    value: 12,
    mode: "input",
    type: "number",
  },
  {
    key: "margin",
    label: "Outer space",
    value: 12,
    mode: "input",
    type: "number",
  },
  {
    key: "borderRadius",
    label: "Border Radius",
    value: 4,
    mode: "input",
    type: "number",
  },
  {
    key: "borderWidth",
    label: "Border Width",
    value: 1,
    mode: "input",
    type: "number",
  },
  {
    key: "borderColor",
    label: "Border Color",
    value: "black",
    mode: "input",
    type: "color",
  },
  {
    key: "fontSize",
    label: "Font Size",
    value: 14,
    mode: "input",
    type: "number",
  },
  {
    key: "color",
    label: "Font Color",
    value: "black",
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
  },
  {
    key: "minLength",
    label: "Minimum Length",
    value: 0,
    mode: "input",
    type: "number",
  },
  {
    key: "maxLength",
    label: "Maximum Length",
    value: 0,
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
    value: "",
    mode: "input",
    type: "text",
  },
  {
    key: "value",
    label: "Default Value",
    value: "",
    mode: "input",
    type: "text",
  },
];

export const InputProperties = {
  Attributes: InputAttributes,
  Styles: styleProperties,
  Validation: validationProperties,
};
