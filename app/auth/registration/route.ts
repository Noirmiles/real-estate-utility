import bcrypt from 'bcryptjs';
import prisma from '@/lib/Prisma';

export async function POST(req: Request) {
    try {
        const { email, username, password, firstName, lastName, role: roleString } = await req.json();

        // Role mapping using environment variables or directly
        const roles: { [key: string]: number } = {
            agent: 2,    // Role ID for agent
            manager: 3   // Role ID for manager
        };

        const normalizedRole = roleString.trim().toLowerCase();
        const roleId = roles[normalizedRole];  // Get the roleId from the roles object

        if (!roleId) {
            return new Response(JSON.stringify({ message: 'Invalid role specified' }), { status: 400 });
        }

        // Validate email and username uniqueness
        const existingAgent = await prisma.agent.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            },
        });

        if (existingAgent) {
            return new Response(JSON.stringify({ message: 'Username or Email already in use' }), { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure the role exists in the database, create if not
        const roleExists = await prisma.role.findUnique({
            where: { id: roleId }
        });

        if (!roleExists) {
            // Optionally create the role if it's part of the known roles and not in DB (rare case scenario)
            await prisma.role.create({
                data: { name: normalizedRole }
            });
        }

        // Create agent with determined roleId
        const agent = await prisma.agent.create({
            data: {
                email,
                username,
                firstName,
                lastName,
                password: hashedPassword,
                roleId: roleId,  // Use the dynamically determined roleId
            },
        });

        const { password: _, ...agentWithoutPassword } = agent;  // Exclude password from the agent data returned
        return new Response(JSON.stringify(agentWithoutPassword), { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ message: 'Failed to register agent', details: error }), { status: 500 });
    }
}


