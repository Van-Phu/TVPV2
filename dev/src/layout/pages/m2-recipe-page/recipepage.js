import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBook, faBox, faAddressBook, faMagnifyingGlass, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import './recipepage.css'
import { RecipeList } from '../../shared/component/C-RecipeList/RecipeList'
import { useEffect, useState } from 'react';
export function RecipePage() {

    const listTest = [
        { Code: 1, RecipeName: "Bún Real", RecipeDescription: "Món ăn đơn giản các bạn nên giản các bạn nên giản các bạn nên nấu để ăn vào ngày mưa", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 50, Author: "Heo con nấu ăn" },
        { Code: 2, RecipeName: "Mì quảng Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: false, NumOfSaved: 10, Author: "Mèo con nấu ăn" },
        { Code: 3, RecipeName: "Bún bò Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: false, NumOfSaved: 20, Author: "Heo con nấu ăn" },
        { Code: 4, RecipeName: "Hủ tiếu Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Chó con nấu ăn" },
        { Code: 5, RecipeName: "Phở bò Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Heo con nấu ăn" },
        { Code: 6, RecipeName: "Bún chả Real", RecipeDescription: "Test for test for test for", Category: ["monnuoc"], IsSaved: true, NumOfSaved: 80, Author: "Lợn con nấu ăn" }
    ];
    const [gridData, setGridData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    function handleFilterChange(value, fields) {
        const normalizedValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const filtered = gridData.filter(item => {
            // Check each field in the fields array
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

    useEffect(() => {
        setGridData(listTest);
        setFilteredData(listTest);
    }, []);

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

            </div>

            <div className='recipeList'>
                <RecipeList data={filteredData}></RecipeList>
            </div>
        </div>
    )
}