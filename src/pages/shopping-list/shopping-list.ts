import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";

/*
  Generated class for the ShoppingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  public listItems: Ingredient[];
  constructor(public navCtrl: NavController,
              private shoppingListService: ShoppingListService,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }
  onAddItem(form: NgForm){
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    this.listItems.push(new Ingredient(form.value.ingredientName, form.value.amount));
    console.log(this.listItems);
    form.reset();
  }

  ionViewWillEnter(){
    this.listItems = this.shoppingListService.getItems();
  }
  onCheckItem(index:number){
    this.shoppingListService.removeItem(index);
    this.listItems.splice(index, 1);
  }

}
