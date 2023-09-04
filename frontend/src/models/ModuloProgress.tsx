import { SubModuleUserProgress } from "./SubModuleUserProgress";

export interface ModuloProgress {
    moduloNumberOrder : number,
    subModuleUserProgresses : Array<SubModuleUserProgress>,
    userProgress : number,
    dataInicio : string,
    dataFim : string,
    recompensa : string,
    utilidade : number,
    satsifacao : number

}