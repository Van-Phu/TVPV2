import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định
import './manageRecipePage.css'
import { RecipeDTO } from "../../../shared/dto/RecipeDTO ";
import { DTORecipeMaster } from "../../../shared/dto/DTORecipe";

const FullFunctionEditor = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [recipe, setRecipe] = useState(new DTORecipeMaster)

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Tiêu đề
      ["bold", "italic", "underline", "strike"], // Định dạng văn bản
      [{ color: [] }, { background: [] }], // Màu chữ và nền
      [{ script: "sub" }, { script: "super" }], // Chỉ số trên/dưới
      [{ list: "ordered" }, { list: "bullet" }], // Danh sách
      [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
      [{ align: [] }], // Căn chỉnh
      ["link", "image", "video"], // Thêm liên kết, hình ảnh, video
      ["clean"], // Xóa định dạng
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên trong mảng files

    if (file) {
      const reader = new FileReader(); // Tạo một FileReader để đọc file ảnh

      // Khi FileReader hoàn thành, gán ảnh vào state
      reader.onload = (e) => {
        setImage(e.target.result); // Lưu đường dẫn ảnh vào state
      };

      reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    }
  };

  const [ingredients, setIngredients] = useState([
    {
      quantity: '',
      unit: '',
      description: '',
      detailedSize: false,
    },
  ]);

  const handleAddIngredient = async() => {
    await setIngredients([
      ...ingredients,
      { quantity: '', unit: '', description: '', detailedSize: false },
    ]);
    
  };

  const handleChange = async(index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    await setIngredients(updatedIngredients);
    updateField('Ingredients', ingredients)

  };


  // Đọc dữ liệu từ localStorage khi component được tải
  useEffect(() => {
    const savedValue = localStorage.getItem("editorContent");
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const handleRemoveIngredient = async(index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    await setIngredients(updatedIngredients);
    updateField('Ingredients', ingredients)
  };

  const updateField = (fieldName, value) => {
    setRecipe((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };


  const btnSaveClick = () => {
    console.log(recipe)
  }

  return (
    <div className="container-manage-recipe">
      <div className="content">
        <div className="content-left">
          <div className="area">
            {/* Input chọn file ảnh */}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <br /><br />

            {/* Hiển thị ảnh nếu có */}
            {image && <img src={image} alt="Selected Preview" style={{ maxWidth: '300px' }} />}
          </div>

          <div className="area">
            <div className="title-area">Tiêu đề <span className="important">(*)</span></div>
            <input onBlur={(value) => updateField('RecipeName', value.target.value)} className="input" />
          </div>
          <div className="area">
            <div className="title-area">Thời gian chế biến <span className="important">(*)</span></div>
            <input onBlur={(value) => updateField('CookingTime', value.target.value)} className="input" />
          </div>
          <div className="area">
            <div className="title-area">Số lượng người ăn <span className="important">(*)</span></div>
            <input onBlur={(value) => updateField('servings', value.target.value)} className="input" />
          </div>

          <div className="area">
            <div className="recipe-form-container">
              <p className="title-area">Chi tiết nguyên liệu</p>
              <div className="ingredients-container">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient">
                     <input
                      className="name-recipe"
                      type="text"
                      placeholder="Tên nguyên liệu"
                      value={ingredient.description}
                      onChange={(e) =>
                        handleChange(index, 'description', e.target.value)
                      }
                    />
                    <input
                      className="quantity-input"
                      type="number"
                      placeholder="Số lượng"
                      value={ingredient.quantity}
                      onChange={(e) =>
                        handleChange(index, 'quantity', e.target.value)
                      }
                    />
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleChange(index, 'unit', e.target.value)}
                    >
                      <option value="gram">Gram</option>
                      <option value="can">Trái</option>
                      <option value="oz">Kí</option>
                    </select>
                   
                    <button
                      className="remove-ingredient-btn"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button className="add-ingredient-btn" onClick={handleAddIngredient}>
                + Thêm nguyên liệu
              </button>
            </div>
          </div>

        </div>

        <div className="content-right">
          <div className="ql-container">
            <div className="title-area">Template <span className="important">(*)</span></div>
            <ReactQuill
              className="box-content"
              // value={value}
              onChange={(value) => updateField('template', value)}
              modules={modules}
              formats={formats}
              theme="snow" // Hoặc "bubble"
            />
          </div>
          <div onClick={() => btnSaveClick()} className="btnArea">
              <div className="btnSave">Đăng công thức</div>
          </div>
        </div>
      </div>
      {/* <div>
        <button className="save-button" onClick={handleSave}>
          Lưu
        </button>
      </div> */}

{/* 
      <div className="content">
      <div className="area">
        <p className="title-area">Nhập tiêu đề <span className="important">(*)</span></p>
        <input className="input"/>
      </div>
      
      <div className="ql-container">
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow" // Hoặc "bubble"
        />
      </div>
      </div> */}

    </div>
  );
};

export default FullFunctionEditor;
