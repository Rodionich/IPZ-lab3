import React from 'react';
import StudentItem from "./StudentItem";

const StudentList = ({students, remove}) => {
    return (
        <div>
            {students.map(student =>
                <StudentItem remove={remove} student={student} key={student.id} />
            )}
        </div>
    );
};

export default StudentList;