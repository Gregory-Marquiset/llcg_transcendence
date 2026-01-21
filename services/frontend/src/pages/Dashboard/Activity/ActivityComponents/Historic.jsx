const data = [
    {
        title: 'Experience',
        description : 'A gagné 10xp',
        date : '30/12/2025'
    },
    {
        title: 'A upload a file',
        description : 'sujet minishell',
        date : '30/12/2025'
    },
    {
        title: 'A un nouvel ami',
        description : 'lobriott',
        date : '30/12/2025'
    }
]

export default function Historic(){
    return <>
        <div className="historic-container">
            <h3>   Votre historique</h3>
            {data.map((item, index) => {
                return <>
                    <div className="historic-tile" key={index}>
                        <h3>  <strong>{item.title}</strong> : {item.description}</h3>
                        <h4>{item.date}.  </h4>
                    </div>
                </>
            })}
        </div>
    </>
}