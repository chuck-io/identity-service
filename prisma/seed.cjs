const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'TEACHER',
  'STUDENT',
  'FINANCIAL',
  'SECRETARY',
  'ENTRERPRISE',
];

async function main() {
  await prisma.role.createMany({
    data: ROLES.map((name) => ({ name })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

