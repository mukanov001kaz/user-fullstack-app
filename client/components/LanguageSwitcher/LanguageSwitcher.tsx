"use client";
import { useRouter, usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale;

        router.replace(segments.join("/"));
        router.refresh();
    };
    return (
        <Select value={pathname.split("/")[1]} onValueChange={changeLanguage}>
            <SelectTrigger className="w-full max-w-26">
                <SelectValue placeholder="Выберите язык" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Языки</SelectLabel>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="kz">Қазақша</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
