import { Fragment, useCallback, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { BuilderContext } from "@/providers/builderContext";
import useStore from "@/store";
import { Element, ElementProperties } from "@/types";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const FormPreview = () => {
  const { handleDragStart, handleDragOver, handleDragEnd, handleDrop } =
    useContext(BuilderContext);

  const {
    formElements,
    draggedElement,
    selectedIndex,
    formStatus,
    setSelectedIndex,
  } = useStore();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".preview-element, #form-properties") &&
        selectedIndex !== null
      ) {
        setSelectedIndex(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [selectedIndex]);

  const isEditMode = formStatus === "edit";

  const renderFormElement = useCallback(
    (element: Element) => {
      const { attributes, style, validation } =
        element?.properties as ElementProperties;
      switch (element.id.split("-")[0]) {
        case "text":
          return (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor={element.id}
                label="Text Input"
                required={validation?.required}
              />
              <Input
                id={element.id}
                readOnly={isEditMode}
                style={style}
                {...(attributes as React.InputHTMLAttributes<HTMLInputElement>)}
              />
            </div>
          );
        case "textarea":
          return (
            <div className="flex flex-col gap-2">
              <Label htmlFor={element.id} label="Text Area" />
              <Textarea
                id={element.id}
                readOnly={isEditMode}
                style={style}
                {...(attributes as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            </div>
          );
        case "checkbox":
          return (
            <div className="flex items-center gap-2">
              <Checkbox
                id={element.id}
                readOnly={isEditMode}
                disabled={isEditMode}
                style={style}
                {...(attributes as React.InputHTMLAttributes<HTMLInputElement>)}
              />
              <Label htmlFor={element.id} label="Checkbox Label" />
            </div>
          );
        default:
          return null;
      }
    },
    [formElements, isEditMode]
  );

  const renderDropZone = useCallback(
    (index: number) => (
      <div
        className={twMerge(
          "transition-all",
          draggedElement
            ? "bg-green-100 border-2 border-dashed border-green-500 min-h-10"
            : "",
          formElements.length === index ? "grow" : ""
        )}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, index)}
      />
    ),
    [draggedElement, handleDragOver, handleDrop]
  );

  const handleElementClick = useCallback(
    (index: number) => {
      if (selectedIndex !== index) setSelectedIndex(index);
    },
    [selectedIndex, setSelectedIndex]
  );

  return (
    <div className="w-[50%]">
      <Card className="h-[calc(100dvh-6rem)]">
        <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
        <div
          id="preview-container"
          className="flex h-full max-h-[calc(100%-2.8rem)] flex-col gap-2 overflow-auto rounded border-2 border-dashed border-gray-300 p-4"
        >
          {formElements.length === 0 ? (
            <div
              className="grow flex items-center justify-center"
              onDragOver={(e) => handleDragOver(e, 0)}
              onDrop={(e) => handleDrop(e, 0)}
            >
              <p className="text-gray-500 text-center">
                Drag elements here to build your form
              </p>
            </div>
          ) : (
            <>
              {renderDropZone(0)}
              {formElements.map((element, index) => (
                <Fragment key={element.id}>
                  <div
                    draggable
                    onClick={() => handleElementClick(index)}
                    onDragStart={(e) => handleDragStart(e, element, index)}
                    onDragEnd={handleDragEnd}
                    className={twMerge(
                      "preview-element bg-white p-2 rounded border border-transparent cursor-move",
                      selectedIndex === index
                        ? "shadow-[rgba(3,102,214,0.3)_0px_0px_0px_3px]"
                        : "border-gray-200"
                    )}
                  >
                    {renderFormElement(element)}
                  </div>
                  {renderDropZone(index + 1)}
                </Fragment>
              ))}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FormPreview;
