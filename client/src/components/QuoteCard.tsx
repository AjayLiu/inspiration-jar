import { Quote } from "@hooks/useGetAllQuotes";
import styles from "@styles/QuoteCard.module.css"
import { useEffect, useState } from "react";

interface Props {
    quote : Quote;
}

const QuoteCard: React.FC<Props> = props => {

    const [quoteText, setQuoteText] = useState("Loading...");
    useEffect(()=>{
        if(props.quote){
            setQuoteText(props.quote.quoteContent);
        }
    }, [props.quote])
    return (
        <div>
            <div className={styles.stickynoteContainer} >
                {quoteText}
            </div>
        </div>
    )
}

export default QuoteCard;