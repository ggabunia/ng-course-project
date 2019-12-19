import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient-model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('' +
      'A Tasty Schnitzel',
      'A super tasty Schnitzel',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/220px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
      [
        new Ingredient('Chicken Fillet', 1),
        new Ingredient('Bread Crumbs', 500),
        new Ingredient('FrenchFries', 20)
      ]
    ),
    new Recipe(
      'Awesome Burger',
      'An amazing awesome Hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1280px-RedDot_Burger.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Patty', 1),
        new Ingredient('Veggies', 4)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.recipeToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
