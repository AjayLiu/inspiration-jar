import {useEffect, useState} from 'react'
import useGetAllQuotes from '@hooks/useGetAllQuotes'
import styles from "@styles/SingleDraw.module.css"

const SingleDraw: React.FC = () => {
    const quotesList = useGetAllQuotes();
    
    const [quotesContentList, setQuotesContentList] = useState(['Loading...']);

    useEffect(()=>{
        let arr = [];
        quotesList.forEach((obj)=>{
            arr.push(obj.quote_content);
        })
        setQuotesContentList(arr)
    }, [quotesList])

    return (
        <div>
            <div className={styles.stickynoteContainer}>
                {quotesContentList[0]}
            </div>
        </div>
    )
}

export default SingleDraw;