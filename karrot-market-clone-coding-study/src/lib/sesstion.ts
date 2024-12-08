import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// iron-session 타입 확장
declare module "iron-session" {
  interface IronSessionData {
    userId?: number;
    username?: string;
    isLoggedIn: boolean;
  }
}

// 통합된 세션 옵션
const sessionOptions = {
  password: process.env.SESSION_PASSWORD!, // 최소 32자 이상의 복잡한 문자열이어야 함
  cookieName: "user-session",
  ttl: 0, // 세션 만료 시간 (0은 브라우저 종료 시 만료)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

// 세션 가져오기 함수
export async function getSession() {
  const request = new Request("http://localhost", {
    headers: {
      cookie: cookies().toString(),
    },
  });

  const response = new Response();

  const session = await getIronSession(request, response, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
}
