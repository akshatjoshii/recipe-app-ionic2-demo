import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {RecipeService} from "../../services/recipes";
import {EditRecipePage} from "../edit-recipe/edit-recipe";

/*
  Generated class for the Recipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit{
  private recipe: Recipe;
  private index: number;

  constructor(public navCtrl: NavController,
              private recipeService: RecipeService,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }
  onEditRecipe(){
    console.log('editing page');
    this.navCtrl.push(EditRecipePage, {mode: "Edit", recipe: this.recipe, index:this.index})
  }
  onDeleteRecipe(){

  }
  onAddIngredients(){

  }

}
