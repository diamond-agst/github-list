import React, { useEffect, useState } from "react";
import "./styles.scss";
import ContentBlock from "../../components/ContentBlock";
import SearchBlock from "../../components/SearchBlock";
import ItemBlock from "../../components/ItemBlock";
import ReactPaginate from 'react-paginate';

const Content = () => {
    const [items, setItems] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [showPerPage, setShowPerPage] = useState(false);
    const endOffset = itemOffset + itemsPerPage;
    let currentItems = items && items.slice(itemOffset, endOffset);
    const pageCount = items && Math.ceil(items.length / itemsPerPage);
    const handlePageClick = (event) => {
        if(items){
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        }
    };

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('items'))
        if(items){
            setItems(items)
        }
    }, [])

    return(
       <div className="contentBlock">
            <SearchBlock setItems={setItems}/>
            {items ?
            <div>
                <div className="itemsBlock">
                    {items && currentItems.map(item => {
                        return(
                        <ItemBlock setItems={setItems} item={item} items={items}/> 
                        )
                    })}
                </div> 
                <div className="paginationBlock">
                    <div className="showItem">
                        <div className="showCount" onClick={() => setShowPerPage(true)}>
                           <p className="showText">{itemsPerPage}</p>
                           <div className="triangle"></div>
                        </div>
                        
                        {showPerPage && <div className="selectPerPage">
                            <div className="perPageBlock" onClick={() => setShowPerPage(false)}>
                                <p className="showText">{itemsPerPage}</p>
                                <div className="triangle"></div>
                            </div>
                            {itemsPerPage !== 25 &&
                            <p
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(25)
                            }} 
                            className="showText">25</p>}
                            {itemsPerPage !== 10 &&
                            <p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(10)
                            }}
                            className="showText">10</p>}
                            {itemsPerPage !== 50 &&
                            <p 
                            onClick={() => {
                                setShowPerPage(false);
                                setItemsPerPage(50)
                            }}
                            className="showText">50</p>}
                        </div>}
                    </div>
                    <div className="paginationItem">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="&#8250;"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="&#8249;"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                    <div></div>
                </div>
            </div>:
            <ContentBlock/>
            } 
        </div>
    )
} 
    
export default Content;