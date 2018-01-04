import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredients} from '../shared/ingredient.model';
import {ShoppingListService} from './shoppinglist.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  obsvSub: Subscription;

  constructor(private shoppinglistService: ShoppingListService) {}

ngOnInit() {
  this.ingredients = this.shoppinglistService.getIngredients();
  this.obsvSub = this.shoppinglistService.newIngredient.subscribe(
    (ingredient: Ingredients) => {
      this.ingredients.push(ingredient);
      // this.shoppinglistService.getIngredients();
    }
  );
}

onEditItem(index: number) {
    this.shoppinglistService.startedEditing.next(index);
    console.log(index);
  }

ngOnDestroy() {
  this.obsvSub.unsubscribe();
}
}
