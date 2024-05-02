import Koa from 'koa';
import bodyParser from 'koa-body';
import cors from '@koa/cors';
import messageRouter from '../auth/message/index/route';

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(messageRouter.routes()).use(messageRouter.allowedMethods());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
