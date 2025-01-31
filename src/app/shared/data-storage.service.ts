import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, pipe, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        const recipes=this.recipeService.getRecipies();
        this.http.put('https://ng-recipe-book-c8908-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){

        return this.authService.user.pipe
        (take(1), 
        exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://ng-recipe-book-c8908-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            {
                params: new HttpParams().set('auth',user.token)
            }).pipe(map(recipes=>{
                return recipes.map(recipe=>{
                    return{ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            
            }),tap(recipes=>{
                this.recipeService.setRecipes(recipes);
            })
       )})
        )

        
        
        // .subscribe(
        //     recipes=>{
        //         // console.log(recipes);
        //     }
        // )
    }
}