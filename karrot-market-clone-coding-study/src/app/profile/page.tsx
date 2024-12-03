import { redirect } from "next/navigation";
import {
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import prisma from "@/lib/db";
import { getSession } from "@/lib/sesstion";


async function getUserProfile(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
  });
}

export default async function ProfilePage() {
  const session = await getSession(); // getSelection을 getSession으로 수정

  if (!session?.isLoggedIn) {
    redirect("/log-in");
  }

  const user = await getUserProfile(session.userId!);

  if (!user) {
    redirect("/log-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          {/* 프로필 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <form action="/api/auth/logout" method="POST">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </form>
          </div>

          {/* 프로필 정보 */}
          <div className="space-y-6">
            {/* 유저 아바타 & 이름 */}
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <UserCircleIcon className="h-16 w-16 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-500">@{user.username.toLowerCase()}</p>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3 text-gray-600">
                <EnvelopeIcon className="h-5 w-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CalendarIcon className="h-5 w-5" />
                <span>
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* 프로필 수정 버튼 */}
            <div className="pt-6">
              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* 추가 섹션 */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Total Posts</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Member Since</p>
              <p className="text-2xl font-bold">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}