import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      token: "12312312",
    },
    include: {
      user: true,
    },
  });
  console.log(token);
}
test();

export default db;
