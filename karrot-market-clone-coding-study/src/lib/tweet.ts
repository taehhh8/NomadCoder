"use server";

import { revalidatePath } from "next/cache";
import { ResponseSchema } from "./validation";
import prisma from "./db";
import { getSession } from "./sesstion";

export async function createResponse(tweetId: number, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("로그인이 필요합니다.");
  }

  const content = formData.get("content") as string;
  const validatedData = .parse({ content });

  const response = await prisma.response.create({
    data: {
      content: validatedData.content,
      userId: session.user.id,
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  revalidatePath(`/tweets/${tweetId}`);
  return response;
}

export async function toggleLike(tweetId: number) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("로그인이 필요합니다.");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_tweetId: {
        userId: session.user.id,
        tweetId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return false;
  } else {
    await prisma.like.create({
      data: {
        userId: session.user.id,
        tweetId,
      },
    });
    return true;
  }
}
