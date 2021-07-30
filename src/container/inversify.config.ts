import { Container } from "inversify";
import TYPES from "@/config/types";

import {
  PitchDeckService,
  PitchDeckServiceImpl,
} from "@/Services/PitchDeckService";

const container = new Container();

container.bind<PitchDeckService>(TYPES.PitchDeck).to(PitchDeckServiceImpl);

export default container;
