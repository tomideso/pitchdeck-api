import PitchDeck from "@/Model/PitchDeck";
import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import { AppError } from "@/ErrorHandler/AppError";
import { CustomResponse } from "@/ErrorHandler/CustomResponse";
import { fromBuffer } from "pdf2pic";
import { writeFileSync } from "fs-extra";

const path = require("path");

@injectable()
export class PitchDeckServiceImpl implements PitchDeckService {
  private publicDir = path.join("", "src/public");

  constructor() {}

  public async getPitchDeckById(id) {
    return PitchDeck.findById(id).lean();
  }

  public async addPitchDeck({
    fileUrl,
    title,
    description,
    company,
    highlight = [],
  }) {
    try {
      const pitchDeck = new PitchDeck();
      Object.assign(pitchDeck, {
        fileUrl,
        title,
        description,
        company,
        highlight,
      });
    } catch (error) {
      throw new AppError(error, 400);
    }
  }

  public async getAllPitchDeck() {
    return PitchDeck.find().lean();
  }

  public async getPitchDeckAndUpdate(cond, update) {
    return PitchDeck.findOneAndUpdate(cond, update, { new: true });
  }

  public async savePdfFile(file: pitchFile) {
    const pitchDeckFile = file;
    const uploadPath = this.publicDir + "/pdf/" + pitchDeckFile.name;

    return new Promise<string>((resolve, reject) => {
      pitchDeckFile.mv(uploadPath, function (err) {
        if (err) {
          return reject("Error saving file.");
        }
        resolve("/pdf/" + pitchDeckFile.name);
      });
    });
  }

  public async convertPdfToImages(file: pitchFile) {
    const baseOptions = {
      width: 2550,
      height: 3300,
      density: 330,
      savePath: this.publicDir + "/images",
    };

    const convert = fromBuffer(file.data, baseOptions);

    return convert.bulk(-1, true).then(async (outputs) => {
      const filenames = [];
      outputs.forEach(async (output) => {
        const filename = `${file.name}-${output.page}.png`;
        try {
          await writeFileSync(
            ` ${this.publicDir}/images/${filename}`,
            output.base64,
            "base64"
          );
          filenames.push(filename);
          return filename;
        } catch (e) {
          console.log(e);
        }
      });

      return await Promise.all(filenames);
    });
  }
}

export interface PitchDeckService {
  getPitchDeckAndUpdate(cond, update);
  getAllPitchDeck();
  getPitchDeckById(id: string);
  addPitchDeck(config: pitch, file);
  convertPdfToImages(pdfFile);
  savePdfFile(files): Promise<string>;
}

interface pitch {
  fileUrl: string;
  title: string;
  description: string;
  company: string;
  highlight: Array<string>;
}

interface pitchFile {
  name: string;
  mimetype: string;
  mv: Function;
  data: Buffer;
  tempFilePath: string;
  truncated: Boolean;
  size: number;
  md5: string;
}
