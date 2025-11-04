import z from "zod";

export const commonSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const formSchema = z.object({
  fullname: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be no more than 15 digits")
    .regex(/^\d+$/, "Contact number must contain only digits"),

  location: z
    .string()
    .min(1, "Location is required"),

  dob: z
    .string()
    .min(1, "Date of birth is required"),

  gender: z
    .string()
    .min(1, "Gender is required"),
});
