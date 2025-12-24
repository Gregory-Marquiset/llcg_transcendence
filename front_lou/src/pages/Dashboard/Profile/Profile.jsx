import '../../../styles/App.css'
import { LogTitle, Footer, Background, HeaderBar, LeftMenu} from '../../../components'
import './Profile.css' 

function Profile() {
  return (
    <>
      <Background>
        <div className="page-wrapper">
          <HeaderBar/>
          <div className=' '>Mon profil</div>
          <div className='profile-wrapper'>
            <div className='profile-picture'/>
              <div className='personal-infos'>
                Mes informations personnelles
              </div>
              <div className='personal-infos'>
                  Mes badges
              </div>
          </div>
          </div>
        <Footer/>
      </Background>
    </>
  )
}

export default Profile