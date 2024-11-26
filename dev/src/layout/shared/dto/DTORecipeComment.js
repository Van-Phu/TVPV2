export class DTORecipeComment{
    constructor({
      Code = 0,
      Recipe = "",
      User = "",
      Likes = 0,
      Descriptions = "",
      ImageThumb = "",
      createdAt = null,
      updatedAt = null,
    } = {}) {
      this.Code = Code;
      this.Recipe = Recipe;
      this.User = User;
      this.Likes = Likes;
      this.Descriptions = Descriptions;
      this.ImageThumb = ImageThumb;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
  