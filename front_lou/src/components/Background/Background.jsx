import './Background.css'

export default function Background({ children }){
    return (<>
        <div className="background-regular">
            {children}
        </div>
    </>)
}