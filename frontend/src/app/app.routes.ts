import { Route } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { LoginComponent } from "./pages/login/login.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import {
  productDetailResolver,
  productsResolver,
} from "./resolvers/products/products.resolver";
import { PostsComponent } from "./pages/posts/posts.component";
import {
  postDetailResolver,
  postsResolver,
} from "./resolvers/posts/posts.resolver";
import { PostDetailComponent } from "./pages/post-detail/post-detail.component";
import { RecipesComponent } from "./pages/recipes/recipes.component";
import {
  recipeDetailResolver,
  recipesResolver,
} from "./resolvers/recipes/recipies.resolver";
import { RecipesDetailComponent } from "./pages/recipes-detail/recipes-detail.component";

export const appRoutes: Route[] = [
  {
    path: "",
    component: RecipesComponent,
    resolve: { recipes: recipesResolver },
  },
  {
    path: "recipes/:id",
    component: RecipesDetailComponent,
    resolve: { recipe: recipeDetailResolver },
  },
  {
    path: "posts",
    component: PostsComponent,
    resolve: { posts: postsResolver },
  },
  {
    path: "posts/:id",
    component: PostDetailComponent,
    resolve: { posts: postDetailResolver },
  },
  {
    path: "products",
    component: ProductsComponent,
    resolve: { products: productsResolver },
  },
  {
    path: "products/:id",
    component: ProductDetailComponent,
    resolve: { product: productDetailResolver },
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" },
];
