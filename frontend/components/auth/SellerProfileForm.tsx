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

                {/* Business Name */}
                <Controller
                    control={control}
                    name="businessName"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Business Name"
                            htmlFor="businessName"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                autoComplete="organization"
                                className="inputfields"
                                id="businessName"
                                placeholder="e.g. Global Stores"
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

                {/* Business Email */}
                <Controller
                    control={control}
                    name="businessEmail"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Business Email"
                            htmlFor="businessEmail"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                autoComplete="email"
                                type="email"
                                id="businessEmail"
                                className="inputfields"
                                placeholder="company@example.com"
                            />
                        </Field>
                    )}
                />

                {/* Business Phone */}
                <Controller
                    control={control}
                    name="businessPhone"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Business Phone"
                            htmlFor="businessPhone"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="businessPhone"
                                type="tel"
                                autoComplete="tel"
                                className="inputfields"
                                placeholder="Business contact number"
                            />
                        </Field>
                    )}
                />

                {/* GST Number */}
                <Controller
                    control={control}
                    name="gstNumber"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="GST Number"
                            htmlFor="gstNumber"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="gstNumber"
                                className="inputfields"
                                placeholder="GST registration number"
                            />
                        </Field>
                    )}
                />

                {/* Store Description */}
                <Controller
                    control={control}
                    name="storeDescription"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Store Description"
                            htmlFor="storeDescription"
                            required
                            error={error?.message}
                        >
                            <textarea
                                {...field}
                                id="storeDescription"
                                className="inputfields"
                                placeholder="Describe your store"
                                rows={3}
                            />
                        </Field>
                    )}
                />

                {/* Logo URL */}
                <Controller
                    control={control}
                    name="logoUrl"
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Logo URL"
                            htmlFor="logoUrl"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="logoUrl"
                                type="url"
                                className="inputfields"
                                placeholder="https://example.com/logo.png"
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

                <div className="grid gap-2.5 sm:grid-cols-2">

                    {/* Account Number */}
                    <Controller
                        control={control}
                        name="accountNumber"
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Account Number"
                                htmlFor="accountNumber"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="accountNumber"
                                    autoComplete="off"
                                    inputMode="numeric"
                                    className="inputfields"
                                    placeholder="Bank account number"
                                />
                            </Field>
                        )}
                    />

                    {/* IFSC Code */}
                    <Controller
                        control={control}
                        name="ifscCode"
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="IFSC Code"
                                htmlFor="ifscCode"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="ifscCode"
                                    autoComplete="off"
                                    autoCapitalize="characters"
                                    className="inputfields"
                                    placeholder="e.g. HDFC000123"
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