import { Button, Footer } from '../components'
import { useNavigate } from 'react-router-dom'
import { logoheader, favicon } from '../assets'

function SignUp(){
    return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#545454] via-pink-50 to-[#545454] flex flex-col items-center justify-center">
        <div className="flex justify-center gap-8 mb-8">
            <a href="https://projects.intra.42.fr/projects/ft_transcendence" target="_blank" rel="noopener noreferrer">
                <img src={logoheader} className="logoheader" alt="42 Tracker"/>
            </a>
        </div>
        
        <h1 className="text-4xl w-full text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] p-2 text-center mb-8">
            Créer un compte
        </h1>
        
        <form className="space-y-7">
            <div className="flex items-center gap-4">
                <label className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] font-semibold text-lg w-40 text-right">
                    Nom :
                </label>
                <input 
                    type="email" 
                    className="feild px-4 py-2 rounded-lg w-80" 
                    name="mail" 
                />
            </div>
            <div className="flex items-center gap-4">
                <label className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] font-semibold text-lg w-40 text-right">
                    Prénom :
                </label>
                <input 
                    type="email" 
                    className="feild px-4 py-2 rounded-lg w-80" 
                    name="mail" 
                />
            </div>
            <div className="flex items-center gap-4">
                <label className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] font-semibold text-lg w-40 text-right">
                    Adresse mail :
                </label>
                <input 
                    type="email" 
                    className="feild px-4 py-2 rounded-lg w-80" 
                    name="mail" 
                />
            </div>
            
            <div className="flex items-center gap-4">
                <label htmlFor="pass" className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] font-semibold text-lg w-40 text-right">
                    Mot de passe :
                </label>
                <input 
                    className="feild px-4 py-2 rounded-lg w-80" 
                    type="password" 
                    name="password" 
                    id="pass" 
                />
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="pass" className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-[#eab2bb] to-[#545454] font-semibold text-lg w-40 text-right">
                    Confirmez votre mot de passe :
                </label>
                <input 
                    className="feild px-4 py-2 rounded-lg w-80" 
                    type="password" 
                    name="password" 
                    id="pass" 
                />
            </div>
            <div className="text-center">
            </div>
            
            <div className="text-center">
                <input 
                    type="submit" 
                    className="submit cursor-pointer" 
                    value="Créer un compte" 
                />
            </div>
        </form>
        
        <img src={favicon} className="favicon mt-8" alt="Logo animé"/>
        <Footer/>
    </div>
    </>)
}

export default SignUp