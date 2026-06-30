// components/shared/SectionHeading.tsx

interface Props {
    title: string;
    action?: string;
}

export function SectionHeading({
    title,
    action,
}: Props) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            {action && (
                <button className="text-link">
                    {action}
                </button>
            )}
        </div>
    );
}