import z from "zod"

export const phoneFieldsValidator = z.object({
    brand: z.string().nonempty({ error: "Brand must not be empty" }),

    installedRam: z.string().nonempty({ error: "installedRam must not be empty" }),

    operatingSystem: z.string().nonempty({ error: "Operating System must not be empty" }),

    cpuSpeed: z.string().nonempty({ error: "Cpu Speed must not be empty" }),

    memoryStorage: z.string().nonempty({ error: "Memory Storage must not be empty" })

})