import { sellerPatchHttp } from "./patchHttp";
import { sellerGets } from "./sellerGetHttp";
import { sellerPostHttp } from "./sellerPostHttp";



export const sellerRepository = {
    postRequests: sellerPostHttp,
    getRequests: sellerGets,
    patchRequests: sellerPatchHttp
}   