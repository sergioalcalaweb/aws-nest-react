import { Injectable } from '@angular/core';
import { Post, PostResponse } from '../../interface/posts';

const API_POSTS_URL = 'https://dummyjson.com/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  getPosts(): Promise<Post[]> {
    return fetch(`${API_POSTS_URL}?limit=0`)
      .then((response) => response.json())
      .then((response: PostResponse) => response.posts);
  }

  getPostDetail(id: number): Promise<Post> {
    return fetch(`${API_POSTS_URL}/${id}`).then((response) => response.json());
  }
}
