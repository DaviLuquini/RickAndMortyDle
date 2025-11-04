export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export interface ICharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
  episodeCount: number;
  quote?: string;
}

export interface ICharactersApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}
