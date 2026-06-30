import { Edit3 } from "lucide-react";

const VariantRow = ({ format, sku, price }: { format: string; sku: string; price: string }) => {
    return (
        <tr>
            <td className="p-3">{format}</td>
            <td className="p-3 text-on-surface-variant">{sku}</td>
            <td className="p-3">{price}</td>
            <td className="p-3">
                <button type="button" aria-label={`Edit ${format} variant`} className="text-on-surface-variant hover:text-on-surface">
                    <Edit3 className="size-4" />
                </button>
            </td>
        </tr>)
}

export default VariantRow;