import './App.css';
import {useEffect, useState} from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

function App() {

    const [students, setStudents] = useState([]);

    function getData () {
        const fetch_promise = fetch("http://localhost:5000/showAllStudents");
        fetch_promise.then(response => {
            return response.json();
        }).then(data => {
            setStudents(data.data)
        });
    }

    useEffect(getData, [])



    const createStudent = (newStudent) => {
        fetch("http://localhost:5000/addStudent", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(
                newStudent
            ),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "studentAdded");
                if (data.status === "ok") {
                    setStudents([...students, newStudent])
                }
            });
    }

    const removeStudent = (student) => {
        fetch("http://localhost:5000/deleteStudent", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(
                student
            ),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "studentDeleted");
                if (data.status === "ok") {
                    setStudents(students.filter(s => s.id !== student.id))
                }
            });
    }

    return (
        <div className="App">
            <h1>
                Лабораторна робота №3 ІПЗ
            </h1>
            <StudentForm create={createStudent}/>
            {students.length !== 0
                ? <StudentList remove={removeStudent} students={students}/>
                : <h1 style={{textAlign: "center"}}>Студентів немає!</h1>
            }

        </div>
    );
}

export default App;
