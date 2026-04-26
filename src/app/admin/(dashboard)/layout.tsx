import { Metadata } from "next";
import Sidebar from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";

export const metadata: Metadata = {
  title: "Admin Dashboard | Webkye",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
