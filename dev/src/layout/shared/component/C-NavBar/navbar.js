import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBook, faBox, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/userSlice';


export function Navbar() {
    const listModule = [
        { id: 0, text: 'CÔNG THỨC', icon: faBook, routeLink: '/recipe' },
        { id: 1, text: 'ĐÃ LƯU', icon: faBox, routeLink: '/savedRecipes'  },
        { id: 2, text: 'TRANG CÁ NHÂN', icon: faAddressBook, routeLink: '/infomation'  },
        { id: 3, text: 'Module 1', icon: faAddressBook,  routeLink: '/manageRecipePage' },
        { id: 4, text: 'Module 1', icon: faAddressBook },
    ]
    const [moduleActive, setModuleActive] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleModuleClick = (module) => {
        setModuleActive(module)
        navigate(module.routeLink)
    }
    
    const handleSignOut = () => {
        localStorage.clear()
        dispatch(logout());
    }

    return (
        <div className='container'>
            <div className="header">
                <div className='title-head'>
                    LET'SCOOK
                </div>
                <div className='avatar'>
                    <img className='imgAvatar' src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' />
                </div>
                <div className='name-user'>
                    LUONG VAN PHU
                </div>
            </div>
            <div className="body">
                {listModule.map((item) => (
                    <div onClick={() => handleModuleClick(item)} className={moduleActive?.id == item?.id ? 'item-module-active' : 'item-module'} key={item.id}>
                        <div className='btn-module'>
                            <FontAwesomeIcon icon={item.icon} />
                            <li>{item.text}</li>
                        </div>
                    </div>
                ))}
            </div>
            <div className="footer">
                <div onClick={() => handleSignOut()} className='btn-logout'>Đăng xuất</div>
            </div>
        </div>
    )
}