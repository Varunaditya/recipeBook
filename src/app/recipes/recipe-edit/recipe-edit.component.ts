import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  imagePreview: string
  recipeIngredientsRemoved: boolean = false;
  // @ViewChild('imagePath') imagePath: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipesService: RecipesService) { }

  ngOnInit() {
    // console.log(this.imagePath);
    this.route.params.subscribe(
      (params: Params) => {
         this.id = +params['id'];
        this.editMode = (this.id >= 0) ? true : false;
        // console.log(this.editMode);
         this.initForm();
      }
    );
  }

  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
      // console.log(this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }
    this.router.navigate(['/recipes']);
    // this.editMode = false;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
       const recipe = this.recipesService.getRecipe(this.id);
        // console.log(recipe);
       recipeName = recipe.name;
       recipeImagePath = recipe.imagePath;
       recipeDescription = recipe.description;
       if (recipe.ingredients) {
         for (let ingredient of recipe.ingredients) {
           recipeIngredients.push(
             new FormGroup({
             'name': new FormControl(ingredient.name, Validators.required),
             'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
           })
           );
         }
       }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  onAddIngredient() {
    const control = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // const controls = (<FormArray>this.recipeForm.get('ingredients')).controls;
    // const value = (<FormArray>this.recipeForm.get('ingredients')).value;
    // controls.splice(index, 1);
    // value.splice(index, 1);
    // this.recipeIngredientsRemoved = true;
    // console.log(this.recipeForm.get('ingredients').value);
  }
}
