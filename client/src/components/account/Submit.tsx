import { useState, useEffect} from 'react';
import usePostQuotes from '@hooks/usePostQuotes'
import Swal from 'sweetalert2'
import styles from "@styles/Submit.module.css"
const Submit: React.FC = () => {

    const [userQuote, setUserQuote] = useState("");
    const [executeSubmitHook, setExecuteSubmitHook] = useState(false);

    const sendQuote = usePostQuotes('', {"quote": userQuote}, executeSubmitHook); //only posts after executeSubmitHook turns to true

    const onQuoteChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserQuote(event.target.value)
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setExecuteSubmitHook(true);
    }
    useEffect(() => {
        if(sendQuote !== "Waiting"){
            if(sendQuote === "Success"){
                //reset the form
                setExecuteSubmitHook(false);
                setUserQuote('');      
                
                Swal.fire({
                    title: 'Quote Submission',
                    text: 'Success!',
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Quote Submission',
                    text: 'Error!',
                    icon: 'error'
                })
            }
        }
    }, [sendQuote]);

    return (
        <div>
            <hr className={styles.divider} />
            <h2>Submit a quote!</h2>
            <form className={styles.form} onSubmit={(e)=>onSubmit(e)}>
                <label className={styles.formLabel} htmlFor="quote">Your Heartwarming Message:</label>
                <textarea className={styles.formText} name="quote" value={userQuote} onChange={(e)=>onQuoteChange(e)}/>
                <input className={styles.formSubmit} type="submit" value="Submit" />
            </form>
            <hr className={styles.divider} />
        </div>
    )
}

export default Submit;