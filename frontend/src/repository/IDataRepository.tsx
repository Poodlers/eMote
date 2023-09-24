import { Exercise } from "../models/Exercise";
import { FoodDiaryEntry } from "../models/FoodDiaryEntry";
import { ModuloInfo } from "../models/ModuloInfo";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { SubModuleInfo } from "../models/SubModuleInfo";
import { SubModulePageInfo } from "../models/SubModulePageInfo";
import { TipoRefeicao } from "../models/TipoRefeicao";
import { User } from "../models/User";

export interface IDataRepository {

    updateUser(): void;

    userCompletedLogin(): boolean;

    sendFeedback(moduloId: Number, usefulnessScore: Number, satisfactionScore: Number): Promise<void>;

    hasCompletedModulo(moduloId: Number): Promise<boolean>;

    getSubmoduleList(moduloId: Number): Promise<Array<SubModuleInfo>>;

    getPageContent(moduloId: Number, subModuloId: Number, pageNumber: Number): Promise<SubModulePageInfo>;

    setUserCompletedLogin(hasCompletedLogin: boolean): void;

    fetchFavoriteExercises(): Promise<Array<Exercise>>;

    fetchModuloNameAndIntro(moduloId: Number): Promise<ModuloInfo>;

    registerSubModuloTimeStamps(moduloId: Number, subModuloId: Number, timeInicio?: string, timeFim?: string): Promise<void>;

    registerModuloTimeStamps(moduloId: Number,  timeInicio?: string, timeFim?: string): Promise<void>;

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