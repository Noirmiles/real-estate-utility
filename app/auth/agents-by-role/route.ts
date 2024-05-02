import prisma from '@/lib/Prisma';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const roleIdParam = url.searchParams.get('roleId');
        if (!roleIdParam) {
          return new Response(JSON.stringify({ message: 'Role ID is required.' }), { status: 400 });
        }
  
        const roleId = parseInt(roleIdParam, 10);
        if (isNaN(roleId)) {
          return new Response(JSON.stringify({ message: 'Role ID must be a number.' }), { status: 400 });
        }
  
        const agents = await prisma.agent.findMany({
          where: { roleId },
          select: { id: true, firstName: true, lastName: true, username: true, email: true }
        });
  
        return new Response(JSON.stringify({ agents }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
      } catch (error) {
        console.error('Error fetching agents:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
      }
  }
