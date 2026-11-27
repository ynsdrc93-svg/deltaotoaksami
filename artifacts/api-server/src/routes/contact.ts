import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/contact", (_req, res) => {
  res.status(410).json({ error: "Talebinizi info@deltaoto.com adresine e-posta ile gönderebilirsiniz." });
});

export default router;
