import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ActionSheetController, AlertController, ToastController} from 'ionic-angular';
import {FormGroup, FormControl, Validators, NgForm, FormArray} from "@angular/forms";
import {RecipeService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];

  private recipe:Recipe;
  private index: number;

  recipeForm: FormGroup;

  constructor(public navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipeService,
              public navParams: NavParams) {}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad EditRecipePage');
  // }
  ngOnInit(){
    this.mode = this.navParams.get('mode');
    console.log('inside edit');
    if(this.mode=="Edit"){
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  onSubmit(recipeForm: NgForm){
      const value = recipeForm.value;
      let ingredients = value.ingredients.map((ingredient)=>{
        return {name: ingredient.name, amount:1}
      });

    if(this.mode=='Edit'){
      this.recipeService.updateRecipes(this.index,value.title, value.description, value.difficulty, ingredients)
    }else{
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);

    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }
  onManageIngredients(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler:()=>{
            this.createIngredientsAlert().present();
          }
        },
        {
          text: 'Remove All Ingredient',
          role: 'destructive',
          handler: ()=>{
            let fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            console.log(fArray);
            const len = fArray.length;
            if(len>0){
              for(let i = len -1; i>=0; i--){
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  createIngredientsAlert(){
    return   this.alertCtrl.create({
      title: 'Add Ingredients',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Add',
        handler: (data)=>{
          console.log(data);
          if(data.name.trim()=='' || data.name == null){
            const toast = this.toastCtrl.create({
              message: 'Please enter a valid value',
              duration:1000,
              position: 'bottom'
            });
            toast.present();
            return;
          }
          (<FormArray>this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name, Validators.required));
          const toast = this.toastCtrl.create({
            message: 'Item added',
            duration:1000,
            position: 'bottom'
          });
          toast.present();

        }
      }]
    })
  }
  initializeForm(){
    let title = null;
    let description = null;
    let difficulty = null;
    let ingredients = [];

    if(this.mode=='Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients;

      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }



}
