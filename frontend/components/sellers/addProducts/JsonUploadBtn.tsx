import { Button } from "@/components/ui/button"
import useUploadJsonData from "@/hooks/seller/useUploadJsonData"
import { FileJson } from "lucide-react"
import { useRef } from "react"
import z from "zod"

interface JsonUploadBtnProps<T> {
    schema: z.ZodType<T>
    onSuccess: (data: T) => void
}

const JsonUploadBtn = <T,>({
    schema,
    onSuccess,
}: JsonUploadBtnProps<T>) => {

    const inputRef = useRef<HTMLInputElement | null>(null)

    const { handleJsonUpload } = useUploadJsonData<T>(schema)

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]

        if (!file) return

        const data = await handleJsonUpload(file)

        if (data !== null) {
            onSuccess(data)
        }

        e.target.value = ""
    }

    return (
        <>
            <input
                type="file"
                hidden
                ref={inputRef}
                onChange={handleFileChange}
                accept=".json,application/json"
            />

            <Button
                className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                onClick={() => inputRef.current?.click()}
                variant="outline"
            >
                <FileJson />
                JSON Upload
            </Button>
        </>
    )
}

export default JsonUploadBtn