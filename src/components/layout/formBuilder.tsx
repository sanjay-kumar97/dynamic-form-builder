"use client";

import { useFormBuilderData } from "@/hooks/useFormBuilderData";
import { BuilderContextProvider } from "@/providers/builderContext";
import FormElements from "./formElements";
import FormPreview from "./formPreview";
import FormProperties from "./formProperties";

const FormBuilder = () => {
  const formBuilderData = useFormBuilderData();

  return (
    <BuilderContextProvider values={formBuilderData}>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="text-lg font-semibold">Form Builder</h1>
        </div>
        <div className="grow flex gap-3 p-5">
          <FormElements />
          <FormPreview />
          <FormProperties />
        </div>
      </div>
    </BuilderContextProvider>
  );
};

export default FormBuilder;
