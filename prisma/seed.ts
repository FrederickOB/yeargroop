import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const organization = await prisma.organization.upsert({
    where: { name: "school1" },
    update: {},
    create: {
      name: "school1",
      logo: "",
      color: "blue",
    },
  });
  const organization_year_group = await prisma.organizationYearGroup.upsert({
    where: { year: "2014" },
    update: {},
    create: {
      year: "2014",
      organization_id: 1,
    },
  });
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password: "aaasdfasdfasdfsd",
      first_name: "test",
      last_name: "tester",
      phone_number: "0200000000",
      organization_year_group_id: 1,
    },
  });

  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
