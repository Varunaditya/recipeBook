import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class RecipesService {

  constructor(private shoppinglistService: ShoppingListService,
              private router: Router,
              private http: Http,
              private authServivce: AuthService) {}

  private recipes: Recipe[] = [
    new Recipe('Dosa',
    'A South Indian Dish',
    'https://www.ndtv.com/cooks/images/kuttu.dosa.jpg',
    [
      new Ingredients('Udad Dal', 2),
      new Ingredients('Rice', 2),
      new Ingredients('Potato',3)
    ]),
    new Recipe('Deep Dish Pizza',
    'The evergreen Pizza - Chicago Style',
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chicago-style-pizza-02.jpg',
    [
      new Ingredients('All Purpose Flour', 2),
      new Ingredients('Cheese', 3),
      new Ingredients('Green Pepper',2),
      new Ingredients('Tomato',3),
      new Ingredients('Seasoning',1)
    ]),
    new Recipe('Ramen Noodles',
      'The Quick-cooking noodles.',
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Japanese_Salt_flavor_Sapporo_Ramen.JPG',
      [
        new Ingredients('Noodles', 1),
        new Ingredients('Meat', 3),
        new Ingredients('Ajinomoto',1),
        new Ingredients('Seasoning',1)
      ])
  ];

  // recipeSelected = new EventEmitter<Recipe>();
  recipeListUpdated = new Subject();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    // console.log(this.recipes[id]);
    return this.recipes[id];
  }

  addingToShoppingList(ingredients: Ingredients[]) {
    this.shoppinglistService.onIngredientsAdded(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    // console.log(this.recipes);
    this.recipeListUpdated.next();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    // console.log(this.recipes);
    this.recipeListUpdated.next();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeListUpdated.next();
    this.router.navigate(['/recipes']);
    // console.log(this.recipes.slice(index, 1));
  }

  putRecipes() {
    const token = this.authServivce.getToken();
    return this.http.put('https://udemycourseproject93.firebaseio.com/recipes.json?auth=' + token , this.recipes);
  }
  pullRecipes() {
    const token = this.authServivce.getToken();
    // console.log(token);
    return this.http.get('https://udemycourseproject93.firebaseio.com/recipes.json?auth=' + token ).map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    );
  }

  loadRecipes(recipesToBeLoaded: Recipe[]) {
    this.recipes = recipesToBeLoaded;
    // console.log(recipesToBeLoaded);
    console.log(this.recipes);
    this.recipeListUpdated.next();
  }
}
