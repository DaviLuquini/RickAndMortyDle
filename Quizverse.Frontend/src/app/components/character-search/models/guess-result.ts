import { ICharacter } from "../../../models/character";

export interface IGuessResult {
    character: ICharacter;
    isCorrect: boolean;
    matches?: {
        status: boolean;
        species: boolean;
        gender: boolean;
        origin: boolean;
        location: boolean;
        episodeCount: 'exact' | 'close' | 'far';
    };
}