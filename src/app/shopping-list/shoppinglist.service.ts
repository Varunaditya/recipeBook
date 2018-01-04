import { Ingredients } from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  startedEditing = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatoes', 10)
  ];

  newIngredient = new Subject<Ingredients>();
  itemForDeletion = new Subject<string>();

  getIngredients() {
    return this.ingredients;
  }

  getSingleIngredient(index: number) {
    return this.ingredients[index];
  }

  onIngredientsAdded(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
