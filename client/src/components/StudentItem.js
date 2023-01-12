import React from 'react';

const StudentItem = (props) => {
    return (
        <div className="student">
            <div className="student-content">
                <strong>Студент групи {props.student.group}</strong>
                <div>{props.student.name}</div>
            </div>
            <div className="student-btns">
                <button onClick={() => props.remove(props.student)}>
                    Видалити
                </button>
            </div>
        </div>

    );
};

export default StudentItem;