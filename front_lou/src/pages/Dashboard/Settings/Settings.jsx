import '../../../styles/App.css'
import './Settings.css'
import { LogTitle } from '../../../components'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Footer, Background, HeaderBar, LeftMenu } from '../../../components'

function Settings() {
  const [openSection, setOpenSection] = useState(null)

  const handleSection = sectionName => {
    setOpenSection(openSection === sectionName ? null : sectionName)
  }
  return (
    <>
      <Background>
        <div className="page-wrapper">
          <HeaderBar /><div className="content-wrapper">
          <h1 className='settings-title'><LogTitle text="Réglages"/></h1>
          
          
              <section onClick={() => handleSection('profile')}>
                <LogTitle text="Mon profil" />
                <AnimatePresence>
                {openSection === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                      <div className="btn-setting">Changer ma photo de profil</div>
                      <div className="btn-setting">Changer ma biographie</div>
                      <div className="btn-setting">Linker mon github</div>
                  </motion.div>
                )}
                </AnimatePresence>
              </section>
            
            <section onClick={() => handleSection('security')}>
              <LogTitle text="Sécurité" />
              {openSection === 'security' && (
                <>
                  <div className="btn-setting">Changer mon mot de passe</div>
                  <div className="btn-setting">
                    Activer l'authentification a deux facteurs
                  </div>
                </>
              )}
            </section>
            <section onClick={() => handleSection('confidentiality')}>
              <LogTitle text="Confidentialité" />
              {openSection === 'confidentiality' && (
                <>
                  <div className="btn-setting">Supprimer mes données</div>
                  <div className="btn-setting">Exporter mes données</div>
                </>
              )}
            </section>
            <section onClick={() => handleSection('notifications')}>
              <LogTitle text="Notifications" />
              {openSection === 'notifications' && (
                <>
                  <div className="btn-setting">Désactiver les notifications</div>
                </>
              )}
            </section>
            <section onClick={() => handleSection('languagePreference')}>
              <LogTitle text="Préférence de langues" />
              {openSection === 'languagePreference' && (
                <>
                  <div className="btn-setting">Choisir Francais</div>
                  <div className="btn-setting">Choisir Anglais</div>
                  <div className="btn-setting">Choisir Espagnol</div>
                </>
              )}
            </section>
            <section onClick={() => handleSection('dangerZone')}>
              <LogTitle text="Danger zone" />
              {openSection === 'dangerZone' && (
                <>
                  <div className="btn-setting">Supprimer mon compte</div>
                  <div className="btn-setting">Effacer mes données</div>
                </>
              )}
            </section>
          </div>
        </div>
        <Footer />
      </Background>
    </>
  )
}

export default Settings
