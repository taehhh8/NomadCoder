import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Tweet {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    username: string;
  };
}

interface TweetListProps {
  tweets: Tweet[];
}

export default function TweetList({ tweets }: TweetListProps) {
  return (
    <div className='space-y-4'>
      {tweets.map((tweet) => (
        <Link
          key={tweet.id}
          href={`/tweets/${tweet.id}`}
          className='block p-4 border rounded-lg hover:bg-gray-50 transition-colors'
        >
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-medium text-gray-900'>@{tweet.user.username}</p>
              <p className='mt-1 text-gray-600'>{tweet.content}</p>
            </div>
            <span className='text-sm text-gray-500'>
              {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
