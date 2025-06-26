import express from "express";
import serverless from "serverless-http";
import router from "../routes/routes";

const app = express();
app.use(express.json());

app.use("/", router);

// Use this for unhandled routes
app.use((req, res) => {
  try {
    console.log(`No route found for: ${req.method} ${req.path}`);
    return res.status(404).json({
      error: "Not Found",
    });
  } catch (error) {
    console.error(error, "error");
  }
});

// Configure serverless-http to handle base path mapping
export const handler = serverless(app, {
  basePath: process.env.BASE_PATH || "",
  requestId: "true",
});
