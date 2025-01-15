export type Property = {
  label: string;
  key: string;
  value: string | number | boolean;
  type?: string;
  mode?: string;
};

export type Properties = {
  attributes: Property[];
  style: Property[];
  validation: Property[];
};

export type ElementProperties = {
  label?: string;
  attributes?:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  validation?: {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: string;
    errorMessage?: {
      required: string;
      minLength: string;
      maxLength: string;
      pattern: string;
    };
  };
  style?: React.CSSProperties;
};

export type Element = {
  id: string;
  label: string;
  type: "input" | "textarea" | "checkbox";
  properties?: ElementProperties;
};

export type DraggedElement = {
  element: Element;
  index: number;
};

export type PropertTabs = Array<"attributes" | "validation" | "style">;

export type FormStatus = "preview" | "edit";

export type ContextProps = {
  availableElements: Element[];
  elementPropertyTabs: PropertTabs;
  handleDragStart: (
    e: React.DragEvent<HTMLLIElement | HTMLDivElement>,
    element: Element,
    index: number
  ) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
};
