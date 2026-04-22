import { RealEstateNavbar } from "@/components/realestate/Navbar";
import { RestaurantFooter } from "@/components/restaurant/Footer";

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <RealEstateNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <RestaurantFooter />
    </div>
  );
}
