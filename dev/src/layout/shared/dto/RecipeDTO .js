export class RecipeDTO {
    constructor(id, name, description, ingredients, instructions, preparationTime, cookingTime, imageUrl, category, servings, sharedBy) {
      this.id = id; // Mã công thức
      this.name = name; // Tên công thức
      this.description = description; // Mô tả công thức
      this.ingredients = ingredients; // Danh sách nguyên liệu (mảng các đối tượng IngredientDTO)
      this.instructions = instructions; // Hướng dẫn nấu (mảng các bước)
      this.preparationTime = preparationTime; // Thời gian chuẩn bị (ví dụ: "30 phút")
      this.cookingTime = cookingTime; // Thời gian nấu
      this.imageUrl = imageUrl; // URL hình ảnh món ăn
      this.category = category; // Loại món ăn (ví dụ: "Món chính", "Món tráng miệng")
      this.servings = servings; // Số khẩu phần
      this.sharedBy = sharedBy; // Người chia sẻ (đối tượng UserDTO)
    }
  }