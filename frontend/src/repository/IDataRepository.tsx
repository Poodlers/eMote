import { Exercise } from "../models/Exercise";

export interface IDataRepository {
    fetchFavoriteExercises(): Promise<Array<Exercise>>;
  }