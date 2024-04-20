import bcrypt from 'bcryptjs';
import prisma from '@/lib/Prisma';

export async function POST(req: Request) {
    try {
        const { email, username, password, firstName, lastName, isManager } = await req.json();

        // Validate email uniqueness
        const existingAgent = await prisma.agent.findUnique({
            where: { username }
        });
        if (existingAgent) {
            return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create agent
        const agent = await prisma.agent.create({
            data: {
                email,
                username,
                 firstName,  
                 lastName,    
                password: hashedPassword,
                //isManager: Boolean(isManager), //change in schema 
            },
        });

        
        return new Response(JSON.stringify({ message: 'Agent registered successfully' }), { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        // Error response
        return new Response(JSON.stringify({ message: 'Failed to register agent' }), { status: 500 });
    }
}