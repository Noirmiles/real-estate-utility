import prisma from "@/lib/Prisma";

async function main() {
    try {
      const userRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: { name: 'user' },
      });
  
      console.log(`Role 'user' ensured with ID: ${userRole.id}`);
    } catch (error) {
        if (error instanceof Error){
      console.error("Failed to seed 'user' role:", error.message);
        } else{
            console.error("An unexpected error occureed:", error);
        }
      process.exit(1);
    } 
}
  
  
  main()
    .finally(async () => {
      await prisma.$disconnect();
    });