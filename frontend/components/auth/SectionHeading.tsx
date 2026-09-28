import { LucideIcon } from "lucide-react"

function SectionHeading({
    icon: Icon,
    title,
    description,
    badge,
}: {
    icon: LucideIcon
    title: string
    description: string
    badge: string
}) {
    return (
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-outline-variant bg-surface-container px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
                <Icon aria-hidden="true" className="size-4 shrink-0 text-secondary-container" />
                <div className="min-w-0">
                    <h2 className="headline-sm font-bold text-on-surface">{title}</h2>
                    <p className="text-xs leading-4 text-on-surface-variant">{description}</p>
                </div>
            </div>
            <span className="shrink-0 bg-secondary/15 px-2 py-1 text-[9px] font-semibold text-secondary-container">{badge}</span>
        </div>
    )
}

export default SectionHeading;