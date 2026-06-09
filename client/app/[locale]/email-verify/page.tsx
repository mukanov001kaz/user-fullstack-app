"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

type VerifyResponse = {
    message: string;
};

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Реф для предотвращения двойного запроса в StrictMode
    const isMounted = useRef(false);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setError("Токен не найден в ссылке");
            setLoading(false);
            return;
        }

        // Предотвращаем повторный вызов
        if (isMounted.current) return;
        isMounted.current = true;

        const verifyEmail = async () => {
            try {
                const res = await axios.post<VerifyResponse>("http://localhost:5000/email/verify", { token });

                // Axios доходит сюда ТОЛЬКО при статус-кодах 2xx
                setSuccess(true);

                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } catch (err: unknown) {
                // Извлекаем сообщение об ошибке, пришедшее с бэкенда NestJS
                if (axios.isAxiosError(err) && err.response?.data) {
                    const serverMessage = (err.response.data as any).message;
                    setError(
                        Array.isArray(serverMessage) ? serverMessage[0] : serverMessage || "Ошибка валидации токена",
                    );
                } else {
                    setError((err as Error).message || "Ошибка подключения к серверу");
                }
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    // ТЕКУЩЕЕ СОСТОЯНИЕ: ЗАГРУЗКА
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-500 text-lg animate-pulse">Проверка вашего email...</p>
            </div>
        );
    }

    // ТЕКУЩЕЕ СОСТОЯНИЕ: ОШИБКА
    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <p className="text-gray-400 text-sm">
                        Если ссылка устарела, вернитесь в личный кабинет и запросите письмо повторно.
                    </p>
                </div>
            </div>
        );
    }

    // ТЕКУЩЕЕ СОСТОЯНИЕ: УСПЕХ
    if (success) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-green-600 text-2xl font-semibold">Email успешно подтвержден 🎉</p>
                    <p className="text-gray-500 mt-2">Вы будете перенаправлены на главную страницу...</p>
                </div>
            </div>
        );
    }

    return null;
}
