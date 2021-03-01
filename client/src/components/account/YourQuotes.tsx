import QuoteCard from '@components/QuoteCard';
import useGetQuotes from '@hooks/useGetQuotes';
import {Quote} from '@hooks/quoteTypes';

import {useEffect, useState } from 'react'

interface Props{
    email : string;
}

const YourQuotes: React.FC<Props> = props => {
    const [gotQuotes, setGotQuotes] = useState(false);
    const userQuotes = useGetQuotes('/from')
    const [quotesList, setQuotesList] = useState<Array<Quote>>();
    useEffect(() => {
        if(userQuotes){
            setQuotesList(userQuotes);
            setGotQuotes(true);
        }
    }, [userQuotes]);
    return (
        <div>
            <h2>Your Quotes: {gotQuotes?quotesList.length: 0}</h2>
            {
                gotQuotes && 
                quotesList.map((q, idx)=>{
                    return <QuoteCard quote={q} key={idx} />;
                })
            }
        </div>
    )
}

export default YourQuotes;