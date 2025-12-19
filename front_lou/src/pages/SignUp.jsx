import { Button, Footer, LogTitle, Background } from '../components'
import { useNavigate } from 'react-router-dom'
import { logoheader, favicon } from '../assets'

function SignUp(){
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/');
    }
    return (
    <>
    <Background>
        <div className="flex justify-center gap-8 mb-8">
            <a onClick={handleOnClick}>
                <img src={logoheader} className="logoheader" alt="42 Tracker"/>
            </a>
        </div>
        
        <LogTitle text='void *ft_register(t_user *new_user);'/>
        
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
    </Background>
    </>)
}

export default SignUp