import React from "react"
import {
    Building2,
    Landmark,
} from "lucide-react"
import {
    Controller,
    useFormContext,
} from "react-hook-form"

import SectionHeading from "./SectionHeading"
import Field from "./Field"

import { SellerRegistrationType } from "@/validators/auth/SellerRegisterationValidator"

const SellerProfileForm = () => {
    const { control } = useFormContext<SellerRegistrationType>()

    return (
        <section className="overflow-hidden rounded-sm border border-outline-variant bg-surface-container-lowest">

            <SectionHeading
                icon={Building2}
                title="3. Business & Seller Details"
                description="Enterprise identity, tax registrations, and disbursement bank account"
                badge="sellerRequest / Required"
            />

            <div className="grid gap-x-3 gap-y-2.5 p-3 sm:grid-cols-2">

                {/* Legal Name */}
                <Controller
                    control={control}
                    name="legalName"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Legal Business / Entity Name"
                            htmlFor="legalName"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                autoComplete="organization"
                                className="inputfields"
                                id="legalName"
                                placeholder="e.g. Global Stores LLC"
                            />
                        </Field>
                    )}
                />

                {/* Store Name */}
                <Controller
                    control={control}
                    name="storeName"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Store Display Name"
                            htmlFor="storeName"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                autoComplete="organization"
                                className="inputfields"
                                id="storeName"
                                placeholder="e.g. Global Retail India"
                            />
                        </Field>
                    )}
                />

                {/* Business Type */}
                <Controller
                    control={control}
                    name="businessType"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Business Type"
                            htmlFor="businessType"
                            required
                            error={error?.message}
                        >
                            <select
                                {...field}
                                id="businessType"
                                className="inputfields"
                            >
                                <option value="">
                                    Select business type
                                </option>

                                <option value="private-limited">
                                    Private Limited Company (Pvt Ltd)
                                </option>

                                <option value="llp">
                                    Limited Liability Partnership
                                </option>

                                <option value="partnership">
                                    Partnership
                                </option>

                                <option value="sole-proprietorship">
                                    Sole Proprietorship
                                </option>
                            </select>
                        </Field>
                    )}
                />

                {/* Product Category */}
                <Controller
                    control={control}
                    name="productCategory"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Primary Product Category"
                            htmlFor="productCategory"
                            required
                            error={error?.message}
                        >
                            <select
                                {...field}
                                id="productCategory"
                                className="inputfields"
                            >
                                <option value="">
                                    Select product category
                                </option>

                                <option value="electronics">
                                    Consumer Electronics & Appliances
                                </option>

                                <option value="home-kitchen">
                                    Home & Kitchen
                                </option>

                                <option value="fashion">
                                    Fashion
                                </option>

                                <option value="books-media">
                                    Books & Media
                                </option>

                                <option value="health-personal-care">
                                    Health & Personal Care
                                </option>
                            </select>
                        </Field>
                    )}
                />

                {/* Tax Number */}
                <Controller
                    control={control}
                    name="taxNumber"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Tax ID / GSTIN / VAT Number"
                            htmlFor="taxNumber"
                            required
                            optionalText="Format: 22AAAAA0000A1Z5"
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="taxNumber"
                                className="inputfields"
                                placeholder="22AAAAA0000A1Z5"
                            />
                        </Field>
                    )}
                />

                {/* Registration Number */}
                <Controller
                    control={control}
                    name="registrationNumber"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Business Registration / PAN Number"
                            htmlFor="registrationNumber"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="registrationNumber"
                                className="inputfields"
                                placeholder="e.g. U72900KA2021PTC000000"
                            />
                        </Field>
                    )}
                />
            </div>

            {/* Payout Account */}
            <div className="border-t border-outline-variant px-3 py-2.5">

                <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-on-surface">
                    <Landmark
                        aria-hidden="true"
                        className="size-3.5 text-secondary-container"
                    />

                    Payout & Settlement Account

                    <span className="font-normal text-on-surface-variant">
                        (Seller Disbursements)
                    </span>
                </h3>

                <div className="grid gap-2.5 sm:grid-cols-3">

                    {/* Account Holder */}
                    <Controller
                        control={control}
                        name="accountHolder"
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Account Holder Name"
                                htmlFor="accountHolder"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="accountHolder"
                                    autoComplete="name"
                                    className="inputfields"
                                    placeholder="Global Stores LLC"
                                />
                            </Field>
                        )}
                    />

                    {/* Bank Account */}
                    <Controller
                        control={control}
                        name="bankAccount"
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Bank Account Number"
                                htmlFor="bankAccount"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="bankAccount"
                                    autoComplete="off"
                                    inputMode="numeric"
                                    className="inputfields"
                                    placeholder="001234567890"
                                />
                            </Field>
                        )}
                    />

                    {/* Routing Code */}
                    <Controller
                        control={control}
                        name="routingCode"
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="IFSC / SWIFT / Routing Code"
                                htmlFor="routingCode"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="routingCode"
                                    autoComplete="off"
                                    className="inputfields"
                                    placeholder="HDFC000123"
                                />
                            </Field>
                        )}
                    />

                </div>
            </div>
        </section>
    )
}

export default SellerProfileForm