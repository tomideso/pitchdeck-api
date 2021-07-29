import { Router, Application } from "express";
// import * as passport from "passport";
import PitchDeckController from "@/Controller/PitchDeckController";

const publicRoutes = [
  {
    route: "/pitchdeck",
    controller: PitchDeckController,
  },
];

const privateRoutes = [];

export const registerRoutes = (app: Application): void => {
  const routesV1 = Router();

  publicRoutes.map(({ route, controller }) => {
    routesV1.use(route, controller());
  });

  // privateRoutes.map(({ route, controller }) => {
  //   routesV1.use(
  //     route,
  //     passport.authenticate("jwt", { session: false }),
  //     controller()
  //   );
  // });

  app.use("/v1", routesV1);
};
