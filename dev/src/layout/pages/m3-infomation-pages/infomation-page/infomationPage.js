import { RecipeList } from '../../../shared/component/C-RecipeList/RecipeList';
import './infomationPage.css'

export function InfomationPage() {
    const listTest = [
        { Code: 1, RecipeName: "Bún Real", RecipeDescription: "Món ăn đơn giản các bạn nên giản các bạn nên giản các bạn nên nấu để ăn vào ngày mưa", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 50, Author: "Heo con nấu ăn" },
        { Code: 2, RecipeName: "Mì quảng Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: false, NumOfSaved: 10, Author: "Mèo con nấu ăn" },
        { Code: 3, RecipeName: "Bún bò Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: false, NumOfSaved: 20, Author: "Heo con nấu ăn" },
        { Code: 4, RecipeName: "Hủ tiếu Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Chó con nấu ăn" },
        { Code: 5, RecipeName: "Phở bò Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Heo con nấu ăn" },
        { Code: 6, RecipeName: "Bún chả Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Lợn con nấu ăn" }
    ];
    return (
        <div className="container-infomation-page">
            <div className="block-main block-1">
                <div className="block">
                    <div className="col-item-1">
                        <div className='avatarProfile'>
                            <img className='avatarA' src='https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png' />
                        </div>
                        <div className='info'>
                            <div className='name'>
                                Luong Van Phu
                            </div>
                            <div className='level'>
                                Master Chef
                            </div>
                        </div>



                    </div>

                    <div className='btn-add-area'>
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
                    <div className='recipeList'>
                        <RecipeList data={listTest}></RecipeList>
                    </div>
                </div>
               
            </div>
            <div className="block-main block-2">

            </div>  
        </div>
    )
}