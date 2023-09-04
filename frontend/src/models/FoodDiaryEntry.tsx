import { CompensatoryBehavior } from "./CompensatoryBehavior";
import { Sentimento } from "./Sentimento";
import { TipoRefeicao } from "./TipoRefeicao";

export interface FoodDiaryEntry {
    date : string,
    hour : string,
    tipoRefeicao : TipoRefeicao,
    skippedMeal : boolean,
    timeOfMeal : string,
    feelingsAroundMeal : Array<Sentimento>,
    contentsOfMeal : string,
    plainAttention : boolean,
    restrainedConsumption : boolean,
    hadAnEpisode : boolean,
    hadCompensatoryBehaviour : boolean,
    compensatoryBehaviors : Array<CompensatoryBehavior>,
    reflexao : string,
}