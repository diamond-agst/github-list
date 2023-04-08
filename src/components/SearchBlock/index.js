import React, { useEffect, useState } from "react";
import "./styles.scss";
import searchIcon from "../../assets/images/searchIcon.svg";
import { useParams, Link } from "react-router-dom";
import axios from "axios"

const SearchBlock = ({setItems}) => {
    const params = useParams();
    const [searchValue, setSeachValue] = useState(params.id)

    useEffect(() => {
        getItems()
    }, [params])

    const getItems = () => {
        if(params){
            axios.get(`https://api.github.com/search/repositories?q=${params.id}`)
                .then(res => {
                    setItems(res.data.items)
                    localStorage.setItem('items', JSON.stringify(res.data.items));
            })  
        }
    }

    return(
        <div className="searchBlock">
            <div className="searchItem">
                <div className="searchInput">
                    <input 
                        onChange={(e) => setSeachValue(e.target.value)} 
                        value={searchValue}
                        placeholder="Начните вводить текст для поиска (не менее трех символов)"/>
                </div>
                <Link to={`http://localhost:3000/${searchValue}`} className="searchImage">
                    <img src={searchIcon} alt=""/>
                </Link>
            </div>
        </div>
    )
}

export default SearchBlock;