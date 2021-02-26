import {useEffect, useState} from 'react'
const useGetAllQuotes = () => {
    const [quotesList, setQuotesList] = useState([]);
    useEffect( () => {
        const getAllQuotes = async () => {
            const response = await fetch('/api/quotes');
            const data = await response.json();
            setQuotesList(data)
        }
        getAllQuotes();
    }, [])
    return quotesList;
}

export default useGetAllQuotes;