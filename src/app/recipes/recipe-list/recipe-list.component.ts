import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription1: Subscription;
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.subscription1 = this.recipesService.recipeListUpdated.subscribe(
      () => {
        this.recipes = this.recipesService.getRecipes();
      }
  );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
