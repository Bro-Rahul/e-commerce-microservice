import toast from "react-hot-toast"
import z from "zod"

const useUploadJsonData = <T>(schema: z.ZodType<T>) => {
    const handleJsonUpload = async (file: File): Promise<T | null> => {
        try {
            const textData = await file.text()
            const jsonData = JSON.parse(textData)

            const result = schema.safeParse(jsonData)
            console.log(result)
            if (!result.success) {
                result.error.issues.forEach(item =>
                    toast.error(`${item.message} at ${item.path}`, {
                        position: "bottom-right",
                        duration: 5000
                    })
                )
                return null
            }

            return result.data
        } catch (err) {
            if (err instanceof SyntaxError) {
                toast.error("Not a valid JSON file", {
                    position: "bottom-right",
                    duration: 5000,
                })
            }

            return null
        }
    }

    return {
        handleJsonUpload,
    }
}

export default useUploadJsonData