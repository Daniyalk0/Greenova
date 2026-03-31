import { z } from "zod";

// ✅ Reusable password validation
const passwordSchema = z
  .string()
  .nonempty("Password is required") // ⬅️ explicit required
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be at most 100 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: passwordSchema,
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

export const setPasswordSchema = z.object({
  newPassword: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema.nonempty("Old password is required"),

    newPassword: passwordSchema.nonempty("New password is required"),

    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  // ✅ confirmPassword matches newPassword
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  // ✅ newPassword not same as oldPassword
  .refine((data) => data.newPassword !== data.oldPassword, {
    path: ["newPassword"],
    message: "New password cannot be the same as old password",
  });



export const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10 digit phone"),

  street: z.string().min(5, "Street address is required"),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),

  landmark: z.string().optional()
})

export type AddressFormValues = z.infer<typeof addressSchema>