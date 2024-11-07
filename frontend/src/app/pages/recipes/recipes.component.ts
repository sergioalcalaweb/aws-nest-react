import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  CommonModule,
  NgOptimizedImage,
  TitleCasePipe,
  isPlatformBrowser,
} from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../interface/recipes';
import { CurrentTransitionService } from '../../service/current-transition/current-transition-service.service';
import { MatButtonModule } from '@angular/material/button';
import { ViewTransitionDirective } from '../../directives/view-transition.directive';
import { RecipesService } from '../../service/recipes/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    ScrollingModule,
    TitleCasePipe,
    CommonModule,
    RouterModule,
    MatButtonModule,
    ViewTransitionDirective,
    NgOptimizedImage,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private readonly platform = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transitionService = inject(CurrentTransitionService);
  private recipesService = inject(RecipesService);
  isClient = isPlatformBrowser(this.platform);
  recipes: Recipe[] = [];

  constructor() {
    if (this.isClient) {
      const scrollPosition =
        Number(localStorage.getItem('scrollPosition')) || 0;
      if (scrollPosition > 0) {
        setTimeout(() => {
          this.viewport.scrollToOffset(Number(scrollPosition) + 150);
        });
      }
    }
  }

  ngOnInit() {
    this.recipes = this.route.snapshot.data['recipes'];
  }

  goToRecipeDetail(recipe: Recipe) {
    localStorage.setItem(
      'scrollPosition',
      String(this.viewport.measureScrollOffset())
    );
    this.recipesService.recipeImageBackup.set(recipe.image);
    this.router.navigate(['/recipes', recipe.id]);
  }
}
