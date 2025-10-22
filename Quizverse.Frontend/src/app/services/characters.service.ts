// character.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { ICharacter, ICharactersApiResponse } from '../models/character.type';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
    private readonly totalPages = 20;

    constructor(private readonly http: HttpClient) { }

    getCharacters(count: number): Observable<ICharacter[]> {
        const requests: Observable<ICharactersApiResponse>[] = [];

        for (let page = 1; page <= this.totalPages; page++) {
            requests.push(this.http.get<ICharactersApiResponse>(`${this.baseUrl}?page=${page}`));
        }

        return forkJoin(requests).pipe(
            map(responses => {
                const allCharacters = responses.flatMap(res => res.results);

                return allCharacters
                    .map(char => ({
                        ...char,
                        episodeCount: char.episode?.length ?? 0
                    }))
                    .sort((a, b) => b.episodeCount - a.episodeCount)
                    .slice(0, count);
            })
        );
    }
}
