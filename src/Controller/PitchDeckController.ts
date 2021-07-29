import { NextFunction, Request, Response, Router } from "express";
import { PitchDeckServiceImpl } from "@/services/PitchDeckService";
import TYPES from "@/config/types";

import container from "@/container/inversify.config";
import { AppError } from "@/ErrorHandler/AppError";

export default () => {
  const PitchDeckService = container.get<PitchDeckServiceImpl>(TYPES.PitchDeck);
  const router = Router();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pitchDecks = await PitchDeckService.getAllPitchDeck();
      res.send(pitchDecks);
    } catch (error) {
      console.log(error);
      const err = new AppError("Error getting pitch deck list", 400);
      return next(err);
    }
  });

  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const pitchDeck = await PitchDeckService.getPitchDeckById(
          req.params.id
        );
        res.send(pitchDeck);
      } catch (error) {
        console.log(error);
        const err = new AppError("Error getting PitchDeck", 400);
        return next(err);
      }
    }
  );

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { files } = req as any;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    try {
      await PitchDeckService.savePdfFile(files.file);
      await PitchDeckService.convertPdfToImages(files.file);

      const pitchDeck = await PitchDeckService.addPitchDeck(req.body);
      res.send(pitchDeck);
    } catch (error) {
      console.log(error);
      const err = new AppError("Error saving PitchDeck", 400);
      return next(err);
    }
  });

  return router;
};
