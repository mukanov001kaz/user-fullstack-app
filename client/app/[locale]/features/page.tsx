import React from "react";
import { useTranslations } from "next-intl";

const Features = () => {
    const t = useTranslations("headerBottom");
    return <div>{t("title")}</div>;
};

export default Features;
