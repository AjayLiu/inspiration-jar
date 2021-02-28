import {useEffect, useState} from 'react'

export interface Quote {
    quoteContent: string;
}

const useFetchQuotes = path => {
    const [quotesList, setQuotesList] = useState<Quote[]>([]);
    useEffect( () => {
        const getAllQuotes = async () => {
            const response = await fetch(`/api/quotes/${path}`);
            const data = await response.json();
            const quotes : Array<Quote> = data.map(obj=>{
                return {quoteContent: obj.quote_content};
            });
            setQuotesList(quotes)
        }
        getAllQuotes();
    }, [])
    return quotesList;
}

export default useFetchQuotes;