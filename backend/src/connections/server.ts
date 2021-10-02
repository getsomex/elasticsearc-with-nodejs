import express, { Application } from 'express';
const app: Application = express();
const PORT = 9999;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export default app;
