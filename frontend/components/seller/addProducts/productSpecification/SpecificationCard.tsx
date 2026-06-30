import { useFieldArray, useFormContext } from "react-hook-form";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

interface Props {
    specIndex: number;
    specificationName: string;
    removeSpecification: () => void;
}

const SpecificationCard = ({
    specIndex,
    specificationName,
    removeSpecification,
}: Props) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `specifications.${specIndex}.specification`,
    });

    const addProperty = () => {
        append({ key: "", value: "" });
    };

    return (
        <div className="p-4 border rounded space-y-4 relative">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">{specificationName}</h3>
                <Button type="button" className="bg-primary hover:bg-primary/90 cursor-pointer" onClick={removeSpecification}>
                    Remove Group
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {fields.map((field, propIndex) => (
                    <PropertyCard
                        key={field.id}
                        specIndex={specIndex}
                        propIndex={propIndex}
                        remove={() => remove(propIndex)}
                    />
                ))}
            </div>

            <Button type="button" onClick={addProperty}>
                Add Property
            </Button>
        </div>
    );
};

export default SpecificationCard;