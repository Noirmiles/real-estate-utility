// Assuming you have installed Koa and @types/koa
import { Context } from 'koa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sendMessage(ctx: Context): Promise<void> {
    try {
        const { senderId, receiverId, content, propertyId } = ctx.request.body;

        if (!senderId || !receiverId || !content) {
            ctx.status = 400;
            ctx.body = { message: 'Missing required fields' };
            return;
        }

        const message = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content,
                propertyId,
            },
        });

        ctx.status = 201;
        ctx.body = message;
    } catch (error) {
        console.error('Failed to send message:', error);
        ctx.status = 500;
        ctx.body = { message: 'Failed to process request' };
    }
}




