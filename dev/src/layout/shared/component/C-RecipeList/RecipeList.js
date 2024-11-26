import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DTORecipeMaster } from "../../dto/DTORecipe"
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import './RecipeList.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RecipeList({data}) {
    const [recipes, setRecipes] = useState(data || []);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveClick = (recipe) =>{
        const updatedRecipes = recipes.map((item) => {
            if (item.Code === recipe.Code) {
                return { ...item, IsSaved: !item.IsSaved }; // Toggle IsSaved state
            }
            return item;
        });

        setRecipes(updatedRecipes); // Update state
    }

    const handleItemClick = (recipe) =>{
        localStorage.setItem('DTORecipe', JSON.stringify(recipe))
        navigate('/detail')
    }

    useEffect(() => {
        setRecipes(data);
    }, [data]);


    if(recipes.length == 0 && !isLoading){
        return <div style={{width: '100%', height:'500px', display: 'flex', justifyContent:'center', alignItems:'center', fontSize:'20px'}}>"Danh sách trống"</div>
    }
    
    return (
        <div className="recipe-list">
            {recipes.map((item, key) => (
                <div className="recipe-block" key={item.Code}>
                    <div className="image-block" onClick={() => handleItemClick(item)}>
                        <img className="img" src={item.Thumbnail} width={272} height={224} />
                    </div>
                    <div className="information-block">
                        <span className="recipe-title" title={item.RecipeName} onClick={() => handleItemClick(item)}>{item.RecipeName}</span>
                        <span className="recipe-description" title={item.RecipeDescription}>{item.RecipeDescription}</span>
                        <span className="recipe-author" title={item.Author?.username}>Người đăng: {item.Author?.username}</span>
                        <div className="save-block">
                            <span className="num-of-saved">{item.NumOfSaved} người đã lưu</span>
                            <span style={{display:'none'}} className={`save-icon ${item.IsSaved ? 'isSaved' : ''}`} onClick={() => handleSaveClick(item)}><FontAwesomeIcon icon={item.IsSaved ? solidBookmark : regularBookmark} /></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}