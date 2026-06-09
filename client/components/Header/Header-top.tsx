import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const navLinks = [
    { name: "home", href: "/" },
    { name: "features", href: "/features" },
    { name: "about", href: "/docs" },
    { name: "contact", href: "/contact" },
    { name: "dashboard", href: "/dashboard" },
];

const HeaderTop = () => {
    const t = useTranslations("headerTop");

    return (
        <section className="max-w-7xl mx-auto w-full px-10 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-900">
                User Management
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="hover:text-blue-600">
                        {t(link.name)}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="outline" size="lg">
                        {t("login")}
                    </Button>
                </Link>

                <Link href="/register">
                    <Button variant="primary" size="lg">
                        {t("signup")}
                    </Button>
                </Link>
            </div>
            <LanguageSwitcher />
        </section>
    );
};

export default HeaderTop;
