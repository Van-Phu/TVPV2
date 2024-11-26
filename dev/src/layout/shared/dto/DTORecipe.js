export class DTORecipeMaster {
  constructor({
    Code = 0,
    RecipeName = "",
    RecipeDescription = "",
    Category = [""],
    IsSaved = false,
    NumOfSaved = 0,
    Author = null, // ObjectId của User
    Ingredients = [],
    PreparationTime = 0,
    CookingTime = 0,
    Thumbnail = "",
    template = "",
    servings = 0,
    createdAt = null,
    updatedAt = null,
    numOfPost = 0,
    popularRecipes = [],

  } = {}) {
    this.Code = Code;
    this.RecipeName = RecipeName;
    this.RecipeDescription = RecipeDescription;
    this.Category = Category;
    this.IsSaved = IsSaved;
    this.NumOfSaved = NumOfSaved;
    this.Author = Author;
    this.Ingredients = Ingredients;
    this.PreparationTime = PreparationTime;
    this.CookingTime = CookingTime;
    this.Thumbnail = Thumbnail;
    this.template = template;
    this.servings = servings;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.numOfPost = numOfPost;
    this.popularRecipes = popularRecipes;
  }
}
