import { Exercise } from "../models/Exercise";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";

export interface IDataRepository {
    fetchFavoriteExercises(): Promise<Array<Exercise>>;

    fetchPersonalPageInfo(): Promise<PersonalPageInfo>;

    loginUser(code: string, password: string): Promise<User>;
  }