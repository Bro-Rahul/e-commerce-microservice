"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { DateFieldSchema } from "@/types/formFields";

const DateField = ({
    schema,
}: {
    schema: DateFieldSchema;
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={schema.name}
            control={control}
            defaultValue={undefined}
            render={({
                field: { value, onChange },
                fieldState: { error },
            }) => (
                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        {schema.label}
                    </label>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />

                                {value ? (
                                    format(value, "PPP")
                                ) : (
                                    <span className="text-muted-foreground">
                                        {schema.placeholder}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            className="w-auto p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={value}
                                onSelect={onChange}
                            />
                        </PopoverContent>
                    </Popover>

                    {error?.message && (
                        <p className="text-sm text-destructive">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default DateField;