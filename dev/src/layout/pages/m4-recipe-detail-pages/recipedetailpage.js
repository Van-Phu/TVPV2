import './recipedetailpage.css'

export function RecipeDetail() {

    const [comments, setComments] = useState([]);
    

    return (
        <div className="recipe-detail">
            <div className="recipe-content">
                <div className='recipe-content-container'>

                </div>
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
  