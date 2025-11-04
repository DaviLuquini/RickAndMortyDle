// character.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICharacter, ICharactersApiResponse } from '../models/character';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
    private readonly totalPages = 20;
    private readonly CACHE_KEY = 'rickmortydle-characters';

    constructor(private readonly http: HttpClient) { }

    getCharacters(count: number): Observable<ICharacter[]> {
        const cached = this.getCachedCharacters();
        if (cached) {
            return of(cached);
        }

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
            }),
            tap(characters => this.cacheCharacters(characters))
        );
    }

    private getCachedCharacters(): ICharacter[] | null {
        try {
            const cached = localStorage.getItem(this.CACHE_KEY);
            if (!cached) return null;

            const data = JSON.parse(cached);

            return data.characters;
        } catch (error) {
            console.error('Error reading cache:', error);
            return null;
        }
    }

    private cacheCharacters(characters: ICharacter[]): void {
        try {
            const cacheData = {
                date: new Date().toISOString(),
                characters
            };
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    }

    clearCache(): void {
        localStorage.removeItem(this.CACHE_KEY);
    }
}