import { Container } from "inversify";
import TYPES from "@/config/types";

import {
  PitchDeckService,
  PitchDeckServiceImpl,
} from "@/services/PitchDeckService";

const container = new Container();

container.bind<PitchDeckService>(TYPES.PitchDeck).to(PitchDeckServiceImpl);

export default container;
