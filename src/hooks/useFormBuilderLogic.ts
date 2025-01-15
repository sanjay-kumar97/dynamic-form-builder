/* Library imports */
import { DragEvent, useCallback } from "react";

/* User defined imports */
import useStore from "@/store";
import { Element, PropertTabs } from "@/types";
import { defaultProperties } from "@/utils/properties";
import { extractPropertyValues } from "@/utils/helpers";

export const useFormBuilderLogic = () => {
  const {
    formElements,
    draggedElement,
    dragOverIndex,
    selectedIndex,
    setFormElements,
    setDragOverIndex,
    setDraggedElement,
    setSelectedIndex,
  } = useStore();

  /* Constant variables */
  const availableElements: Element[] = [
    { id: "text", label: "Input", type: "input" },
    { id: "textarea", label: "Text Area", type: "textarea" },
    { id: "checkbox", label: "Checkbox", type: "checkbox" },
  ];

  const elementPropertyTabs: PropertTabs = [
    "attributes",
    "validation",
    "style",
  ];

  /* Helper functions */
  const handleDragStart = useCallback(
    (
      e: DragEvent<HTMLLIElement | HTMLDivElement>,
      element: Element,
      index: number
    ) => {
      if (!element) return;
      setDraggedElement({ element, index });
      e.dataTransfer.setData("text/plain", element.id);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      if (dragOverIndex !== index) setDragOverIndex(index);
    },
    [dragOverIndex]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
      e.preventDefault();

      if (!draggedElement) return;

      if (dragOverIndex !== null) setDragOverIndex(null);

      const newFormElements = [...formElements];

      if (draggedElement.index !== dropIndex) {
        if (draggedElement.index !== -1) {
          /* Reordering existing element */
          const [reorderedItem] = newFormElements.splice(
            draggedElement.index,
            1
          );
          newFormElements.splice(dropIndex, 0, reorderedItem);
        } else {
          /* Adding new element */
          const { element } = draggedElement;
          const properties = defaultProperties[element.type];
          const propertyValues = extractPropertyValues(properties);
          const newElement: Element = {
            ...element,
            id: `${element.id}-${Date.now()}`,
            properties: propertyValues,
          };
          newFormElements.splice(dropIndex, 0, newElement);
        }
        setFormElements(newFormElements);
      }
      setDraggedElement(null);
    },
    [draggedElement, formElements]
  );

  const handleDragEnd = useCallback(() => {
    if (draggedElement) setDraggedElement(null);
    if (dragOverIndex !== null) setDragOverIndex(null);
    if (selectedIndex !== null) setSelectedIndex(null);
  }, [draggedElement, dragOverIndex, selectedIndex]);

  return {
    availableElements,
    elementPropertyTabs,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };
};
