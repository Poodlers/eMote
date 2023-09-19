import { Exercise } from "../models/Exercise";
import { FoodDiaryEntry } from "../models/FoodDiaryEntry";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { TipoRefeicao } from "../models/TipoRefeicao";
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

    checkIfMealDiaryIsAlreadyAdded(refeicao : TipoRefeicao): Promise<FoodDiaryEntry>;

    createUser(code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void>;

    addFoodDiaryEntry(foodDiary : FoodDiaryEntry): Promise<void>;

    logAccessToApp(): Promise<void>;

    logTimeStampOnAppLogin() : void;

    downloadExcel() : Promise<void>;

    hasAccessToDiaries() : Promise<boolean>;


  }