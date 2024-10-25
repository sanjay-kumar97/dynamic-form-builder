"use client";

import { BuilderContextProvider } from "@/providers/builderContext";
import FormElements from "./formElements";
import FormPreview from "./formPreview";
import FormProperties from "./formProperties";

const FormBuilder = () => {
  return (
    <div className="h-screen overflow-hidden flex gap-3 p-5">
      <BuilderContextProvider>
        <FormElements />
        <FormPreview />
        <FormProperties />
      </BuilderContextProvider>
    </div>
  );
};

export default FormBuilder;
