import { useEffect, useRef, useState } from 'react';
import './recipedetailpage.css'
import { DTORecipeMaster } from '../../shared/dto/DTORecipe';
import { Button } from '@mui/material';
import { DTORecipeComment } from '../../shared/dto/DTORecipeComment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

export function RecipeDetail() {
    const [currentUserID, setCurrentUserID] = useState({});
    const [recipe, setRecipe] = useState(new DTORecipeMaster);
    const [comments, setComments] = useState([]);
    const [recipeComment, setRecipeComment] = useState(new DTORecipeComment);
    const [visiblePopup, setVisiblePopup] = useState(null);
    const [isEditComment, setIsEditComment] = useState(false);
    const textareaRef = useRef(null);

    
    useEffect(() => {
        onComponentLoad();
    }, [])

    useEffect(() => {
        if (isEditComment && textareaRef.current) {
          textareaRef.current.focus();
        }
      }, [isEditComment]); 


    async function onComponentLoad(){
        updateField('_id', null)
        updateField('Descriptions', "")

        setIsEditComment(false);
        togglePopup(null);

        await handleGetCacheUser();
        await handleGetRecipe();
        
    }

    const handleGetCacheUser = async() =>{
        const u = JSON.parse(localStorage.getItem('User')) 
        
        if (u) {
            setCurrentUserID(u);
            updateField("User", u.id)
            updateField("ImageThumb", u.imagethumb)

        }
    }

    const handleGetRecipe = async() =>{
        const r =  JSON.parse(localStorage.getItem('DTORecipe')) 
        const u = JSON.parse(localStorage.getItem('User')) 
        const id = {idUser: u?.id, idRep: r?._id}
        updateField("Recipe", r?._id)
        APIGetRecipe(id)
        APIGetComments(r?._id)
    }

    const APIAddComment = async () => {
        try {

            const response = await fetch('http://localhost:5000/api/comments/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeComment),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Thêm công thức thành công!')
                updateField('Descriptions','')
                APIGetComments(recipe._id)
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
            const response = await fetch('http://localhost:5000/api/recipes/getRecipeById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    recipe: id.idRep,
                    user: id.idUser
                })
            });

            const data = await response.json();

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
    
    const APIGetComments = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/comments/getAllComments/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            

            if (response.ok) {
                setComments(data)
            } 
            
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIUpdateComment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/comments/updateComment/' + recipeComment._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeComment),
            });

            

            const data = await response.json();

            updateField('Descriptions', '')
            updateField('_id', null)
            if (response.ok) {
                alert('Cập nhật bình luận thành công!')
                APIGetComments(recipe._id)
                
            } else {
                alert(`Lỗi: ${data.message}`);
            }
            
            setIsEditComment(false);
            togglePopup(null);

        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');      
        }
    };

    const APIDeleteComment = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/comments/deleteComment/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert("Xóa comment thành công!")
                APIGetComments(recipe._id);
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APISaveRecipe = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/saveRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Recipe: recipe,
                    User: currentUserID
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Lưu thành công!")
                const id = {idUser: currentUserID.id, idRep: recipe._id}
                APIGetRecipe(id)
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };

    const APIUnSaveRecipe = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/unSaveRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Recipe: recipe,
                    User: currentUserID
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Huỷ lưu thành công!")
                const id = {idUser: currentUserID.id, idRep: recipe._id}
                APIGetRecipe(id)
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

    function handleAddComment(){
        if(isEditComment){
            APIUpdateComment()
        }else{
            APIAddComment()
        }
    }

    function handleDeleteComment(comment){
        
        if(comment.User._id == currentUserID.id || recipe.Author == currentUserID.id){
            APIDeleteComment(comment._id)
        }
        setVisiblePopup(null);
    }

    const updateField = (fieldName, value) => {
        setRecipeComment((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const togglePopup = (key) => {
        setVisiblePopup(visiblePopup === key ? null : key);
      };

    const toggleEdit = (item) => {
        updateField('_id',item?._id)
        updateField('Descriptions', item?.Descriptions)
        if(item)
        setIsEditComment(true);
    };

    const handleNavigateRecipe = (recipeID) => {
        localStorage.setItem('DTORecipe', JSON.stringify({_id: recipeID}))
        onComponentLoad();
    }

    const handleSaveRecipe = () =>{
        if(recipe?.isSaved != null)
            APIUnSaveRecipe()
        else 
            APISaveRecipe()
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
                    <div className='recipe-comment-title'>Bình luận</div>
                    <div className='recipe-comments'>
                        <div className={`comment-containers ${isEditComment ? 'disable':''}`}>
                            {comments.map((item, key) => (
                                <div className={`comment-img-container ${isEditComment && visiblePopup === key ? 'highlighted' : ''}`} key={key}>
                                <img src={item.User.imagethumb ?? 'https://tourdargent.jp/fileadmin/sites/tourdargent/about-us/chef/01.jpg'} className='comment-img'/>
                                <div className='comment-description'>
                                    <div>{item.User.fullname ?? "Ẩn danh"}</div>
                                    <div>{item.Descriptions}</div>
                                </div>
                                <div className={`more-action ${visiblePopup === key && !isEditComment ? 'visible' : ''}`}>
                                    <span className={`more-action-dots`} onClick={() => togglePopup(key)}>...</span>
                                    {visiblePopup === key && (
                                        <div className='more-action-popup'>
                                            <span className={`action ${item.User._id == currentUserID.id ? 'visible' : ''}`} onClick={() => toggleEdit(item)}>Chỉnh sửa</span>
                                            <span className={`action ${item.User._id == currentUserID.id || recipe.Author == currentUserID.id ? 'visible' : ''}`} onClick={() => handleDeleteComment(item)}>Xoá</span>
                                        </div>
                                        )}
                                </div>
                                </div>
                            ))}
                            
                        </div>
                        
                        <div className='input-comment-container'>
                            <img src={currentUserID.imagethumb ?? 'https://tourdargent.jp/fileadmin/sites/tourdargent/about-us/chef/01.jpg'} className='input-comment-img'/>
                            <textarea className='comment-input' ref={textareaRef} placeholder='Thêm bình luận' value={recipeComment.Descriptions} onChange={(e) => updateField("Descriptions", e.target.value)}/>
                            <div className='upload-cmt-button' onClick={() => handleAddComment()}><FontAwesomeIcon icon={faArrowUp} /></div>
                        </div>
                    </div>
                    
                </div>       
            </div>
            <div className="recipe-author">
                <div className='author-description'>
                    <div className='text-center text-bold author-name'>CHEF</div>
                    <div className='img-container'><img src='https://tourdargent.jp/fileadmin/sites/tourdargent/about-us/chef/01.jpg' className='author-img'/></div>
                    <div className='text-center author-name'>{recipe.Author?.fullname ?? ''}</div>
                    <div className='block-num-post-saved'>
                        <div className='num-post'>Số bài đăng: {recipe.numOfPost}</div>
                        <div className='num-post post-saved'>Lượt yêu thích: {recipe.NumOfSaved}</div>
                    </div>                   
                    <div className='text-center'>Các công thức nhiều lượt lưu</div>
                    <div className='recipe-card-list'>
                        {recipe.popularRecipes.map((item, key) => (
                            <div className='card-img-container' key={key}>
                                <img className="recipe-card-img" onClick={() => handleNavigateRecipe(item._id)} src={`${item.Thumbnail ?? "https://cdn.tgdd.vn/2021/02/CookProductThumb/BeFunky-collage-2021-02-01T112858.687-620x620.jpg"}`} width={150} height={150} />
                            </div>
                        ))}
                    </div>

                </div>  
                <div className='function-buttons'>
                    <div className='button' onClick={() => handleSaveRecipe()}>{recipe?.isSaved != null ? "Huỷ lưu" : "Lưu công thức"}</div>
                    <div className='button'>Quay lại</div>
                </div>               
            </div>
        </div>
    );
  }
  