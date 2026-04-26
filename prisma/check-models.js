const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
  console.log("Models found in Prisma Client:");
  console.log(Object.keys(prisma).filter(k => !k.startsWith("_")));
  if (prisma.testimonial) {
    console.log("SUCCESS: 'testimonial' model exists.");
  } else {
    console.log("FAILURE: 'testimonial' model NOT found.");
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
