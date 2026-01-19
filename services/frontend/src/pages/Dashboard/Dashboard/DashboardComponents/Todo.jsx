import '../Dashboard.css'
import { useState } from 'react';
const data = [
    {
        title : "Readme",
        done : 0,
        description : 'faire le readme pour Minishell',
        deadline : '01/02/2026'
    },
    {
        title : "Correction",
        done : 0,
        description : 'Corriger philo',
        deadline : '30/01/2026'
    },
    {
        title : "Révisions",
        done : 0,
        description : "réviser l'exam",
        deadline : '01/02/2026'
    }
]

export default function Todo (){
    const [nbTask, setNbTask] = useState(0);
    return <>
    <div className='todo-summary'>
        You have {data.length} tasks
        {data.map((element) => (
           <div className='todo'>
                <div className='todo-title'>{element.title}</div>
                <p className='todo-description'>Description : {element.description} </p>
                {element.done !== 1 && <div class="checkbox-wrapper-5">
                <div class="check">
                    <input id="check-5" type="checkbox"/>
                    <label for="check-5"></label>
                </div>
                </div>}
                {element.done === 1 && <p>Task completed</p>}
            </div>))}
    </div>
    </>
}