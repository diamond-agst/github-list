import React from "react";
import ContentBlock from "../../components/ContentBlock";
import SearchBlock from "../../components/SearchBlock";

const Content = () => {

    return(
       <div className="contentBlock">
            <SearchBlock/>
            <ContentBlock/>
        </div>
    )
} 
    
export default Content;