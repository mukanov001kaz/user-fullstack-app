import { z } from "zod";

export const createRegisterUserSchema = (t: (key: string) => string) =>
    z
        .object({
            name: z.string().min(3, t("nameError")),
            email: z.string().email(t("emailError")),
            password: z.string().min(6, t("passwordError")),
            confirmPassword: z.string().min(6, t("confirmPasswordError")).optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("confirmPasswordError"),
            path: ["confirmPassword"],
        });
