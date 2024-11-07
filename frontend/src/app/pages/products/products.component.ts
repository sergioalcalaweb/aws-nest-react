import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
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
import { Product } from '../../interface/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrentTransitionService } from '../../service/current-transition/current-transition-service.service';
import { ViewTransitionDirective } from '../../directives/view-transition.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ScrollingModule,
    CommonModule,
    RouterLink,
    TitleCasePipe,
    NgOptimizedImage,
    ViewTransitionDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private readonly platform = inject(PLATFORM_ID);
  isClient = isPlatformBrowser(this.platform);
  products: Product[] = [];

  viewTransitionName(product: Product) {
    const transition = this.transitionService.currentTransition();
    // If we're transitioning to or from the cat's detail page, add the `banner-image` transition name.
    // This allows the browser to animate between the specific cat image from the list and its image on the detail page.
    const isBannerImg =
      transition?.to.firstChild?.params['id'] === product.id ||
      transition?.from.firstChild?.params['id'] === product.id;
    return isBannerImg ? 'banner-img' : '';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transitionService: CurrentTransitionService
  ) {
    if (this.isClient) {
      const scrollPosition = localStorage.getItem('scrollPosition');
      if (scrollPosition) {
        setTimeout(() => {
          this.viewport.scrollToOffset(Number(scrollPosition));
        });
      }
    }
  }

  ngOnInit() {
    this.products = this.route.snapshot.data['products'];
  }

  goToProductDetail(product: Product) {
    localStorage.setItem(
      'scrollPosition',
      String(this.viewport.measureScrollOffset())
    );
    this.router.navigate(['/products', product.id]);
  }
}
