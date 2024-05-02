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

export async function getMessage(ctx: Context): Promise<void> {
    // Validate and parse query parameters
    const userId = parseInt(ctx.query.userId as string);
    const agentId = parseInt(ctx.query.agentId as string);

    // Check if the parameters are valid numbers
    if (isNaN(userId) || isNaN(agentId)) {
        ctx.status = 400;
        ctx.body = { message: 'Invalid user or agent ID' };
        return;
    }

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: agentId },
                    { senderId: agentId, receiverId: userId }
                ]
            }
        });
        ctx.status = 200;
        ctx.body = messages;
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        ctx.status = 500;
        ctx.body = { message: 'Failed to fetch messages' };
    }
}

export async function deleteMessage(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    try {
        const message = await prisma.message.delete({
            where: { id: parseInt(id) }
        });
        ctx.status = 200;
        ctx.body = { message: 'Message deleted successfully' };
    } catch (error) {
        console.error('Failed to delete message:', error);
        ctx.status = 500;
        ctx.body = { message: 'Failed to delete message' };
    }
}