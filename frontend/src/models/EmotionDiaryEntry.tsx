import { Exercise } from "./Exercise";

export interface EmotionDiaryEntry {
    date : string,
    hour : string,
    sentimentos : Array<Sentimento>,
    exercicios : Array<Exercise>,
    reflexao : string,
}
