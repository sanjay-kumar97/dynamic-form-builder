import {
  createContext,
  DragEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from "react";

type ProviderProps = {
  children: ReactNode;
};

type Properties = {
  label?: string;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
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

type ContextProps = {
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
    e: DragEvent<HTMLLIElement | HTMLDivElement>,
    element: Element,
    index: number
  ) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (e: DragEvent<HTMLDivElement>, dropIndex: number) => void;
};

export const BuilderContext = createContext<ContextProps>({} as ContextProps);

export const BuilderContextProvider: FC<ProviderProps> = ({ children }) => {
  const availableElements: Element[] = [
    { id: "text", label: "Input" },
    { id: "textarea", label: "Text Area" },
    { id: "checkbox", label: "Checkbox" },
  ];

  const elementPropertyTabs = ["Attributes", "Validation", "Styles"];

  const propertyValues = {
    Attributes: [{ label: "Placeholder", key: "placeholder" }],
    Validation: [{ label: "Required", key: "required" }],
    Styles: [{ label: "Padding", key: "padding" }],
  };

  const [formElements, setFormElements] = useState<Element[]>([]);
  const [draggedElement, setDraggedElement] = useState<DraggedElement | null>(
    null
  );
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"preview" | "published">(
    "preview"
  );

  const handleDragStart = useCallback(
    (
      e: DragEvent<HTMLLIElement | HTMLDivElement>,
      element: Element,
      index: number
    ) => {
      setDraggedElement({ element, index });
      e.dataTransfer.setData("text/plain", element.id);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      setDragOverIndex(index);
    },
    []
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
      e.preventDefault();
      setDragOverIndex(null);

      if (!draggedElement) return;

      const newFormElements = [...formElements];

      if (draggedElement.index !== -1) {
        // Reordering existing element
        if (draggedElement.index !== dropIndex) {
          const [reorderedItem] = newFormElements.splice(
            draggedElement.index,
            1
          );
          newFormElements.splice(dropIndex, 0, reorderedItem);
        }
      } else {
        // Adding new element
        const newElement: Element = {
          ...draggedElement.element,
          id: `${draggedElement.element.id}-${Date.now()}`,
          properties: { placeholder: "Custom placeholder" },
        };
        newFormElements.splice(dropIndex, 0, newElement);
      }

      setFormElements(newFormElements);
      setDraggedElement(null);
    },
    [draggedElement, formElements]
  );

  const handleDragEnd = useCallback(() => {
    setDragOverIndex(null);
    setDraggedElement(null);
    setSelectedIndex(null);
  }, []);

  const contextValues = {
    availableElements,
    elementPropertyTabs,
    propertyValues,
    formElements,
    dragOverIndex,
    selectedIndex,
    formStatus,
    setSelectedIndex,
    setFormElements,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };

  return (
    <BuilderContext.Provider value={contextValues}>
      {children}
    </BuilderContext.Provider>
  );
};
