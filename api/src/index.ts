import Koa from "koa";

const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(process.env.PORT, () => {
  console.log(`Server ready http://localhost:${process.env.PORT}`);
});
