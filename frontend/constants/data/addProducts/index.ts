import { BaseFeildsValidatorSchema } from "@/validators/addProduct";
import { bookFields } from "./book";
import { phoneFields } from "./phone";

const productFields = {
    Phones: phoneFields,
    Books: bookFields
}

export default productFields;