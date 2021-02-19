import {useEffect, useState} from 'react'

const Browse: React.FC = () => {
    
    const [quotesList, setQuotesList] = useState([]);

    useEffect( () => {
        const getAllQuotes = async () => {
            const response = await fetch('/api/quotes');
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