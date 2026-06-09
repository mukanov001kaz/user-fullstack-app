"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useTranslations } from "next-intl";

export function LoginForm() {
    const t = useTranslations("loginForm");
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const UserShema = z.object({
        email: z.string().email("Неверный формат почты"),
        password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    });

    type FormData = z.infer<typeof UserShema>;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(UserShema), mode: "onChange" });

    async function Login(data: FormData) {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/auth/login", data, { withCredentials: true });

            if (response.status === 201 || response.status === 200) {
                toast.success(t("loginSuccess"));

                setTimeout(() => {
                    router.push("/");
                }, 1500);
            }
            console.log(response.data);

            reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage && errorMessage.includes("Email")) {
                    setError("email", { type: "server", message: errorMessage });
                } else {
                    console.error("Ошибка при входе:", errorMessage || error.message);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (data: FormData) => {
        Login(data);
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-xl bg-transparent border border-gray-300 rounded-2xl p-10 shadow-xl space-y-7">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">{t("loginButton")}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            placeholder={t("email")}
                            className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? "border-red-500" : "border-zinc-300"}`}
                            type="text"
                            {...register("email")}
                            id="email"
                        />
                        {errors.email && <p className="text-red-500 text-sm text-left mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                placeholder={t("password")}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.password ? "border-red-500" : "border-zinc-300"}`}
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                id="password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm text-left mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 text-white text-md font-medium hover:bg-blue-700 transition "
                    >
                        {loading ? "Вход..." : t("loginButton")}
                    </button>
                </form>

                {/* Forgot */}
                <div className="flex justify-end mt-5">
                    <Link href="/forgot-password" className="text-sm text-gray-700 hover:text-gray-900 transition">
                        {t("forgotPassword")}
                    </Link>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">{t("or")}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Register */}
                <div className="text-center text-sm text-gray-500">
                    {t("noAccount")}{" "}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        {t("signUp")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
