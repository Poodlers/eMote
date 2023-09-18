import { Exercise } from "../models/Exercise";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";
import { IDataRepository } from "./IDataRepository";

export class MockDataRepository implements IDataRepository {
    logOutUser(): void {
        throw new Error("Method not implemented.");
    }
   
    hasAccessToDiaries(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logTimeStampOnAppLogin(): void {
        throw new Error("Method not implemented.");
    }
    updateUser(): void {
        throw new Error("Method not implemented.");
    }
    logAccessToApp(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    downloadExcel(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUser(code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    editUser(oldCode: string, code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteUser(code: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    fetchAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
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