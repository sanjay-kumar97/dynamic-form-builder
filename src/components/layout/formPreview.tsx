import {
  Fragment,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { twMerge } from "tailwind-merge";

import { BuilderContext, Element } from "@/providers/builderContext";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const FormPreview = () => {
  const {
    formElements,
    dragOverIndex,
    selectedIndex,
    formStatus,
    setSelectedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  } = useContext(BuilderContext);

  useEffect(() => {
    console.log("FORMMM", selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".preview-element, #form-properties"))
        setSelectedIndex(null);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const isPreview = formStatus === "preview";

  const renderFormElement = useCallback((element: Element) => {
    switch (element.id.split("-")[0]) {
      case "text":
        return (
          <div className="flex flex-col gap-2">
            <Label htmlFor={element.id} label="Text Input" />
            <Input
              id={element.id}
              readOnly={isPreview}
              {...(element?.properties as InputHTMLAttributes<HTMLInputElement>)}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="flex flex-col gap-2">
            <Label htmlFor={element.id} label="Text Area" />
            <Textarea
              id={element.id}
              readOnly={isPreview}
              {...(element?.properties as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={element.id}
              readOnly={isPreview}
              disabled={isPreview}
              {...(element?.properties as InputHTMLAttributes<HTMLInputElement>)}
            />
            <Label htmlFor={element.id} label="Checkbox Label" />
          </div>
        );
      default:
        return null;
    }
  }, []);

  const renderDropZone = useCallback(
    (index: number) => (
      <div
        className={twMerge(
          "min-h-4 transition-all",
          dragOverIndex === index
            ? "min-h-10 bg-green-100 border-2 border-dashed border-green-500"
            : ""
        )}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, index)}
      />
    ),
    [dragOverIndex, handleDragOver, handleDrop]
  );

  return (
    <div className="w-[50%]">
      <Card className="p-4 h-full">
        <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
        <div
          id="preview-container"
          className="min-h-[300px] max-h-[calc(100vh-7.5rem)] overflow-auto border-2 border-dashed border-gray-300 px-4 rounded flex flex-col"
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
                    onClick={() => setSelectedIndex(index)}
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
