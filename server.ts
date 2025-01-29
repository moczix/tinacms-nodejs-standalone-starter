import express, { RequestHandler } from "express";
import {
  TinaNodeBackend,
  LocalBackendAuthProvider,
  NodeApiHandler,
} from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";
import cors from "cors";
import cookieParser from "cookie-parser";

import { databaseClient } from "./tina/__generated__/databaseClient";

const port: number | string = process.env.PORT || 3006;

const app: express.Express = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const isLocal: boolean = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler: NodeApiHandler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: "your-secret",
        }),
      }),
  databaseClient,
});

const handleTina: RequestHandler = async (req, res) => {
  req.query = {
    ...(req.query || {}),
    routes: req.params[0].split("/"),
  };

  await handler(req, res);
};

app.all("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  handleTina(req, res, next);
});

app.listen(port, () => {
  console.log(`express backend listing on port ${port}`);
});
