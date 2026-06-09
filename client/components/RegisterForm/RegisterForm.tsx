"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { createRegisterUserSchema } from "@/schemas/register.schema";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function RegisterForm() {
    const router = useRouter();
    const registerSchemaT = useTranslations("register");
    const registerFormT = useTranslations("loginForm");
    const authT = useTranslations("auth");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const UserShema = createRegisterUserSchema(registerSchemaT);
    type FormData = z.infer<typeof UserShema>;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(UserShema), mode: "onChange" });

    async function registerUser(data: FormData) {
        setLoading(true);
        try {
            const response = await api.post("/auth/register", data);

            if (response.status === 201 || response.status === 200) {
                toast.success(authT(response.data.message));

                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }

            reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message;

                if (errorMessage === "emailAlreadyExists") {
                    setError("email", { type: "server", message: authT("emailAlreadyExists") });
                } else {
                    console.error("Ошибка при регистрации:", errorMessage || error.message);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = (data: FormData) => {
        const { confirmPassword, ...dataToSubmit } = data;
        registerUser(dataToSubmit);
    };

    return (
        <div className="">
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />

            <div className="w-3xl bg-transparent border border-gray-300 rounded-2xl p-8 shadow-xl space-y-7">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-6 text-shadow-lg">
                    {registerFormT("registration")}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                id="name"
                                type="text"
                                placeholder={registerFormT("name")}
                                {...register("name")}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none transition ${errors.name ? "border-red-500" : "border-zinc-300"}`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm text-left mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                placeholder={registerFormT("email")}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none  transition ${errors.email ? "border-red-500" : "border-zinc-300"}`}
                                type="text"
                                {...register("email")}
                                id="email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm text-left mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                placeholder={registerFormT("password")}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none  transition ${errors.password ? "border-red-500" : "border-zinc-300"}`}
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                id="password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm text-left mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                placeholder={registerFormT("confirmPassword")}
                                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none transition ${errors.confirmPassword ? "border-red-500" : "border-zinc-300"}`}
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                id="confirmPassword"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 outline-none"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm text-left mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <LoaderCircle className="h-6 w-6 animate-spin mx-auto" /> : registerFormT("signUp")}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">{registerFormT("or")}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Register */}
                <div className="text-center text-sm text-gray-500">
                    {registerFormT("noAccount")}{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        {registerFormT("loginButton")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
