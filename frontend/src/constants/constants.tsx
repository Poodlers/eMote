import { Exercise } from "../models/Exercise";
import { EmotionDiaryEntry } from "../models/EmotionDiaryEntry";
import { FoodDiaryEntry } from "../models/FoodDiaryEntry";
import { ModuloProgress } from "../models/ModuloProgress";

const BASE_URL = 'http://localhost:8080';  

let user =
{
    code : 'a',
    hasAccessToApp : false,
    role: -1,
    emotionDiaryEntries: Array<EmotionDiaryEntry>(),
    foodDiaryEntries: Array<FoodDiaryEntry>(),
    modulosProgress : Array<ModuloProgress>(),
    favoriteExercises : Array<Exercise>(),
}


export {
    BASE_URL,
    user
}