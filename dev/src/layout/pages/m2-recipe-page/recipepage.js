import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBook, faBox, faAddressBook, faMagnifyingGlass, faCirclePlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import './recipepage.css'
import { RecipeList } from '../../shared/component/C-RecipeList/RecipeList'
import { useEffect, useState } from 'react';
export function RecipePage({typeData}) {

    const [listRecipe, setListRecipe] = useState([])
    const [gridData, setGridData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentType, setCurrentType] = useState()

    const foodTypes = [
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món khai vị" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món chính" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món tráng miệng" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món ăn nhẹ" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món ăn chay" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món nướng" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món hấp" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món chiên" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món luộc" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món xào" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món canh" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món lẩu" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món súp" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món nước" },
        { image: 'https://haithuycatering.com/image/5c3c01d751046d196319f41c/original.jpg', name: "Món chay" }
      ];


    const APIGetListRecipe = async (user) => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/getAllRecipes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            if (response.ok) {
                setListRecipe(data)
                setFilteredData(data);
            } 
        } catch (error) {
            console.error('Lỗi kết nối:', error);
            alert('Lỗi hệ thống!');
        }
    };



    function handleFilterChange(value, fields) {
        const normalizedValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if(!normalizedValue){
            setFilteredData(listRecipe)
            return
        }

        const filtered = filteredData.filter(item => {
            return fields.some(field => {
                const fieldValue = item[field];
                if (typeof fieldValue === 'string') {
                    // Compare field value to search input (case-insensitive)
                    const normalizedFieldValue = fieldValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    return normalizedFieldValue.includes(normalizedValue);
                }
                return false; // If the field is not a string, don't include it in filtering
            });
        });

        setFilteredData(filtered); // Update filtered data
    }

    const handleFilterType = (itemData) => {
        if(currentType?.name == itemData.name){
            setCurrentType(null)
            setFilteredData(listRecipe)
            return
        }
        setCurrentType(itemData)
        const data = listRecipe.filter((item) => 
            item.Category.some(category => category.name == itemData.name)
        );

        setFilteredData(data)
    }
    

    useEffect(() => {
        APIGetListRecipe()
    }, []);

    useEffect(() => {
 
    })

    return (
        <div className='recipeContainer'>
            <div className="recipteHeader">
                <div className="searchArea">
                    <div className="search">
                        <input className='inputSearch' placeholder="Tìm kiếm theo công thức theo món ăn yêu thích" 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.target.blur();
                                e.target.focus();
                            }
                        }} 
                        onBlur={(e) => handleFilterChange(e.target.value, ['RecipeName', 'Author'])} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </div>
                <div className='btnRightArea'>
                    <div style={{ fontWeight: 'bold' }}>Bạn muốn thêm món ăn ở danh mục này?</div>
                    <div className='btnAddRecipe'>
                        <FontAwesomeIcon icon={faCirclePlus} />
                        <div>Công thức mới</div>
                    </div>
                </div>
            </div>

            <div className='recipe-category'>
                {foodTypes.map((item) => (
                    <div onClick={() => handleFilterType(item)}>
                        <div className={`image-area ${currentType?.name === item.name ? 'selected' : ''}`}>
                            <img src={item.image} alt={item.name} />
                            {currentType?.name === item.name && <div className="overlay">
                                <FontAwesomeIcon icon={faCheck} /></div>}
                        </div>
                        <div className="text-image">{item.name}</div>
                    </div>
                ))}

            </div>

            <div className='recipeList'>
                <RecipeList data={filteredData}></RecipeList>
            </div>
        </div>
    )
}