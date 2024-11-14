import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BaseLayout from "./pages/layout/BaseLayout.jsx";
import NotFound from "./pages/error/NotFound.jsx";
import Main from "./pages/Main.jsx";
import ExamLayout from "./pages/layout/ExamLayout.jsx";
import EditorLayout from "./pages/layout/EditorLayout.jsx";
import Question from "./pages/exam/question/Question.jsx";
import CBT from "./pages/cbt/CBT.jsx";
import Exams from "./pages/exam/Exams.jsx";
import Questions from "./pages/exam/question/Questions.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Main />},
        ],
    },
    {
        path: "/cbt",
        element: <ExamLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <CBT />},
            // { path: "/applies/:id", element: <Apply /> },
            // { path: "/applies/create", element: <ApplyCreate /> },
        ],
    },
    {
        path: "/exams",
        element: <ExamLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Exams />},
            { path: "/exams/:id/questions", element: <Questions /> },
            { path: "/exams/:id/questions/:id", element: <Question /> },
        ],
    },
    // 모든 문제를 모아서 필터링 할때 사용하자
    // {
    //     path: "/questions",
    //     element: <ExamLayout/>,
    //     errorElement: <NotFound/>,
    //     children: [
    //         {index: true, element: <Questions />},
    //         // { path: "/applies/:id", element: <Apply /> },
    //         // { path: "/applies/create", element: <ApplyCreate /> },
    //     ],
    // },
    {
        path: "/edit",
        element: <EditorLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Question/>}
        ]
    }
]);


function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
