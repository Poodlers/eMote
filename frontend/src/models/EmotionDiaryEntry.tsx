import { Exercise } from "./Exercise";
import { Sentimento } from "./Sentimento";

export interface EmotionDiaryEntry {
    date : string,
    hour : string,
    sentimentos : Array<Sentimento>,
    exercicios : Array<Exercise>,
    reflexaoEmotion : string,
}
