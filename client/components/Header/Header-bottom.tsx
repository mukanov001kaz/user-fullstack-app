import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeaderBottom = () => {
    const t = useTranslations("headerBottom");

    return (
        <section className="pt-32 pb-20 px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">{t("title")}</h1>
                <p className="text-xl text-gray-700 max-w-md">{t("description")}</p>

                <div className="flex items-center gap-4">
                    <Link
                        href="/register"
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 hover:bg-blue-700"
                    >
                        {t("getStarted")} <span>→</span>
                    </Link>
                    <Link
                        href="/docs"
                        className="bg-white border border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 shadow-sm hover:bg-gray-50"
                    >
                        <span className="text-blue-600">✔</span> {t("readDocs")}
                    </Link>
                </div>
            </div>

            <div className="relative">
                <Image src="/user/user.png" alt="user" width={600} height={400} priority className="object-contain" />
            </div>
        </section>
    );
};

export default HeaderBottom;
