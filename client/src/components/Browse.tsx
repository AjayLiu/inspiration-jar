import {useEffect, useState} from 'react'

const Browse: React.FC = () => {
    const urlPrefix = process.env.NODE_ENV == "development" ? "http://localhost:5000" : '';
    
    const [quotesList, setQuotesList] = useState([]);

    useEffect( () => {
        const getAllQuotes = async () => {
            const response = await fetch(`${urlPrefix}/quotes`);
            const data = await response.json();
            setQuotesList(data)
        }
        getAllQuotes();
    }, [])

    return (
        <div>
            {quotesList.map((item, idx)=>{
                return <div key={idx}>{item.quote_content}</div>
            })}
        </div>
    )
}

export default Browse;