import bcrypt from 'bcryptjs';
import prisma from '@/lib/Prisma';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, username } = await req.json();

    // Validate email and username uniqueness
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ],
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email or Username already in use' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the default role exists, create if not
    let defaultRole = await prisma.role.findUnique({
      where: { name: 'user' }
    });

    if (!defaultRole) {
      defaultRole = await prisma.role.create({
        data: { name: 'user' }
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        roleId: defaultRole.id  // Use the ensured 'user' role ID
      },
    });

    const { password: _, ...userWithoutPassword } = user;  // Exclude password from the user data returned
    return new Response(JSON.stringify(userWithoutPassword), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Failed to register user:', error);
    return new Response(JSON.stringify({ message: 'Failed to create account'}), { status: 500 });
  }
}



