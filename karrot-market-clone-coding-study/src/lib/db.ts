// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// 데이터베이스 연결 테스트 함수
async function test() {
  try {
    // 데이터베이스 연결 테스트
    await db.$connect();
    console.log("✅ Database connection successful");

    // 기본 쿼리 테스트
    const result = await db.user.count();
    console.log("📊 Total users:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    // 테스트 후 연결 해제
    await db.$disconnect();
  }
}

// 개발 환경에서만 테스트 실행
if (process.env.NODE_ENV !== "production") {
  test();
}

export default db;
