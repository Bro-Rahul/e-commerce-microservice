import { SellerShell } from "@/components/seller/SellerShell";

const SellerLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <SellerShell>{children}</SellerShell>;
};

export default SellerLayout;
