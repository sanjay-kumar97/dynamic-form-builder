export type Properties = {
  label?: string;
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
);

export type Element = {
  id: string;
  label: string;
  properties?: Properties;
};

export type DraggedElement = {
  element: Element;
  index: number;
};

export type ContextProps = {
  availableElements: Element[];
  elementPropertyTabs: string[];
  propertyValues: { [key: string]: { label: string; key: string }[] };
  formElements: Element[];
  dragOverIndex: number | null;
  selectedIndex: number | null;
  formStatus: "preview" | "published";
  setSelectedIndex: (index: number | null) => void;
  setFormElements: (elements: Element[]) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLLIElement | HTMLDivElement>,
    element: Element,
    index: number
  ) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
};
