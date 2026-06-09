import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</div>
        </div>
    );
}
