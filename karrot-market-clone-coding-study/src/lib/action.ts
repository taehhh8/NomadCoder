"use server";

import { tweetSchema } from "@/lib/validation";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "./sesstion";

// 폼 상태 타입 정의
interface FormState {
  error?: string;
  success?: boolean;
}

export async function createTweet(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return { error: "You must be logged in to tweet" };
  }

  const content = formData.get("content");

  // Validate tweet content
  const validation = tweetSchema.safeParse({ content });
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  try {
    await prisma.tweet.create({
      data: {
        content: validation.data.content,
        userId: session.userId!,
      },
    });

    // 홈페이지 재검증
    revalidatePath("/");
    return { success: true };
} catch (error) {
    console.error('Tweet creation failed:', error);
    return { error: "Failed to create tweet" };
  }
}