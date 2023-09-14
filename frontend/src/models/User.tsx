import { EmotionDiaryEntry } from "./EmotionDiaryEntry";
import { Exercise } from "./Exercise";
import { FoodDiaryEntry } from "./FoodDiaryEntry";
import { ModuloProgress } from "./ModuloProgress";

//create a model for the user
export interface User {
    id: Number,
    code : string,
    createdAt : string,
    password : string,
    hasAccessToApp : boolean,
    role: Number,
    timeLeftInApp : string,
    emotionDiaryEntries?: Array<EmotionDiaryEntry>,
    foodDiaryEntries?: Array<FoodDiaryEntry>,
    modulosProgress? : Array<ModuloProgress>,
    favoriteExercises? : Array<Exercise>,

}