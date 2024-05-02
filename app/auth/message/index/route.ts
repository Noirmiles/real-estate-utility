import Router from 'koa-router';
import { sendMessage,getMessage,deleteMessage } from '../messageController/route';
const messageRouter = new Router({prefix: 'auth/message'});

messageRouter.post('/send', sendMessage);
messageRouter.get('/get', getMessage);
messageRouter.delete('/delete/:id', deleteMessage);

export default messageRouter;