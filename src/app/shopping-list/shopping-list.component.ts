import { Component,OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
  
})
export class ShoppingListComponent implements  OnInit, OnDestroy{
  ingredients:Ingredient[];
  private subscription:Subscription;

  constructor(private sLService: ShoppingListService){}

  ngOnInit(){
    this.ingredients=this.sLService.getIngredients();
    this.subscription=this.sLService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }

  onEditItem(index:number){
    this.sLService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
 
}
