"use client";

import { useOptimistic } from "react";
import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { getSession } from "@/lib/sesstion";
import { createResponse, toggleLike } from "@/lib/actions/tweet";

interface TweetPageProps {
  params: {
    id: string;
  };
}

export default async function TweetPage({ params }: TweetPageProps) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/log-in");
  }

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      responses: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
    },
  });

  if (!tweet) {
    notFound();
  }

  const [optimisticResponses, addOptimisticResponse] = useOptimistic<
    typeof tweet.responses
  >(tweet.responses, (state, newResponse) => [newResponse, ...state]);

  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    tweet.likes.length,
    (state, liked: boolean) => (liked ? state + 1 : state - 1)
  );

  async function handleResponse(formData: FormData) {
    const content = formData.get("content") as string;

    addOptimisticResponse({
      id: Math.random(),
      content,
      createdAt: new Date(),
      user: { username: session.username! },
    });

    await createResponse(tweet.id, formData);
  }

  async function handleLike() {
    const liked = await toggleLike(tweet.id);
    addOptimisticLikes(liked);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">@{tweet.user.username}</p>
            <p className="mt-2 text-xl">{tweet.content}</p>
          </div>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(tweet.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500"
          >
            <svg
              className={`w-5 h-5 ${
                optimisticLikes > 0 ? "fill-red-500" : "fill-none"
              } stroke-current`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{optimisticLikes}</span>
          </button>
        </div>
      </div>

      <div className="mt-6">
        <form action={handleResponse} className="mb-6">
          <textarea
            name="content"
            className="w-full p-3 border rounded-lg"
            placeholder="답글을 작성하세요..."
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            답글 작성
          </button>
        </form>

        <div className="space-y-4">
          {optimisticResponses.map((response) => (
            <div key={response.id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-medium text-gray-900">
                @{response.user.username}
              </p>
              <p className="mt-1">{response.content}</p>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(response.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
