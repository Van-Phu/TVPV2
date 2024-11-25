export class DTORecipeMaster {
    constructor() {
      this.Code = 0;
      this.RecipeName = "";
      this.RecipeDescription = "";
      this.Category = [""];
      this.IsSaved = false;
      this.NumOfSaved = 0;
      this.Author = "";
      this.Ingredients = [];
      this.PreparationTime = 0;
      this.CookingTime = 0;
      this.Thumnail = "";
      this.template = "";
      this.servings = 0
    }
  }