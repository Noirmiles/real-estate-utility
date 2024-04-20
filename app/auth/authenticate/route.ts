//Omitted as of now


/*
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '@/lib/Prisma';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ message: 'Authorization header missing.' }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return new Response(JSON.stringify({ message: 'Token missing.' }), { status: 401 });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;
            if (typeof decoded === 'string' || !decoded.userId) {
                throw new Error("Invalid token payload");
            }
            userId = decoded.userId;
        } catch (error) {
            console.error('Error verifying token:', error);
            return new Response(JSON.stringify({ message: 'Invalid or expired token.' }), { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true, email: true, password: false }  // It's crucial not to send the password hash back!
        });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found.' }), { status: 404 });
        }

        return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error fetching user details:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
}*/