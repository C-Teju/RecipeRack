import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', { static: false }) slForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem:Ingredient;

  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;

  // @Output() ingeridentAdded=new EventEmitter<{name:string,amount:number}>(); 
   
  constructor(private slService:ShoppingListService){}

  ngOnInit(){
   this.subscription= this.slService.startedEditing.subscribe(
    (index: number) => {
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem= this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
   );
  }

  onAddItem(form:NgForm){
    // const ingName=this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
    this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
