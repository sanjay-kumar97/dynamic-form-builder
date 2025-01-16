import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

import { BuilderContext } from "@/providers/builderContext";
import useStore from "@/store";
import { ElementProperties, Property } from "@/types";
import { IconStore } from "@/utils/icons";
import { defaultProperties } from "@/utils/properties";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";

const FormProperties = () => {
  const { elementPropertyTabs } = useContext(BuilderContext);

  const { formElements, selectedIndex, setFormElements } = useStore();

  const [selectedTab, setSelectedTab] = useState(elementPropertyTabs[0]);

  const selectedElement = formElements[selectedIndex as number];
  const defaultElementProperties = defaultProperties[selectedElement?.type];

  console.log("HELLL", formElements);

  const updateFormElement = (
    key: string,
    targetValue: string | number | boolean
  ) => {
    const updatedProperties = {
      ...selectedElement?.properties,
      [selectedTab]: {
        ...selectedElement?.properties?.[selectedTab],
        [key]: targetValue,
      },
    };

    const updatedElement = {
      ...selectedElement,
      properties: updatedProperties,
    };

    const updatedElements = [...formElements];
    updatedElements[selectedIndex as number] = updatedElement;

    setFormElements(updatedElements);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    property: Property
  ) => {
    if (typeof selectedIndex !== "number") return;

    const { key, type, mode } = property;
    const currentValue =
      selectedElement.properties?.[selectedTab as keyof ElementProperties]?.[
        key as keyof ElementProperties[typeof selectedTab]
      ];

    if (mode === "switch") {
      updateFormElement(key, !currentValue);
    } else if (e) {
      const targetValue = e.target.value.length
        ? type === "number"
          ? Number(e.target.value)
          : e.target.value
        : "";
      updateFormElement(key, targetValue);
    }
  };

  return (
    <div id="form-properties" className="w-[30%]">
      <Card className="h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Form Properites</h2>
          {selectedIndex !== null && (
            <IconStore.trash className="size-7 cursor-pointer rounded-md border border-red-500 p-1.5 text-red-500 hover:bg-red-500 hover:text-white" />
          )}
        </div>
        {selectedIndex === null ? (
          <div>
            <p>Select an element to modify its properties</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-4 p-2 bg-gray-100 rounded-xl shadow-lg">
              {elementPropertyTabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={twMerge(
                    "flex-grow cursor-pointer text-center py-1 px-4 rounded-lg transition-colors duration-150",
                    selectedTab === tab
                      ? "capitalize bg-gray-200 text-black"
                      : "capitalize text-gray-600 hover:bg-gray-300"
                  )}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 py-4">
              {defaultElementProperties[selectedTab].map((property, index) => {
                const { label, key, mode, type } = property as Property;
                const selectedKey =
                  key as keyof (typeof formElements)[number]["properties"];
                const value =
                  selectedElement?.properties?.[selectedTab]?.[selectedKey];

                return (
                  <div
                    key={`${key}-${index}`}
                    className="grid grid-cols-2 gap-2 items-center"
                  >
                    <label htmlFor={key} className="font-medium">
                      {label}
                    </label>
                    {mode === "input" ? (
                      <input
                        id={key}
                        type={type ?? "text"}
                        value={value ?? ""}
                        onChange={(e) => handleInputChange(e, property)}
                        className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none"
                      />
                    ) : mode === "switch" ? (
                      <Switch
                        checked={value ?? false}
                        onChange={() => handleInputChange(null, property)}
                      />
                    ) : (
                      <pre>{JSON.stringify(property, null, 2)}</pre>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default FormProperties;
