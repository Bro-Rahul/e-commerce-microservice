import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import RegisterForm from './RegisterForm'

const RegisterTab = () => {
    return (
        <Tabs defaultValue="customer" className="w-full">
            {/* Toggle */}
            <TabsList className="grid grid-cols-2 w-full bg-transparent rounded-none h-auto p-0">
                <TabsTrigger
                    value="customer"
                    className="text-body-md font-bold data-[state=active]:border-b-2 data-[state=active]:border-secondary"
                >
                    Customer
                </TabsTrigger>

                <TabsTrigger
                    value="seller"
                    className="text-body-md font-medium data-[state=active]:border-b-2 data-[state=active]:border-secondary"
                >
                    Seller
                </TabsTrigger>
            </TabsList>

            {/* Customer */}
            <TabsContent value="customer">
                <RegisterForm mode="customer" />
            </TabsContent>

            {/* Seller */}
            <TabsContent value="seller">
                <RegisterForm mode="seller" />
            </TabsContent>
        </Tabs>
    )
}

export default RegisterTab