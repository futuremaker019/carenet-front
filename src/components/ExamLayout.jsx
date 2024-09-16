import React from 'react';
import {Outlet} from "react-router-dom";

const ExamLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ExamLayout;