import { SelectedOptionsType, VariantOptionsType } from "@/context/ProductVariantProvider";
import { keyValuePairType } from "@/validators/specificationValidator";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toTitleCase(str: string) {
  return str
    // snake_case → snake case
    .replace(/_/g, " ")
    // camelCase → camel Case
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // capitalize first letter of each word
    .replace(/\b\w/g, char => char.toUpperCase());
}


export const formateVariantsData = (variantsData: Record<string, keyValuePairType[]>) => {
  return Object.entries(variantsData).reduce<Record<string, Record<string, string>>>((acc, curr) => {
    const newValues = curr['1'].reduce<Record<string, string>>((a, c) => {
      a[c.key] = c.value;
      return a;
    }, {});
    acc[curr[0]] = newValues;
    return acc;
  }, {});

}

export const findAllAvailableOptions = (optionsKey: string[], variantsData: Record<string, keyValuePairType[]>) => {
  const allAvailableOptions = getMapping(optionsKey);
  Object.entries(variantsData).forEach(([productKey, values]) => {
    values.forEach(({ key, value }) => {
      if (optionsKey.includes(key) && !allAvailableOptions[key].includes(value)) {
        allAvailableOptions[key].push(value);
      }
    });
  });
  return allAvailableOptions
}

const getMapping = (optionsKey: string[]) => {
  return optionsKey.reduce<VariantOptionsType>((acc, curr) => {
    acc[curr] = []
    return acc;
  }, {});
}

export const getDefaultSelectedOptions = (
  optionsKey: string[],
  displayVariant: string,
  variantsData: Record<string, keyValuePairType[]>
) => {
  const defaultSelectedOptions = optionsKey.reduce<SelectedOptionsType>((acc, curr) => {
    acc[curr] = ''
    return acc;
  }, {});

  variantsData[displayVariant]?.forEach(({ key, value }) => {
    if (optionsKey.includes(key)) {
      defaultSelectedOptions[key] = value
    }
  });

  return defaultSelectedOptions
}
