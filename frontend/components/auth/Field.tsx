import { ReactNode } from "react"

function Field({
    label,
    htmlFor,
    required = false,
    optionalText,
    error,
    children,
}: {
    label: string
    htmlFor: string
    required?: boolean
    optionalText?: string
    error?: string
    children: ReactNode
}) {
    return (
        <div className="min-w-0 space-y-1 my-3">
            <div className="flex min-h-4 items-center justify-between gap-2">
                <label className="text-sm font-semibold text-on-surface" htmlFor={htmlFor}>
                    {label}{required && <span className="ml-0.5 text-error">*</span>}
                </label>
                {optionalText && <span className="text-[10px] text-on-surface-variant">{optionalText}</span>}
            </div>
            {children}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Field