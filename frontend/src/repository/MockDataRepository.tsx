import { Exercise } from "../models/Exercise";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";
import { IDataRepository } from "./IDataRepository";

export class MockDataRepository implements IDataRepository {
    loginUser(code: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    fetchPersonalPageInfo(): Promise<PersonalPageInfo> {
        throw new Error("Method not implemented.");
    }
    fetchFavoriteExercises(): Promise<Exercise[]> {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve([
                    {
                        moduloNumberOrder : 1,
                        exercicioName : "Tolerancia a estados emocionais dolorosos",
                        exercicioFile : "submod_3_3.mp3"
           
                    },
                    {
                        moduloNumberOrder : 2,
                        exercicioName : "Tolerancia a estados emocionais dolorosos",
                        exercicioFile : "submod_3_3.mp3"
                    },
                    ]);
        }, 1000);
    }   );
    }

}