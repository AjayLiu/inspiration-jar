import QuoteCard from '@components/QuoteCard';
import useFetchQuotes, { Quote } from '@hooks/useFetchQuotes';
import {useEffect, useState } from 'react'

interface Props{
    email : string;
}

const YourQuotes: React.FC<Props> = props => {
    const [gotQuotes, setGotQuotes] = useState(false);
    const userQuotes = useFetchQuotes(`from/${props.email}`)
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
                quotesList.map((q)=>{
                    return <QuoteCard quote={q}/>;
                })
            }
        </div>
    )
}

export default YourQuotes;