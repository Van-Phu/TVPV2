import { useEffect, useState } from 'react';
import { RecipeList } from '../../../shared/component/C-RecipeList/RecipeList';
import './infomationPage.css'
import { useSelector } from 'react-redux';
import { RecipeDTO } from "../../../shared/dto/RecipeDTO ";
import ReactQuill from "react-quill";
import { DTORecipeMaster } from '../../../shared/dto/DTORecipe';

export function InfomationPage() {
    const [userName, setUserName] = useState('')
    const user = useSelector((state) => state.user.userInfo);
    const [value, setValue] = useState("");
    // const [image, setImage] = useState(null);
    const [recipe, setRecipe] = useState(new DTORecipeMaster)
    const [imageUrl, setImageUrl] = useState('');
    const [isShowCreate, setIsShowCreate] = useState(false)
    const [listData, setListData] = useState([])
    const [isCreate, setIsCreate] = useState(false)



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

    const [ingredients, setIngredients] = useState([
        {
            quantity: '',
            unit: 'gram',
            description: '',
            detailedSize: false,
        },
    ]);

    const handleAddIngredient = async () => {
        await setIngredients([
            ...ingredients,
            { quantity: '', unit: 'gram', description: '', detailedSize: false },
        ]);

    };

    const handleChange = async (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        await setIngredients(updatedIngredients);
        updateField('Ingredients', ingredients)

    };




    const handleRemoveIngredient = async (index) => {
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


    const handleChangeCreate = () => {
        setIsCreate(true)
        if (isShowCreate) {
            setIsShowCreate(false)
        } else {
            setRecipe(new DTORecipeMaster)
            setIngredients([{ quantity: '', unit: 'gram', description: '', detailedSize: false }])
            setIsShowCreate(true)
        }
    }

    const APICreateREcipe = async (e) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/createRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Thêm công thức thành công!')
                APIGetListRecipe(userName)
            } else {
                alert(`Lỗi: ${data.message}`);
            }
            handleChangeCreate()
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIUpdateRecipe = async (item) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/updateRecipe/' + recipe._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cập nhật công thức thành công!')
                APIGetListRecipe(userName)
            } else {
                alert(`Lỗi: ${data.message}`);
            }
            handleChangeCreate()
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIGetListRecipe = async (user) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/getRecipesByAuthor/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                setListData(data)
            } 
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIDeleteRecipe = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/deleteRecipe/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("Xóa công thức thành công!")
                APIGetListRecipe(userName)
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };




    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
        updateField("Thumbnail", e.target.value)
    };

    const handleUpdate = (item) => {
        
        APIUpdateRecipe(item)
        // setIngredients(item.ingredients)
    }

    const handleCheckItem = () => {

    }

    
    const handleCreate = () => {
        APICreateREcipe()
    }


    const handleDeleteRecipe = (id) => {
        APIDeleteRecipe(id)
    }

    const handleButtonUpdateClick = (item) => {
        setRecipe(item)
        setIsShowCreate(true)
        setIsCreate(false)
        setIngredients(item.Ingredients)
        
    }

    const handleClearImage = () =>{
        setImageUrl(null)
        updateField('Thumbnail', '')
    }

    useEffect(() => {
        if (userName) {

        }

    }, [userName])

    // Đọc dữ liệu từ localStorage khi component được tải
    useEffect(() => {
        const savedValue = localStorage.getItem("editorContent");
        if (savedValue) {
            setValue(savedValue);
        }
    }, []);

    useEffect(() => {
        setImageUrl(recipe.Thumbnail);
    }, [recipe.Thumbnail])

    
    useEffect(() => {
        const u = JSON.parse(localStorage.getItem('User')) 
        if (u) {
            setUserName(u.username)
            updateField("Author", u.id)
            console.log(u.id)
            APIGetListRecipe(u.id)
        }
    }, [])


    return (
        <div>
            <div className="container-infomation-page">
                <div className="block-main block-1">
                    <div className="block">
                        <div className="col-item-1">
                            <div className='avatarProfile'>
                                <img className='avatarA' src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' />
                            </div>
                            <div className='info'>
                                <div className='name'>
                                    {userName}
                                </div>
                                <div className='level'>
                                    Master Chef
                                </div>
                            </div>



                        </div>

                        <div onClick={() => handleChangeCreate()} className='btn-add-area'>
                            <div className='btn-add-new-post'>
                                <i class="fa-solid fa-plus"></i>
                                Thêm mới
                            </div>

                        </div>
                    </div>
                </div>

                <div className="block-main block-2">
                    <div className="block-area-2">
                        <div className='title'>
                            CÔNG THỨC CỦA BẠN
                        </div>
                        <div className='recipeList-info'>
                            {listData.map(item => (
                                <div className='card'>
                                    <div className='image-card'>
                                        <img src={item.Thumbnail}></img>
                                    </div>
                                    <div className='name-card'>{item.RecipeName}</div>
                                    <div className='description-card'>{item.RecipeDescription}</div>
                                    <div className='button-card'>
                                        <div onClick={() => handleDeleteRecipe(item._id)} className='btnDeleteCard'>Xóa</div>
                                        <div onClick={() => handleButtonUpdateClick(item)} className='btnUpdateCard'>Chỉnh sửa</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>  

                </div>
                {isShowCreate && <div className="block-main block-3">
                    <div className="container-manage-recipe">
                        <div className="content">
                            <div className="content-left">
                                <div className="area">
                                    {/* Input để nhập URL ảnh */}
                                    <div className="title-area">Ảnh Thumbnail <span className="important">(*)</span></div>
                                    <input
                                        disabled={imageUrl}
                                        type="text"
                                        placeholder="Nhập URL ảnh"
                                        value={recipe.Thumbnail}
                                        onChange={handleUrlChange}
                                        className="input"
                                    />
                                 

                                    <br /><br />

                                    {/* Hiển thị ảnh từ URL nếu có */}
                                    {imageUrl && 
                                    <div className='thumbnail-area'>
                                           <div onClick={() => handleClearImage()} className='button-delete-image'>x</div>
                                           <img className='thumbnail-image' src={imageUrl} alt="Selected Preview" />

                                    </div>}
                                    
                                </div>

                                <div className="area">
                                    <div className="title-area">Tiêu đề <span className="important">(*)</span></div>
                                    <input value={recipe?.RecipeName} onChange={(value) => updateField('RecipeName', value.target.value)} className="input" />
                                </div>
                                <div className="area">
                                    <div className="title-area">Mô tả <span className="important">(*)</span></div>
                                    <input value={recipe?.RecipeDescription} onChange={(value) => updateField('RecipeDescription', value.target.value)} className="input" />
                                </div>
                                <div className="area">
                                    <div className="title-area">Thời gian chế biến <span className="important">(*)</span></div>
                                    <input value={recipe.CookingTime} type="number" onChange={(value) => updateField('CookingTime', value.target.value)} className="input" />
                                </div>
                                <div className="area">
                                    <div className="title-area">Số lượng người ăn <span className="important">(*)</span></div>
                                    <input value={recipe.servings} type="number" onChange={(value) => updateField('servings', value.target.value)} className="input" />
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
                                                        value={ingredient.unit || "gram"}
                                                        onChange={(e) => handleChange(index, 'unit', e.target.value)}
                                                    >
                                                        <option value="gram">gram</option>
                                                        <option value="can">trái</option>
                                                        <option value="oz">kí</option>
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
                                        value={recipe.template}
                                        className="box-content"
                                        // value={value}
                                        onChange={(value) => updateField('template', value)}
                                        modules={modules}
                                        formats={formats}
                                        theme="snow" // Hoặc "bubble"
                                    />
                                </div>
                                <div className="btnArea">
                                    <div onClick={() => handleChangeCreate()} div style={{ backgroundColor: 'red' }} className="btnSave">Đóng</div>
                                     {!isCreate && <div onClick={() => handleUpdate()} className="btnSave">Cập nhật công thức</div>}
                                    {isCreate && <div onClick={() => handleCreate()} className="btnSave">Đăng công thức</div>} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className='dialog-delete'>

                </div>


            </div>

        </div>

    )
}