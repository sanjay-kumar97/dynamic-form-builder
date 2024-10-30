/* Library imports */
import { DragEvent, useCallback, useState } from "react";

/* User defined imports */
import { DraggedElement, Element } from "@/types";

export const useFormBuilderData = () => {
  /* Constant variables */
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

  /* States */
  const [formElements, setFormElements] = useState<Element[]>([]);
  const [draggedElement, setDraggedElement] = useState<DraggedElement | null>(
    null
  );
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"preview" | "published">(
    "preview"
  );

  /* Helper functions */
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

  return {
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
};
