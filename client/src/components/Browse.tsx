import { Quote } from '@hooks/useGetAllQuotes'
import QuoteCard from './QuoteCard';

interface Props{
    quotesList: Array<Quote>
}

const Browse: React.FC<Props> = props => {
    
    const quotesList = props.quotesList;

    return (
        <div>
            <h2>Browse</h2>
            {quotesList.map((item, idx)=>{
                return <QuoteCard quote={item} key={idx}/>
            })}
        </div>
    )
}

export default Browse;