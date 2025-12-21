import { setting, profile, logoheader } from '../../assets'
import './HeaderBar.css'

export default function () {
  return (
    <>
      <div className='header-wrapper'>
        <button className="logo-bar">
          <img src={logoheader} />
        </button>
        <div className="header-bar">
        <div className="group-search-bar">
          <form>
            <label> </label>{' '}
            <input
              type="text"
              className="feild px-4 py-2 rounded-lg"
              placeholder="Mes groupes"
            />
          </form>
        </div>
        <div className="search-bar">
          <form>
            <label> </label>{' '}
            <input
              type="text"
              className="feild px-4 py-2 rounded-lg"
              placeholder="Rechercher"
            />
          </form>
        </div>
        <button className="navbar-btn">
          <img src={profile} />
        </button>
        <button className="navbar-btn">
          <img src={setting} />
        </button>
      </div>
      <div className="cosmetic-header" />
      </div>
    </>
  )
}
