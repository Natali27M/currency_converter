import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

const routes: Routes = [
  {path: "", component: MainLayoutComponent,
    // children: [
    //   // {path: "", redirectTo: "movies", pathMatch: "full"},
    //   // {path: "movies", loadChildren: () => import("./modules/movie/movie.module").then(m => m.MovieModule)},
    //   // {path: "movies/:id", component: MovieDetailsComponent},
    //   // {path: "genres", loadChildren: () => import("./modules/genre/genre.module").then(m => m.GenreModule)},
    //   // {path: "genres/:id", component: MoviesByGenreComponent},
    //   // {path: "genres/:id/:id", component: MovieDetailsComponent},
    //   // {path: "tvShows", loadChildren: () => import("./modules/tv-show/tv-show.module").then(m => m.TvShowModule)},
    //   // {path: "tvShows/:id", component: TvShowDetailsComponent}
    // ]
  }
]

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {

}
