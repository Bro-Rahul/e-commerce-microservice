import React from "react";

type BaseFieldsSchema = {
    name: string;
    label: string;
}
export type TextFieldSchema = {
    type: "text";
    placeholder?: string;
    readOnly?: boolean
} & BaseFieldsSchema;

export type SelectFieldSchema = {
    type: "select";
    options: {
        label: string;
        value: string;
    }[];
} & BaseFieldsSchema;

export type NumericFieldSchema = {
    type: "number",
    placeholder: string
} & BaseFieldsSchema


export type TextAreaFieldSchema = {
    type: "textarea",
    placeholder?: string;
    readOnly?: boolean
} & BaseFieldsSchema

export type DateFieldSchema = {
    type: "date",
    placeholder?: string;
    readOnly?: boolean
} & BaseFieldsSchema

export type FileUploadSchema = {
    type: "file",
    multiple: boolean
} & BaseFieldsSchema

export type ArrayFieldSchema = {
    type: "array",
    childrenFieldType: FormFieldSchema
} & BaseFieldsSchema



export type FormFieldSchema =
    | TextFieldSchema
    | SelectFieldSchema
    | NumericFieldSchema
    | TextAreaFieldSchema
    | DateFieldSchema
    | FileUploadSchema
    | ArrayFieldSchema
