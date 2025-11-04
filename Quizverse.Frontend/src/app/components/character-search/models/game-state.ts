import { ICharacter } from "../../../models/character";
import { IGuessResult } from "./guess-result";

export interface IGameState {
    date: string;
    correctCharacterHash: string;
    guessHistory: IGuessResult[];
    tries: number;
    isGameOver: boolean;
    availableCharacters: ICharacter[];
}