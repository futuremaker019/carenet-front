import React from 'react';
import Answer from "./Answer.jsx";

const Cbt = () => {
    return (
        <div className="h-[100vh]">
            <div className="bg-fuchsia-600 h-[10vh]"></div>
            <div className="flex h-[85vh]">
                <div className="bg-amber-600 flex-1">라라라</div>
                <Answer/>
            </div>
            <div className={"bg-blue-300 h-[5vh]"}></div>
        </div>
    );
};

export default Cbt;