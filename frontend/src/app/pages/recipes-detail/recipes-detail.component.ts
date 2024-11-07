import { Component, inject } from '@angular/core';
import { Recipe } from '../../interface/recipes';
import { ActivatedRoute } from '@angular/router';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recipes-detail',
  standalone: true,
  imports: [TitleCasePipe, NgOptimizedImage],
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.css',
})
export class RecipesDetailComponent {
  private route = inject(ActivatedRoute);
  recipe!: Recipe;
  constructor() {
    this.recipe = this.route.snapshot.data['recipe'];
  }
}
