import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { TitleCasePipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { Post } from '../../interface/posts';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    ScrollingModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    TitleCasePipe,
    MatButtonModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private readonly platform = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  isClient = isPlatformBrowser(this.platform);
  posts: Post[] = [];

  constructor() {
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
    this.posts = this.route.snapshot.data['posts'];
  }

  goToPostDetail(post: Post) {
    localStorage.setItem(
      'scrollPosition',
      String(this.viewport.measureScrollOffset())
    );
    this.router.navigate(['/posts', post.id]);
  }
}
