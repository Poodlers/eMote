import { Exercise } from "./Exercise";

export interface SubModulePage{
    pageNumber: Number;
    text: string;
    videoFile: string;
    imageFile: string;
    otherFile: string;
    exercicios: Array<Exercise>;
}