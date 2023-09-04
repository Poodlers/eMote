import { Exercise } from "../models/Exercise";
import { IDataRepository } from "./IDataRepository";

class MockDataRepository implements IDataRepository {
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