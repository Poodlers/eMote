import { Exercise } from "../models/Exercise";
import { IDataRepository } from "./IDataRepository";

class ApiDataRepository implements IDataRepository {
    fetchFavoriteExercises(): Promise<Exercise[]> {
        throw new Error("Method not implemented.");
    }
   
} 