import React, { useEffect, useState } from "react";
import "./styles.scss"
import mainImg from "../../assets/images/mainImg.png"
import editIcon from "../../assets/images/editIcon.svg";
import editIconSecond from "../../assets/images/editIconSecond.png";
import starIcon from "../../assets/images/starIcon.svg";
import seenIcon from "../../assets/images/seenIcon.svg"

const ItemBlock = ({item, setItems, items}) => {
    const [valueComment, setValueComment] = useState()
    const [showComment, setShowComment] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [showOptionInfo, setShowOptionInfo] = useState(false)

    useEffect(() => {
        if(!valueComment){
            setShowComment(false)
        }
    }, [valueComment])

    const handleClick = (id) => {
        setItems(items.filter((item) => item.id !== id));
        localStorage.setItem('items', JSON.stringify(items.filter((item) => item.id !== id)));
        setShowToast(true);
        const timer = setTimeout(() => {
            setShowToast(false)
          }, 3000);
          return () => clearTimeout(timer);
      };

    const onEdit = () => {
        if(valueComment){
            setShowComment(true)
        }
    }

    return(
        <div className="itemWrapper">
            <div className="itemBlock">
                <div className="itemNameProject">
                    <a href={`https://github.com/${item.owner.login}/${item.name}`} target='_blank' rel="noreferrer">
                        <p>{item.name}</p>
                    </a>
                </div>
                <div className="itemName">
                    <img src={item.owner ? item.owner.avatar_url : mainImg} width={50} height={50} alt=""/>
                    <a href={`https://github.com/${item.owner.login}`} target='_blank' rel="noreferrer">
                        <p>{item.owner && item.owner.login}</p>
                    </a>
                </div>
                <div className="itemInfo">
                    <div className="itemStar">
                        <img src={starIcon} alt=""/>
                        <p>{item.stargazers_count}</p>
                    </div>
                    <div className="itemSeen">
                        <img src={seenIcon} alt=""/>
                        <p>{item.watchers}</p>
                    </div>
                    <div onClick={() => setShowOptionInfo(!showOptionInfo)} className="moreItem">
                        <p>&#8249;</p>
                    </div>
                </div>
                {showOptionInfo && 
                <div className="optionalInfo">
                    <div className="optionText">
                        <p>Visibility: {item.visibility}</p>
                        <p>Forks: {item.forks}</p>
                    </div>
                    <div className="deleteButton">
                        <button onClick={() => handleClick(item.id)}>Delete</button>
                    </div>
                </div>}
                {showComment ?
                <div className="commentEdit">
                    <img src={editIconSecond} width={20} alt=""/>
                    <input onChange={(e) => setValueComment(e.target.value)} value={valueComment}/>
                </div>: 
                <div className="itemComment">
                    <input onChange={(e) => setValueComment(e.target.value)} placeholder="Комментарий к проекту"/>
                    <button onClick={onEdit} className="editButton">
                       <img src={editIcon} alt=""/> 
                    </button>
                </div>
                }
                
            </div>
            {showToast &&
            <div className="toast">
                <p>Удален</p>
            </div>}
        </div>
    )
}

export default ItemBlock;