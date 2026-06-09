import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["ru", "kz"],
    defaultLocale: "ru",
    // localePrefix: 'as-needed' // опционально, если хотите скрыть /ru в URL
});

// Экспортируем адаптированные методы навигации
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
