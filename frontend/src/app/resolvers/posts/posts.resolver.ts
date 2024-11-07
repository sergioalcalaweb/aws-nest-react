import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Post } from '../../interface/posts';
import { inject } from '@angular/core';
import { PostsService } from '../../service/posts/posts.service';

export const postsResolver: ResolveFn<Post[]> = () => {
  const postService = inject(PostsService);
  return postService.getPosts();
};

export const postDetailResolver: ResolveFn<Post> = (
  route: ActivatedRouteSnapshot
) => {
  const postService = inject(PostsService);
  const id = route.params['id'];
  return postService.getPostDetail(id);
};
