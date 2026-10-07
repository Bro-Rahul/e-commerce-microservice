

export const customerRegistrationDefaults = {
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+91",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    countryRegion: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    areaCode: "",
}

export const sellerRegistrationDefaults = {
    ...customerRegistrationDefaults,
    businessEmail: "",
    storeDescription: "",
    businessName: "",
    logoUrl: "",
    gstNumber: "",
    storeName: "",
    businessPhone: "",
    accountNumber: "",
    ifscCode: "",
}