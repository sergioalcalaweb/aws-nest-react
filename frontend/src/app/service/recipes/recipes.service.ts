import { Injectable, signal } from '@angular/core';
import { Recipe, RecipeResponse } from '../../interface/recipes';

const API_RECIPES_URL = 'https://dummyjson.com/recipes';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  readonly recipeImageBackup = signal<string | null>(null);

  getRecipes(): Promise<Recipe[]> {
    return fetch(`${API_RECIPES_URL}?limit=0`)
      .then((response) => response.json())
      .then((response: RecipeResponse) => response.recipes);
  }

  getRecipesDetail(id: number): Promise<Recipe> {
    return fetch(`${API_RECIPES_URL}/${id}`).then((response) =>
      response.json()
    );
  }
}
