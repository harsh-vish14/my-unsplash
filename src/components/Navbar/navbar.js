import { Link } from "react-router-dom"
import Model from "./Model/model"
import './navbar.css'
import {BiSearchAlt} from 'react-icons/all'
import { useState ,useContext, useEffect} from "react"
import { UserContext } from "../../context/context"

const Navbar = () => {
    const [user, setuser] = useContext(UserContext).user;
    const [searchTerm, setSearchTerm] = useState("");

    const fetchingData = async () => {
        await fetch('/allImages')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setuser(data);
            })
    }
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const results = user.filter(person =>
            {if (person) {
            return person.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            }}
        );
        if (!searchTerm) {
            fetchingData()
        } else {
            
            setuser(results);
        }
    }, [searchTerm]);
    return (
        <div className='navbar' style={{paddingLeft:'20px',paddingRight:'20px'}}>
            <Link to='/' >
                <div style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/my_unsplash_logo.svg`} alt='logo' />
                </div>
            </Link>
            <div className='search-box' style={{ border: '2px solid #1b262c', padding: '5px', borderRadius: '10px' }} onChange={handleChange} value={searchTerm}>
                <BiSearchAlt style={{fontSize:'20px'}} />
                <input type='text' placeholder='Search..' style={{ marginLeft: '10px', border: 'none', outline: 'none', backgroundColor: 'transparent' }} />
            </div>
            <Model />
        </div>
    )
}

export default Navbar;