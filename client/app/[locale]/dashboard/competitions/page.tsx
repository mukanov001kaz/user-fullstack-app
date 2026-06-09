import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations("headerBottom");
    return <h1 className="text-2xl font-bold">{t("title")} соревнованя</h1>;
}
