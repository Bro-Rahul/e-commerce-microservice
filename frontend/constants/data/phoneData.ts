import { PhoneAttributeType } from "@/validators/products/phoneValidator";

export const phoneAttributeDefaults: PhoneAttributeType = {
    brand: '',
    cpuSpeed: '',
    installedRam: '',
    memoryStorage: '',
    operatingSystem: ''
}

export const phoneVariantKeyOptions: string[] = ["ram", "storage", "color"]