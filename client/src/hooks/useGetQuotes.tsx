import {useEffect, useState} from 'react'
import {Quote} from '@hooks/quoteTypes'

const useGetQuotes = (path : string, body? : Object, execute=true) => {
    const [quotesList, setQuotesList] = useState<Array<Quote>>([]);
    useEffect( () => {
        if(execute){
            const getQuotes = async () => {
                const response = await fetch(`/api/quotes${path}`, {method: "GET"});
                const data = await response.json();
                const quotes : Array<Quote> = data.map(obj=>{
                    return {quoteContent: obj.quote_content};
                });
                setQuotesList(quotes)
            }
            getQuotes();
            
        }
    }, [execute])
    return quotesList;
}

export default useGetQuotes;