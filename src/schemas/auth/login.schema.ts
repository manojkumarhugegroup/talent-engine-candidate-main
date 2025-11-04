import z from "zod/v3";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

// Login schema
// .email("Invalid email").nonempty("Email is required")
export const loginSchema = z.object({
  email: z.string().nonempty("Username / Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include one uppercase letter, one number, and one special character"
    ),
});

// Signup schema
export const signUpSchema = z
  .object({
    username: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        passwordRegex,
        "Password must be at least 8 characters and include one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
