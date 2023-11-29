import mongoose from "mongoose";
import { IPregunta } from "src/pregunta/pregunta.model";

export class EscalaCrearDto {
  Dimension: string;
  Preguntas: IPregunta[];
  Total: number
}
