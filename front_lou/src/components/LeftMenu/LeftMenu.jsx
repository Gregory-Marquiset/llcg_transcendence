import { Button }from '../'
import './LeftMenu.css'

export default function(){
    return (
        <div className="left-menu">
            <Button text="Mes activités" />
            <Button text="Mes achievements" />
            <Button text="Mes Conversations" />
            <Button text="Mes ressources" />
            <Button text="Exporter mes data" />
            <Button text="A propos" />
          </div>
    )
}
