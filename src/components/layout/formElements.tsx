import { DragEvent, useContext } from "react";

import { BuilderContext } from "@/providers/builderContext";
import { Card } from "../ui/card";

const FormElements = () => {
  const { availableElements, handleDragStart, handleDragEnd } =
    useContext(BuilderContext);

  return (
    <div className="w-[20%]">
      <Card className="p-4 h-full">
        <h2 className="text-lg font-semibold mb-4">Available Elements</h2>
        <ul>
          {availableElements.map((element) => (
            <li
              key={element.id}
              draggable
              onDragStart={(e: DragEvent<HTMLLIElement>) =>
                handleDragStart(e, element, -1)
              }
              onDragEnd={handleDragEnd}
              className="bg-gray-100 p-2 mb-2 rounded cursor-move hover:bg-gray-200 transition-colors"
            >
              {element.label}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default FormElements;
