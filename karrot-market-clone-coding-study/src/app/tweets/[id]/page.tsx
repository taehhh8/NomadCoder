import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { getSession } from "@/lib/sesstion";

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
    },
  });

  if (!tweet) {
    notFound();
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
            {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      {/* 여기에 나중에 답글 기능을 추가할 예정 */}
    </div>
  );
} 