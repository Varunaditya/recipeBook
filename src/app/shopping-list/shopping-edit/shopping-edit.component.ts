import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredients } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shoppinglist.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipeIndex: number;
  editMode: boolean = false;
  editItem: Ingredients;
  itemPresent: boolean;

  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  constructor(private shoppinglistService: ShoppingListService) {
  }


  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.recipeIndex = index;
        this.editMode = true;
        this.editItem = this.shoppinglistService.getSingleIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
        // console.log(this.editItem.amount);
      }
    );
  }

  onClear() {
    this.shoppingEditForm.reset();
  }

  onDelete() {
    // const itemName = this.shoppingEditForm.value.name;
    this.shoppinglistService.deleteItem(this.recipeIndex);
    this.editMode = false;
  }

  onAdd() {
    const value = this.shoppingEditForm.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if (!this.editMode) {
      this.shoppinglistService.newIngredient.next(newIngredient);
    } else {
      this.shoppinglistService.updateIngredient(this.recipeIndex, newIngredient);
      this.editMode = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
