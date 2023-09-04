import { Exercise } from "../models/Exercise";
import { PersonalPageInfo } from "../models/PersonalPageInfo";

export interface IDataRepository {
    fetchFavoriteExercises(): Promise<Array<Exercise>>;

    fetchPersonalPageInfo(): Promise<PersonalPageInfo>;
  }