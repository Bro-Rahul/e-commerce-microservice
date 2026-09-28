import {
    MapPin,
} from "lucide-react"
import {
    Controller,
    useFormContext,
} from "react-hook-form"

import SectionHeading from "./SectionHeading"
import Field from "./Field"
import { CustomerRegistrationType } from "@/validators/auth/CustomerRegisterationValidator"

const AddressForm = () => {
    const {
        control,
    } = useFormContext<CustomerRegistrationType>()

    return (
        <section className="overflow-hidden rounded-sm border border-outline-variant bg-surface-container-lowest">
            <SectionHeading
                icon={MapPin}
                title="2. Address & Location Details"
                description="Used for delivery, dispatch, and invoice issuance"
                badge="Required"
            />

            <div className="grid gap-x-3 gap-y-2.5 p-3 sm:grid-cols-2">

                {/* Country / Region */}
                <div className="sm:col-span-2">
                    <Controller
                        name="countryRegion"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Country / Region"
                                htmlFor="countryRegion"
                                required
                                error={error?.message}
                            >
                                <select
                                    {...field}
                                    id="countryRegion"
                                    autoComplete="country-name"
                                    className="inputfields"
                                >
                                    <option value="">
                                        Select country / region
                                    </option>
                                    <option value="IN">
                                        India (IN)
                                    </option>
                                    <option value="US">
                                        United States (US)
                                    </option>
                                    <option value="UK">
                                        United Kingdom (UK)
                                    </option>
                                </select>
                            </Field>
                        )}
                    />
                </div>

                {/* Address Line 1 */}
                <div className="sm:col-span-2">
                    <Controller
                        name="addressLine1"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Address Line 1"
                                htmlFor="addressLine1"
                                required
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="addressLine1"
                                    autoComplete="address-line1"
                                    className="inputfields"
                                    placeholder="Street address, P.O. box, company name, c/o"
                                />
                            </Field>
                        )}
                    />
                </div>

                {/* Address Line 2 */}
                <div className="sm:col-span-2">
                    <Controller
                        name="addressLine2"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <Field
                                label="Address Line 2"
                                htmlFor="addressLine2"
                                optionalText="Optional"
                                error={error?.message}
                            >
                                <input
                                    {...field}
                                    id="addressLine2"
                                    autoComplete="address-line2"
                                    className="inputfields"
                                    placeholder="Apartment, suite, unit, building, floor, landmark"
                                />
                            </Field>
                        )}
                    />
                </div>

                {/* City */}
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="City"
                            htmlFor="city"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="city"
                                autoComplete="address-level2"
                                className="inputfields"
                                placeholder="e.g. Bengaluru / San Jose"
                            />
                        </Field>
                    )}
                />

                {/* State */}
                <Controller
                    name="state"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="State / Province / Region"
                            htmlFor="state"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="state"
                                autoComplete="address-level1"
                                className="inputfields"
                                placeholder="e.g. Karnataka / California"
                            />
                        </Field>
                    )}
                />

                {/* Postal Code */}
                <Controller
                    name="postalCode"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="PIN Code / Postal Code"
                            htmlFor="postalCode"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="postalCode"
                                autoComplete="postal-code"
                                inputMode="numeric"
                                className="inputfields"
                                placeholder="e.g. 560001 or 94016"
                            />
                        </Field>
                    )}
                />

                {/* Area Code */}
                <Controller
                    name="areaCode"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Area Code (PIN Code)"
                            htmlFor="areaCode"
                            optionalText="Auto-syncs"
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="areaCode"
                                className="inputfields"
                                placeholder="Postal code mirror"
                            />

                            <p className="text-[10px] text-on-surface-variant">
                                Maps to payload addressRequest.pincode
                            </p>
                        </Field>
                    )}
                />

            </div>
        </section>
    )
}

export default AddressForm