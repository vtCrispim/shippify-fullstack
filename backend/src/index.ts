import { app } from "./server/Server";

const port = process.env.PORT || 3333

app.listen(port, () => { console.log(`Listening at port ${port}`) })