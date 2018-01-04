import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  selectedRecipeID: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.params.subscribe(
    (params: Params) => {
      this.selectedRecipeID = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.selectedRecipeID);
    }
  );
  }

  onAddToShoppingList() {
    this.recipesService.addingToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.selectedRecipeID);
    console.log(this.selectedRecipeID);
  }
}
