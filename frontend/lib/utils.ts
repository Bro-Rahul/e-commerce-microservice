import { SelectedOptionsType, VariantOptionsType } from "@/context/ProductVariantProvider";
import { ProductStatusType } from "@/types/searchFilter/sellerFilterTypes";
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
export function getStockHealth(stock: number) {
  if (stock === 0) return { label: 'Empty', color: 'text-destructive', barColor: 'bg-destructive', width: '0%' }
  if (stock < 25) return { label: 'Critical low', color: 'text-destructive', barColor: 'bg-destructive', width: '8%' }
  if (stock < 600) return { label: 'Moderate', color: 'text-amber-700 dark:text-amber-300', barColor: 'bg-amber-500 dark:bg-amber-400', width: '45%' }
  return { label: 'Healthy', color: 'text-emerald-700 dark:text-emerald-400', barColor: 'bg-emerald-600 dark:bg-emerald-400', width: '85%' }
}

export function getStatusStyle(status: ProductStatusType) {
  if (status === 'ACTIVE') return 'border-tertiary-container/30 bg-tertiary-container/10 text-tertiary-container dark:border-tertiary-container dark:bg-tertiary-container/50 dark:text-white'
  if (status === 'PENDING_REVIEW' || status === 'DRAFT') return 'border-secondary/30 bg-secondary/15 text-secondary-container dark:border-secondary-container dark:bg-secondary-container/50 dark:text-white'
  if (status === 'OUT_OF_STOCK') return 'border-destructive/30 bg-destructive/10 text-destructive'
  return 'border-outline-variant bg-surface-container-high text-on-surface-variant dark:border-outline dark:bg-surface-container-high dark:text-white'
}

export function formatStatus(status: ProductStatusType) {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const toCsvCell = (value: string | number) => {
  const cell = String(value)
  const safeCell = typeof value === 'string' && /^[\t\r\n ]*[=+\-@]/.test(cell)
    ? `'${cell}`
    : cell

  return `"${safeCell.replaceAll('"', '""')}"`
}


export const getImageUrlFromFile = (files: File[] | string[]) => {
  return files.map(file =>
    file instanceof File
      ? URL.createObjectURL(file)
      : file
  );
}

export const verifyImageURL = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "HEAD"
    })
    if (response.headers.get("Content-Type")?.startsWith("image/")) return true;
    throw Error("Url is not an image ");
  } catch (err) {
    throw Error("Fetch fail can't reach to server")
  }
}