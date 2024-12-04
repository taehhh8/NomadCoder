import { z } from "zod";

// 기존 유저 스키마 유지
export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
});

// 트윗 스키마 추가
export const tweetSchema = z.object({
  content: z
    .string()
    .min(1, "Tweet cannot be empty")
    .max(280, "Tweet cannot exceed 280 characters"),
});

// 타입 내보내기
export type UserSchema = z.infer<typeof userSchema>;
export type TweetSchema = z.infer<typeof tweetSchema>;