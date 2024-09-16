import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BaseLayout from "./components/BaseLayout.jsx";
import NotFound from "./pages/error/NotFound.jsx";
import Main from "./pages/Main.jsx";
import ExamLayout from "./components/ExamLayout.jsx";
import Exams from "./pages/exam/Exams.jsx";
import EditorLayout from "./components/EditorLayout.jsx";
import QuestionEditor from "./pages/question/QuestionEditor.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Main/>},
        ],
    },
    {
        path: "/exams",
        element: <ExamLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <Exams/>},
            // { path: "/applies/:id", element: <Apply /> },
            // { path: "/applies/create", element: <ApplyCreate /> },
        ],
    },
    {
        path: "/edit",
        element: <EditorLayout/>,
        errorElement: <NotFound/>,
        children: [
            {index: true, element: <QuestionEditor/>}
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
