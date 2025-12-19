import { Button, Footer, LogTitle, Background } from '../components'
import { useNavigate } from 'react-router-dom'
import { logoheader, favicon } from '../assets'
import '../styles/App.css' 

function Welcome(){
    const navigate = useNavigate();

    const handleSignIn= () => {
        navigate('/signIn');
    }
    const handleSignUp= () => {
        navigate('/signUp');
    }
    const handleAuth2= () => {
        navigate('/Auth2');
    }
    return (
    <>
    <Background>
        <div className="flex justify-center gap-8 mb-8">
            <a href="https://projects.intra.42.fr/projects/ft_transcendence" target="_blank">
                <img src={logoheader} className="logoheader" alt="42 Tracker"/>
            </a>
        </div>
            <LogTitle text='printf("Welcome");'/>
            <div className="card">
            <Button onClick={handleSignIn} text="Se connecter"/>
            <Button onClick={handleSignUp} text="Créer un compte"/>
            <div className="flex items-center gap-3 py-3">
            <div className="flex-1 h-px bg-slate-600"></div>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">ou</span>
                <div className="flex-1 h-px bg-slate-600"></div>
            </div>
            <Button onClick={handleAuth2} text="Se connecter avec 42"/>
            </div>
            <img src={favicon} className="favicon"/>
        <Footer/>
        </Background>
    </>
    )
}

export default Welcome