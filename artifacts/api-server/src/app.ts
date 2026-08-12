import express, { type Express, type ErrorRequestHandler } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import type { ApiErrorBody } from "@workspace/api-zod";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Genel hata yakalayıcı — NODE_ENV'e bakmaksızın (Express'in varsayılan
// handler'ı sadece production'da stack trace'i gizler, bu ona güvenmiyor)
// istemciye her zaman temiz bir JSON dönüyor. İsim ve varsa DB hata kodu
// dışında hiçbir şey loglamıyor — err.message/err.stack, Drizzle'ın hata
// mesajlarına gömdüğü sorgu parametrelerini (yani kullanıcının form
// verisini) içerebildiği için kasıtlı olarak loglanmıyor.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const name = err instanceof Error ? err.name : typeof err;
  const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : undefined;
  logger.error({ errorName: name, errorCode: code }, "İşlenmeyen istek hatası");

  if (res.headersSent) return;
  const body: ApiErrorBody = { error: "Beklenmeyen bir hata oluştu, lütfen tekrar deneyin." };
  res.status(500).json(body);
};
app.use(errorHandler);

export default app;
