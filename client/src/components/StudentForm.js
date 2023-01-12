import React, {useState} from 'react';

const StudentForm = ({create}) => {

    const [student, setStudent] = useState({name: '', group: ''});

    const addNewStudent = (e) => {
        e.preventDefault();
        const newStudent = {
            ...student, id: Date.now(),
        }
        create(newStudent)
        setStudent({name: '', group: ''})
    }

    return (
        <div>
            <form>
                <input
                    value={student.name}
                    onChange={e => setStudent({...student, name: e.target.value})}
                    type="text"
                    placeholder="ФІО"/>
                <input
                    value={student.group}
                    onChange={e => setStudent({...student, group: e.target.value})}
                    type="text"
                    placeholder="Група"/>
                <button type="submit" onClick={addNewStudent}>Додати студента</button>
            </form>
        </div>
    );
};

export default StudentForm;