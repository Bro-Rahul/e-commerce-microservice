import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  specIndex: number;
  propIndex: number;
  remove: () => void;
}

const PropertyCard = ({ specIndex, propIndex, remove }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="relative flex flex-col gap-3 p-3 border rounded h-full">      {/* KEY */}
      <Controller
        control={control}
        name={`specifications.${specIndex}.specification.${propIndex}.key`}
        render={({ field, fieldState: { error } }) => (
          <p>
            <Input {...field} placeholder="Key" className="text-xs font-bold uppercase" />
            {error?.message && <span className="mt-1 ml-2 text-xs text-red-500">{error.message}</span>}
          </p>
        )}
      />

      <Controller
        control={control}
        name={`specifications.${specIndex}.specification.${propIndex}.value`}
        render={({ field, fieldState: { error } }) => (
          <p>
            <Input {...field} placeholder="Value" className="font-bold" />
            {error?.message && <span className="mt-1 ml-2 text-xs text-red-500">{error.message}</span>}
          </p>
        )}
      />

      <Button
        onClick={remove}
        variant={'outline'}
        className="absolute -top-5 -right-5 rounded-md p-1 transition-colors hover:bg-muted cursor-pointer">
        <span className="material-symbols-outlined text-[10px]">
          cancel
        </span>
      </Button>
    </div>
  );
};

export default PropertyCard;