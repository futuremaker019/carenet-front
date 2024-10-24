import React from "react";

export const exams =
    [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
        },
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },

    ];

export const questions = [
    {
        id: 1,
        name: "문제1",
        code: {name: "보건학", id: 1},
        progress: "IN_PROGRESS",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    },
    {
        id: 2,
        name: "문제2",
        code: {name: "지역보건학", id: 1},
        progress: "DONE",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    },
    {
        id: 3,
        name: "문제3",
        code: {name: "노인간호학", id: 1},
        progress: "IN_PROGRESS",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    },
    {
        id: 4,
        name: "문제4",
        code: {name: "유아보건학", id: 1},
        progress: "DONE",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    },
    {
        id: 5,
        name: "문제5",
        code: {name: "지역보건학", id: 1},
        progress: "DONE",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    },
    {
        id: 6,
        name: "문제6",
        code: {name: "유아보건학", id: 1},
        progress: "IN_PROGRESS",
        createUser: {id: 1, name: "user1"},
        updateUser: {id: 2, name: "user2"},
        createdAt: "2024-10-20T00:00:20",
        updatedAt: "2024-10-20T00:00:20",
    }
]

export const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>
    else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
    else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
    else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
    else return <div className="badge badge-ghost">Open</div>
}