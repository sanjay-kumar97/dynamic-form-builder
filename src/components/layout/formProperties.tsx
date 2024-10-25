import { ChangeEvent, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

import { BuilderContext } from "@/providers/builderContext";
import { Card } from "../ui/card";

const FormProperties = () => {
  const {
    elementPropertyTabs,
    propertyValues,
    formElements,
    selectedIndex,
    setFormElements,
  } = useContext(BuilderContext);

  const [selectedTab, setSelectedTab] = useState<string>("Attributes");

  const handleInputChange = (e: ChangeEvent, key: string) => {
    if (typeof selectedIndex !== "number") return null;
    const target = e.target as HTMLInputElement;
    const elementsCopy = [...formElements];
    elementsCopy.splice(selectedIndex, 1, {
      ...formElements[selectedIndex],
      properties: {
        ...formElements[selectedIndex].properties,
        [key]: target.value,
      },
    });
    setFormElements(elementsCopy);
  };

  return (
    <div id="form-properties" className="w-[30%]">
      <Card className="p-4 h-full">
        <h2 className="text-lg font-semibold mb-4">Form Properites</h2>
        {selectedIndex !== null ? (
          <>
            <div className="flex gap-4 items-center">
              {elementPropertyTabs.map((tab) => (
                <p
                  onClick={() => setSelectedTab(tab)}
                  className={twMerge(
                    "grow border-b-[3px] text-center p-1 cursor-pointer transition-colors",
                    selectedTab === tab
                      ? "border-slate-300"
                      : "border-transparent"
                  )}
                >
                  {tab}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-3 py-4">
              {propertyValues[selectedTab].map(({ label, key }) => {
                const randomId = `${Date.now()}`;
                return (
                  <div className="flex gap-2 items-center">
                    <label htmlFor={randomId} className="font-medium grow">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={
                        formElements?.[selectedIndex]?.properties?.[
                          key as keyof (typeof formElements)[number]["properties"]
                        ] ?? ""
                      }
                      onChange={(e) => handleInputChange(e, key)}
                      className="grow border border-gray-300 rounded-md text-sm p-2 focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>
            <p>Select an element to modify it's properties</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FormProperties;
