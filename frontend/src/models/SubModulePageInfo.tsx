import { ExerciciosFavoriteInfo } from "./ExerciciosFavoriteInfo";
import { SubModulePage } from "./SubModulePage";

export interface SubModulePageInfo{
    subModulePage: SubModulePage;
    subModuleTitle: string;
    isBlocked: boolean;
    isLastPage: boolean;
    isLastPageInModulo: boolean;
    exerciciosFavoritos: ExerciciosFavoriteInfo[];
}