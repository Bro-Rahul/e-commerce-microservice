import { SellerDashboard } from "@/components/seller/SellerDashboard";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function DashboardPage() {
  const session = await getServerSession(options);
  return <SellerDashboard sellerName={session?.user?.username || "Global Stores LLC"} />;
}
