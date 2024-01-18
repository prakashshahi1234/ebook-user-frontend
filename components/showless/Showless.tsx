"use client"
import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";

const ShowLessMore = ({htmlContent}:{htmlContent:string}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const executeOnClick = (expanded:boolean) => {
        console.log(expanded);
        setIsExpanded(expanded);
    };

    return (
        <ShowMoreText
            lines={5}
            more="See more"
            less="Show less"
            className="text-justify"
            anchorClass="show-more-less-clickable"
            onClick={executeOnClick}
            expanded={isExpanded}
            width={1000}
            truncatedEndingComponent={"... "}
        >
         <div className="text-justify" dangerouslySetInnerHTML={{__html:htmlContent}}></div>
        </ShowMoreText>
    );
};

export default ShowLessMore;
