import {
    UserRound,
    Eye,
    EyeClosed,
} from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"

import SectionHeading from "./SectionHeading"
import Field from "./Field"
import { useState } from "react"
import { CustomerRegistrationType } from "@/validators/auth/CustomerRegisterationValidator"

const UserDetailForm = () => {
    const [showPassword, setShowPassword] = useState<{
        viewPassword: boolean,
        viewComfirmPassword: boolean

    }>({
        viewComfirmPassword: false,
        viewPassword: false
    });
    const {
        control,
    } = useFormContext<CustomerRegistrationType>()

    return (
        <section className="overflow-hidden rounded-sm border border-outline-variant bg-surface-container-lowest">
            <SectionHeading
                icon={UserRound}
                title="1. Personal Information"
                description="Primary credentials used for account authentication and direct communication"
                badge="Required"
            />

            <div className="grid gap-x-3 gap-y-2.5 p-3 sm:grid-cols-2">

                {/* First Name */}
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="First Name"
                            htmlFor="firstName"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="firstName"
                                autoComplete="given-name"
                                className="inputfields"
                                placeholder="Enter your first name"
                            />
                        </Field>
                    )}
                />

                {/* Last Name */}
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Last Name"
                            htmlFor="lastName"
                            required
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="lastName"
                                autoComplete="family-name"
                                className="inputfields"
                                placeholder="Enter your last name"
                            />
                        </Field>
                    )}
                />

                {/* Email */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Email Address"
                            htmlFor="customerEmail"
                            required
                            optionalText="We'll verify this next"
                            error={error?.message}
                        >
                            <input
                                {...field}
                                id="customerEmail"
                                type="email"
                                autoComplete="email"
                                className="inputfields"
                                placeholder="rahul@gmail.com"
                            />

                            <p className="text-[10px] text-on-surface-variant">
                                Used for order confirmations and invoices
                            </p>
                        </Field>
                    )}
                />

                {/* Phone */}
                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Mobile Phone Number"
                            htmlFor="phoneNumber"
                            required
                            error={error?.message}
                        >
                            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2">

                                <Controller
                                    name="phoneCountryCode"
                                    control={control}
                                    render={({ field: countryField }) => (
                                        <select
                                            {...countryField}
                                            aria-label="Country calling code"
                                            autoComplete="tel-country-code"
                                            className="inputfields"
                                        >
                                            <option value="+91">
                                                IN +91
                                            </option>
                                            <option value="+1">
                                                US +1
                                            </option>
                                            <option value="+44">
                                                UK +44
                                            </option>
                                        </select>
                                    )}
                                />

                                <input
                                    {...field}
                                    id="phoneNumber"
                                    autoComplete="tel"
                                    inputMode="tel"
                                    className="inputfields"
                                    placeholder="12345 / mobile number"
                                />
                            </div>
                        </Field>
                    )}
                />

                {/* Password */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Password"
                            htmlFor="customerPassword"
                            required
                            error={error?.message}
                        >
                            <div className="relative">
                                <input
                                    {...field}
                                    id="customerPassword"
                                    type={showPassword.viewPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    className="inputfields pr-9"
                                    placeholder="Enter Password"
                                />

                                <button
                                    type="button"
                                    aria-label="Show password"
                                    className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-on-surface-variant"
                                    onClick={() => setShowPassword(pre => ({ ...pre, viewPassword: !pre.viewPassword }))}
                                >
                                    {showPassword.viewPassword ? <Eye
                                        aria-hidden="true"
                                        className="size-4"
                                    /> : <EyeClosed className="size-4" />}
                                </button>
                            </div>
                        </Field>
                    )}
                />

                {/* Confirm Password */}
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            label="Confirm Password"
                            htmlFor="confirmPassword"
                            required
                            error={error?.message}
                        >
                            <div className="relative">
                                <input
                                    {...field}
                                    id="confirmPassword"
                                    type={showPassword.viewComfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    className="inputfields pr-9"
                                    placeholder="Re-enter password"
                                />

                                <button
                                    type="button"
                                    aria-label="Show password"
                                    className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-on-surface-variant"
                                    onClick={() => setShowPassword(pre => ({ ...pre, viewComfirmPassword: !pre.viewComfirmPassword }))}
                                >
                                    {showPassword.viewComfirmPassword ? <Eye
                                        aria-hidden="true"
                                        className="size-4"
                                    /> : <EyeClosed className="size-4" />}
                                </button>
                            </div>
                        </Field>
                    )}
                />
            </div>
        </section>
    )
}

export default UserDetailForm