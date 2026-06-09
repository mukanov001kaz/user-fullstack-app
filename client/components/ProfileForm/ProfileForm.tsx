"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
    fullName: z.string().min(2, "Минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    phone: z.string().min(6, "Введите номер телефона"),
    city: z.string().min(2, "Введите город"),
    age: z.number().min(1, "Возраст обязателен"),
    bio: z.string().max(500, "Максимум 500 символов").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ProfileFormData) => {
        try {
            console.log(data);

            const response = await fetch("http://localhost:3000/profile/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Ошибка создания профиля");
            }

            const result = await response.json();

            console.log(result);

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold mb-6">Заполнение профиля</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* ФИО */}
                    <div>
                        <label className="block mb-2 font-medium">ФИО</label>

                        <input
                            type="text"
                            {...register("fullName")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Введите ФИО"
                        />

                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium">Email</label>

                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Введите email"
                        />

                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Телефон */}
                    <div>
                        <label className="block mb-2 font-medium">Телефон</label>

                        <input
                            type="text"
                            {...register("phone")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            placeholder="+7 777 777 77 77"
                        />

                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Город */}
                    <div>
                        <label className="block mb-2 font-medium">Город</label>

                        <input
                            type="text"
                            {...register("city")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            placeholder="Астана"
                        />

                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Возраст */}
                    <div>
                        <label className="block mb-2 font-medium">Возраст</label>

                        <input
                            type="number"
                            {...register("age")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        />

                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                    </div>

                    {/* О себе */}
                    <div>
                        <label className="block mb-2 font-medium">О себе</label>

                        <textarea
                            {...register("bio")}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black min-h-[120px]"
                            placeholder="Информация о себе"
                        />

                        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                    </div>

                    {/* Кнопка */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white rounded-xl py-3 font-medium hover:opacity-90 transition"
                    >
                        {isSubmitting ? "Сохранение..." : "Создать профиль"}
                    </button>
                </form>
            </div>
        </div>
    );
}
