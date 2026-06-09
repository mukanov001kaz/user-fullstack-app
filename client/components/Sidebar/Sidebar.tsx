"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiSettings, FiBarChart2, FiCalendar } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations("dashboardMenu");
    const headerTopT = useTranslations("headerTop");

    const menu = [
        { name: "dashboard", href: "/dashboard", icon: FiHome },
        { name: "competitions", href: "/dashboard/competitions", icon: FiCalendar },
        { name: "users", href: "/dashboard/users", icon: FiUsers },
        { name: "reports", href: "/dashboard/reports", icon: FiBarChart2 },
        { name: "settings", href: "/dashboard/settings", icon: FiSettings },
    ];

    return (
        <div className="group w-64 transition-all duration-300 bg-white border-r px-4 pt-4 pb-18 flex flex-col">
            {/* Логотип */}
            <h2 className="font-bold mb-6">TRA_KAZ</h2>

            <ul className="space-y-4">
                {menu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-4 p-2 rounded transition ${
                                    pathname === item.href
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-blue-400 hover:text-white"
                                }`}
                            >
                                {/* Иконка */}
                                <Icon size={22} />

                                {/* Текст */}
                                <span>{t(item.name)}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div
                className={`${pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-blue-400 hover:text-white"} flex items-center gap-4 p-2 rounded transition mt-auto`}
            >
                <FiHome size={22} />
                <Link href="/">{headerTopT("home")}</Link>
            </div>
        </div>
    );
}
