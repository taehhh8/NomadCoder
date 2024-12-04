import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import TweetList from "@/components/tweet-list";
import Pagination from "@/components/Pagination";
import { getSession } from "@/lib/sesstion";
import AddTweet from "@/components/AddTweet";

// 한 페이지당 표시할 트윗 수
const TWEETS_PER_PAGE = 10;

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/log-in");
  }

  // 현재 페이지 번호 (기본값: 1)
  const currentPage = Number(searchParams.page) || 1;

  // 전체 트윗 수 조회
  const totalTweets = await prisma.tweet.count();
  const totalPages = Math.ceil(totalTweets / TWEETS_PER_PAGE);

  // 페이지네이션된 트윗 목록 조회
  const tweets = await prisma.tweet.findMany({
    skip: (currentPage - 1) * TWEETS_PER_PAGE,
    take: TWEETS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-8'>Home</h1>
      <AddTweet />
      <TweetList tweets={tweets} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
