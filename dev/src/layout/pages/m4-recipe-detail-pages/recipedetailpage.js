import { useEffect, useState } from 'react';
import './recipedetailpage.css'
import { DTORecipeMaster } from '../../shared/dto/DTORecipe';

export function RecipeDetail() {
    const [recipe, setRecipe] = useState(new DTORecipeMaster);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
            APIGetRecipe("674573f86fe971097a9280d8")
    }, [])

    const APIAddComment= async (e) => {
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
                APIGetRecipe("674573f86fe971097a9280d8")
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIGetRecipe = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/getRecipeById/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                setRecipe(data)
            } 
            // else {
            //     alert(`Lỗi: ${data.message}`);
            // }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };
    

    const APIDeleteComment = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/deleteComment/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("Xóa comment thành công!")
                const cacheRecipe = localStorage.getItem('Recipe');
                APIGetRecipe(cacheRecipe);
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }

    
    
    return (
        <div className="recipe-detail">
            <div className="recipe-content">
                <div className='recipe-content-container'>
                    <div className='recipe-content-title'>{recipe.RecipeName}</div>
                    <div className='date-update'>
                        <span>Ngày đăng: {formatDate(recipe.createdAt)}</span>
                        <span>Lần cuối chỉnh sửa: {formatDate(recipe.updatedAt)}</span>
                    </div>
                    <div className='ingredients-container'>
                        <div className='ingredients-title'>Danh sách nguyên liệu</div>
                        <ul className='ingredients-list'>
                            {recipe.Ingredients.map((ingredient) => (
                            <li key={ingredient._id}>
                                {ingredient.quantity} {ingredient.unit} {ingredient.description}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: recipe.template}}></div>
                </div>

                <div className='recipe-comment-container'>
                    <div>Bình luận</div>
                    <div className='recipe-comments'>
                        
                        <div className='comment-img-container'>
                            <img src='https://tourdargent.jp/fileadmin/sites/tourdargent/about-us/chef/01.jpg' className='comment-img'/>
                            <div className='comment-description'>
                                <div>Lương Văn Phú</div>
                                <div>Phải thú thật công thức này nấu ăn rất ngon</div>
                            </div>
                            <div className='more-action'>
                                <span>...</span>
                                <div className='more-action-popup'>
                                    <span className='action'>Chỉnh sửa</span>
                                    <span className='action'>Xoá</span>
                                </div>
                            </div>
                        </div>
               
                </div>
                </div>       
            </div>
            <div className="recipe-author">
                <div className='author-description'>
                    <div className='text-center text-bold author-name'>CHEF</div>
                    <div className='img-container'><img src='https://tourdargent.jp/fileadmin/sites/tourdargent/about-us/chef/01.jpg' className='author-img'/></div>
                    <div className='text-center author-name'>Tên tác giả</div>
                    <div className='block-num-post-saved'>
                        <div className='num-post'>Số bài đăng: 12</div>
                        <div className='num-post post-saved'>Lượt yêu thích: 12</div>
                    </div>                   
                    <div className='text-center'>Các công thức nhiều lượt lưu</div>
                    <div className='recipe-card-list'>
                        <div className='card-img-container'><img className="recipe-card-img" src="https://cdn.tgdd.vn/2021/02/CookProductThumb/BeFunky-collage-2021-02-01T112858.687-620x620.jpg" width={150} height={150} /></div>
                        <div className='card-img-container'><img className="recipe-card-img" src="https://cdn.tgdd.vn/2021/02/CookProductThumb/BeFunky-collage-2021-02-01T112858.687-620x620.jpg" width={150} height={150} /></div>
                        <div className='card-img-container'><img className="recipe-card-img" src="https://cdn.tgdd.vn/2021/02/CookProductThumb/BeFunky-collage-2021-02-01T112858.687-620x620.jpg" width={150} height={150} /></div>
                    </div>

                </div>               
            </div>
        </div>
    );
  }
  