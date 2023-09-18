import { EpisodeInfo } from "./EpisodeInfo";
import { ProgressInfo } from "./ProgressInfo";
import { SentimentoInfo } from "./SentimentosInfo";

export interface PersonalPageInfo {
    episodesInfo : Array<EpisodeInfo>;
    sentimentosInfo : Array<SentimentoInfo>;
    progressInfo : Array<ProgressInfo>;
}