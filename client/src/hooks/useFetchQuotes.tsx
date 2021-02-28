import { exec } from 'child_process';
import {useEffect, useState} from 'react'

export interface Quote {
    quoteContent: string;
}

const useFetchQuotes = (path : string, method : string, body? : Object, execute=true) => {
    const [quotesList, setQuotesList] = useState<Array<Quote>>([]);
    useEffect( () => {
        if(execute){
            if(method == "GET"){
                const getQuotes = async () => {
                    const response = await fetch(`/api/quotes/${path}`, {method: "GET"});
                    const data = await response.json();
                    const quotes : Array<Quote> = data.map(obj=>{
                        return {quoteContent: obj.quote_content};
                    });
                    setQuotesList(quotes)
                }
                getQuotes();
            }
            if(method=="POST"){
                const postQuotes = async () => {
                    const response = await fetch(`/api/quotes/${path}`, 
                    {
                        method: "POST", 
                        body: JSON.stringify(body), 
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await response.json();
                }
                postQuotes();
            }
        }
   }, [execute])
    return quotesList;
}

export default useFetchQuotes;