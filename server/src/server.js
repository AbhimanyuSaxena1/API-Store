import { app } from "./app.js";
import { connectDB } from "./configs/db.config.js";
import { PORT as envPORT} from "./configs/env.config.js";

const PORT = envPORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
