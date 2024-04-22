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

    const user = await prisma.user.create({
      data: {
        email,
        username,  
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const { password: _, ...userWithoutPassword } = user;  // Exclude password from the user data returned
    return new Response (JSON.stringify({message: 'User account created'}),{status:201});
  } catch (error) {
    console.error('Failed to register user:', error);
    return new Response(JSON.stringify({ message: 'Failed to create account' }), { status: 500 });
  }
}


