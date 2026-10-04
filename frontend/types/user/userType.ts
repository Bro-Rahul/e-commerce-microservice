import { AddressType } from "./addressType"

export type UserType = {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    role: string;
    accountStatus: string;
    profileImage: string;
    createdAt: string;
    address: AddressType
    token: string
}    