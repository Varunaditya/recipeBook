import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes/recipes.service';
import { Response } from '@angular/Http';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipesService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSave() {
    this.recipeService.putRecipes().subscribe(
      (response: Response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFetch() {
    // console.log('mark');
    this.recipeService.pullRecipes().subscribe(
      (pulledRecipes: any) => this.recipeService.loadRecipes(pulledRecipes),
      (error) => console.log(error)
    );
  }

}
