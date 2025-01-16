"use client";

import { useFormBuilderLogic } from "@/hooks/useFormBuilderLogic";
import { BuilderContextProvider } from "@/providers/builderContext";
import FormElements from "./formElements";
import FormPreview from "./formPreview";
import FormProperties from "./formProperties";
import Header from "./header";

const FormBuilder = () => {
  const formBuilderData = useFormBuilderLogic();

  return (
    <BuilderContextProvider values={formBuilderData}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
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
