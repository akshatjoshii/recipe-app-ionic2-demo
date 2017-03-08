import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  private recipes: Recipe[] = [];

  constructor(public navCtrl: NavController,
              private recipeService: RecipeService,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'New'})
  }

  ionViewWillEnter(){
    this.loadItems();
  }
  onLoadRecipe(recipe: Recipe, index:number){
      this.navCtrl.push(RecipePage,{recipe: recipe, index: index })
  }
  loadItems(){
    this.recipes = this.recipeService.getRecipes();
    console.log(this.recipes)
  }



}
