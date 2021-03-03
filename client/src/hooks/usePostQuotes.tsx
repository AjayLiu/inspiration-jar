
import {useEffect, useState} from 'react'
import {QuoteSubmission} from '@hooks/quoteTypes'

const usePostQuotes = (path : string, body? : Object, execute=true) => {
    const [quoteConfirmation, setQuoteConfirmation] = useState<QuoteSubmission>({submissionStatus:"Waiting"});
    useEffect( () => {
        if(execute){            
            const postQuotes = async () => {
                const response = await fetch(`/api/quotes${path}`, 
                {
                    method: "POST", 
                    body: JSON.stringify(body), 
                    headers: { "Content-Type": "application/json" }
                });
                const data = await response.json();
                setQuoteConfirmation({
                    submissionStatus: data.submissionStatus,
                    waitSeconds: data.waitSeconds
                });
            }
            postQuotes();
        } else {
            setQuoteConfirmation({submissionStatus:"Waiting"})
        }
    }, [execute])
    return quoteConfirmation;
}

export default usePostQuotes;