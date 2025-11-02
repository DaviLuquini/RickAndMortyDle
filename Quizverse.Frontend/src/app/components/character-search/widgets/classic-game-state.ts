import { ICharacter } from "../../../models/character.type";
import { IGuessResult } from "../../../models/guess-result";

export interface IClassicGameState {
    date: string;
    correctCharacterHash: string;
    guessHistory: IGuessResult[];
    tries: number;
    isGameOver: boolean;
    availableCharacters: ICharacter[];
}
