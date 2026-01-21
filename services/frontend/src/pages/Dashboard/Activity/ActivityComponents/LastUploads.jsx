import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Loading } from '../../../../components';
const data = [
    {
        id : 1,
        title : 'Sujet minishell'
    },
    {
        id : 2,
        title : 'doc sur les pipes'
    },
    {
        id : 3,
        title : 'liste roadmap'
    }
]

export default function LastUploads({setIsLoading}){
    const navigate = useNavigate();
    const handleOnClick = ((path) => {
        setIsLoading(true);
        setTimeout(()=> {
            navigate(path);
            setIsLoading(false);
        }, 500);
    })
    return <>
        <div className="lastuploads-container">
            <h3>   Vos derniers téléchargements</h3>
            {data.map((file) => {
                return <div className="historic-tile" key={file.id}>
                    <h3 onClick={() => handleOnClick('/dashboard/ressources')}>   {file.title}</h3>
                </div>
            })}
        </div>
    </>
}