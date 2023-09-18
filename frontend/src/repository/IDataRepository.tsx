import { Exercise } from "../models/Exercise";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";

export interface IDataRepository {

    updateUser(): void;

    fetchFavoriteExercises(): Promise<Array<Exercise>>;

    fetchPersonalPageInfo(): Promise<PersonalPageInfo>;

    fetchAllUsers(): Promise<Array<User>>;

    deleteUser(code: string): Promise<void>;

    editUser(oldCode: string, code: string,password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void>;

    loginUser(code: string, password: string): Promise<User>;

    logOutUser(): void;

    createUser(code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void>;

    logAccessToApp(): Promise<void>;

    logTimeStampOnAppLogin() : void;

    downloadExcel() : Promise<void>;

    hasAccessToDiaries() : Promise<boolean>;


  }