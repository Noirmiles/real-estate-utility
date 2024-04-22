import bcrypt from 'bcryptjs';
import prisma from '@/lib/Prisma';  
import jwt from 'jsonwebtoken';


export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Username and password are required.' }), { status: 400 });
    }

    const agent = await prisma.agent.findUnique({
      where: { username },
      select: { id: true, username: true, password: true, firstName: true, lastName: true, email:true, role:true }
    });

    if (!agent) {
      return new Response(JSON.stringify({ message: 'User not found.' }), { status: 404 });
    }

    const passwordIsValid = await bcrypt.compare(password, agent.password);
    if (!passwordIsValid) {
      return new Response(JSON.stringify({ message: 'Invalid password.' }), { status: 401 });
    }

    const accessToken = jwt.sign(
      { userId: agent.id, username: agent.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {userId: agent.id, username: agent.username},
      process.env.JWT_SECRET || 'default_secret',
      {expiresIn: '7d'}
    )

    const { password: _, ...userWithoutPassword } = agent; 
    
    
    return new Response(JSON.stringify({
      message: "Login successful",
      user: userWithoutPassword,
      accessToken: accessToken
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json' ,
        'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}