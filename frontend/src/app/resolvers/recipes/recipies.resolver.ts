import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Recipe } from '../../interface/recipes';
import { RecipesService } from '../../service/recipes/recipes.service';

export const recipesResolver: ResolveFn<Recipe[]> = () => {
  const recipesService = inject(RecipesService);
  return recipesService.getRecipes();
};

export const recipeDetailResolver: ResolveFn<Recipe> = (
  route: ActivatedRouteSnapshot
) => {
  const recipesService = inject(RecipesService);
  const id = route.params['id'];
  return recipesService.getRecipesDetail(id);
};
