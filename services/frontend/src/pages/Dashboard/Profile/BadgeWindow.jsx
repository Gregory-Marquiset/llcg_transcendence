import { useState } from 'react'
import { badges, starBadge } from '../../../badges/badges'

export default function BadgeWindow({name}){
    const [badge, setBadge] = useState(3);
    const [starBadgeOwner, setStarBadge] = useState(true);
    // if (starBadge.logins?.includes(name)){
        // setStarBadge(true);
    //     console.log(name);
    // }
        
     return (
        <div className='badge-wrapper'>
            {badges.map((type) => {
                const currentLevel = type.levels?.find(l => l.level === badge);
                return (

                    <div key={type.name} className='badge-container'>
                        {currentLevel && (
                            <img className='badge'
                                src={currentLevel.path} 
                                alt={`${type.name} - ${currentLevel.description}`}
                            />
                        )}
                        <progress className="badge-progress"/>
                        <div className="badge-name">{type.name}</div>
                    {starBadgeOwner && 
                        <div className='badge-container'>
                            <img className='badge'
                                src={starBadge.path}/>
                        </div>}
                    </div>
                );
            
            })}

        </div>
    );
}