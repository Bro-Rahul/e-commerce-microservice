import RegisterTab from './RegisterTab'

const RegisterCard = () => {
    return (
        <div className='w-full max-w-md'>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-on-surface mb-6">
                    Sign Up
                </h2>
                <RegisterTab />
            </div>
            <p className="mt-6 text-center text-xs text-on-surface-variant">
                By continuing, you agree to ShopDirect's
                <a href="#" className="mx-1 text-secondary hover:underline">
                    Conditions of Use
                </a>
                and
                <a href="#" className="ml-1 text-secondary hover:underline">
                    Privacy Notice
                </a>
            </p>
        </div>
    )
}

export default RegisterCard