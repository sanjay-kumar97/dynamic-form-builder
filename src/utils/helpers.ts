import { Properties } from "@/types";

export const extractPropertyValues = (properties: Properties) => {
  const propertyValues = Object.entries(properties).reduce(
    (
      acc: Record<string, Record<string, string | number | boolean>>,
      [key, value]
    ) => {
      acc[key] = value.reduce(
        (innerAcc: Record<string, string | number | boolean>, val) => {
          innerAcc[val.key] = val.value;
          return innerAcc; // Return the accumulator for the inner reduce
        },
        {}
      );
      return acc; // Return the accumulator for the outer reduce
    },
    {}
  );

  return propertyValues;
};
