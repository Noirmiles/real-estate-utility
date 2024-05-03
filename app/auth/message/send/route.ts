import Koa, { Context } from 'koa';
import koaBody from 'koa-body';
import Router from 'koa-router';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

app.use(koaBody());

interface MessageData {
    senderId: number;
    receiverId: number;
    content: string;
    propertyId?: number;
}

// Validates the message data from the request body
function validateMessageData(data: Partial<MessageData>): data is MessageData {
    return data.senderId !== undefined && data.receiverId !== undefined && data.content !== undefined;
}

// Creates a new message in the database
async function createMessage(data: MessageData) {
    try {
        return await prisma.message.create({ data });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new Error('Database error occurred');
        }
        throw error;
    }
}

// POST route handler
async function POST(ctx: Context): Promise<void> {
    try {
        const data: Partial<MessageData> = ctx.request.body;

        if (!validateMessageData(data)) {
            ctx.status = 400;
            ctx.body = { message: 'Missing required fields' };
            return;
        }

        const message = await createMessage(data as MessageData);
        ctx.status = 201;
        ctx.body = message;
    } catch (error) {
        console.error('Failed to send message:', error);
        ctx.status = 500;
        ctx.body = { message: 'Failed to process request' };
    }
}
async function GET(ctx: Context): Promise<void> {
    try {
        const agentId = parseInt(ctx.query.agentId as string);
        if (!agentId) {
            ctx.status = 400;
            ctx.body = { message: 'Agent ID is required' };
            return;
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: agentId },
                    { receiverId: agentId }
                ]
            },
            include: {
                sender: true,  // Assuming you want to include details about the agent
                receiver: true   // Assuming you want to include details about the user
            }
        });

        ctx.status = 200;
        ctx.body = messages;
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        ctx.status = 500;
        ctx.body = { message: 'Failed to process request' };
    }
}

router.post('/message', POST);
router.get('/messages', GET);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

