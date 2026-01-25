import { useState, useEffect } from 'react'
import { badges, starBadge } from '../../../badges/badges'

export default function BadgeWindow({isLoading}){
    const [badgeLevel, setBadgeLevel] = useState(3);
    const [starBadgeOwner, setStarBadge] = useState(true);
    const [stats, setStats] = useState(null);
    const accessToken = localStorage.getItem("access_token");
    useEffect(() => {
      const fetchProfile = async () => {
        try {
            isLoading(true);
          const responseMe = await fetch('/api/v1/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          if (!responseMe.ok) {
            localStorage.clear();
            console.error("Error while fetching info");
            setIsLoggedIn(false);
            return;
          }
          const fetchedUserData = await responseMe.json();
          console.log(fetchedUserData);
          setStats(fetchedUserData.stats);
          isLoading(false);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }
        if (accessToken)
          fetchProfile();
      }, [accessToken]);
      console.log(stats);
    return (
        <div className='badge-wrapper'>
            <div key="trophee" className='badge-container'>
                
            </div>
            {badges.map((type) => {
                const currentLevel = type.levels?.find(l => l.level === badgeLevel);
                return (
                    <div key={type.name} className='badge-container'>
                        {currentLevel && (
                            <img 
                                className='badge'
                                src={currentLevel.path} 
                                alt={`${type.name} - ${currentLevel.description}`}
                            />
                        )}
                        <div 
                            className="badge-progress-container"
                            style={{ borderColor: '#eab2bb'}}>
                            <div 
                                className="badge-progress-fill"
                                style={{ 
                                    width: '60%',
                                    backgroundColor: type.color 
                                }}
                            />
                        </div>
                        <br/>
                        <div className="badge-name">{type.name}</div>
                    </div>
                );
            })}
            {starBadgeOwner && (
                <div className='badge-container'>
                    <img 
                        className='badge'
                        src={starBadge.path}
                        alt="Star Badge - Admin"
                    />
                    <div className="badge-name">Admin ⭐</div>
                </div>
            )}
        </div>
    );
}