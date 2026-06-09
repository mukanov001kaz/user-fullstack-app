// import { getRequestConfig } from "next-intl/server";
// import { defaultLocale, type Locale } from "./routing";

// export default getRequestConfig(async ({ locale }) => {
//     const safeLocale: Locale = (locale as Locale) ?? defaultLocale;

//     return {
//         locale: safeLocale,
//         messages: (await import(`../messages/${safeLocale}/common.json`)).default,
//     };
// });

// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async () => {
//     // Static for now, we'll change this later
//     const locale = "ru";
//     console.log("Запрос локали:", locale, "Выбранная локаль:", locale);
//     return {
//         locale,
//         messages: (await import(`../messages/${locale}/common.json`)).default,
//     };
// });

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type SupportedLocale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    // В v4 параметр называется requestLocale и это Promise!
    const locale = await requestLocale;

    // Проверяем валидность локали
    const currentLocale: SupportedLocale = routing.locales.includes(locale as SupportedLocale)
        ? (locale as SupportedLocale)
        : (routing.defaultLocale as SupportedLocale);

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}/common.json`)).default as Record<string, unknown>,
    };
});
