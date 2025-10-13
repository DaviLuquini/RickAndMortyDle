import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, tap } from 'rxjs';
import { ICharacter, ICharactersApiResponse } from '../models/character.type';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';
  private totalPages = 20;

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<ICharacter[]> {
    const cached = localStorage.getItem('characters');
    if (cached) {
      return of(JSON.parse(cached));
    }

    const requests: Observable<ICharactersApiResponse>[] = [];

    for (let page = 1; page <= this.totalPages; page++) {
      requests.push(this.http.get<ICharactersApiResponse>(`${this.baseUrl}/?page=${page}`));
    }

    return forkJoin(requests).pipe(
      map((responses: ICharactersApiResponse[]) =>
        responses.flatMap((response) =>
          response.results.map((characterData: ICharacter) => {
            const episodeCount = characterData.episode ? characterData.episode.length : 0;
            const location = characterData.location
              ? { name: characterData.location.name, url: characterData.location.url }
              : { name: '', url: '' };
            const origin = characterData.origin
              ? { name: characterData.origin.name, url: characterData.origin.url }
              : { name: '', url: '' };

            return {
              name: characterData.name,
              id: characterData.id,
              image: characterData.image,
              gender: characterData.gender,
              origin,
              status: characterData.status,
              species: characterData.species,
              location,
              episodeCount,
              type: characterData.type,
              episode: characterData.episode,
              url: characterData.url,
              created: characterData.created,
            };
          })
        )
      ),
      tap({
        next: (characters) => {
          localStorage.setItem('characters', JSON.stringify(characters));
        }
      })
    );
  }
}
