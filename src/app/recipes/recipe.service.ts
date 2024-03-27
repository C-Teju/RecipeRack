import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {Recipe} from './recipe.model'
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService{

recipesChanged=new Subject<Recipe[]>();

//not needed coz instead of event emitters we have used routing already
  //   recipeSelected=new Subject<Recipe>();  //----->routing is there

    // private recipes:Recipe[] =[
    //     new Recipe(
    //       'Tasty Schnitzel ', 
    //       'A yummy Schnitzel',
    //       'https://i.pinimg.com/474x/b0/e9/ab/b0e9ab39ca9a3460b574dc3363ddff66.jpg',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French fries', 21)
    //       ]),
    //     new Recipe(
    //       'Burger',
    //       'The tastiest burger in the world! ',
    //       'https://i.pinimg.com/474x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg',
    //       [
    //         new Ingredient('buns', 2),
    //         new Ingredient('Meat', 1),
    //         new Ingredient('Tomatoes', 2),
    //         new Ingredient('Onion', 2),
    //         new Ingredient('Cheese', 1),
    //         new Ingredient('Lettuce', 1)
    //       ])
    //   ];

    private recipes:Recipe[] =[];

      constructor(private sLService:ShoppingListService){}

// to override the existing recipes when we fetch it
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipies(){
        return this.recipes.slice();
      }

      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.sLService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
     
      updateRecipe(index:number,newRecipe : Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }


      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      

}