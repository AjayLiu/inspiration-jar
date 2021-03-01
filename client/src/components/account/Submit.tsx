import { useState, useEffect} from 'react';
import usePostQuotes from '@hooks/usePostQuotes'

import styles from "@styles/Submit.module.css"
const Submit: React.FC = () => {

    const [userQuote, setUserQuote] = useState("");
    const [executeSubmitHook, setExecuteSubmitHook] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [submissionStatus, setSubmissionStatus] = useState("");

    const sendQuote = usePostQuotes('', {"quote": userQuote}, executeSubmitHook); //only posts after executeSubmitHook turns to true

    const onQuoteChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserQuote(event.target.value)
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setExecuteSubmitHook(true);
        setShowForm(false);
    }
    useEffect(() => {
       if(sendQuote) {
            setSubmissionStatus(sendQuote);
       }
    }, [sendQuote]);

    return (
        <div>
            <hr className={styles.divider} />
            <h2>Submit a quote!</h2>
            {
                showForm ? 
                <form className={styles.form} onSubmit={(e)=>onSubmit(e)}>
                    <label className={styles.formLabel} htmlFor="quote">Your Heartwarming Message:</label>
                    <textarea className={styles.formText} name="quote" value={userQuote} onChange={(e)=>onQuoteChange(e)}/>
                    <input className={styles.formSubmit} type="submit" value="Submit" />
                </form>
                :
                <div>
                    {submissionStatus}
                </div>
            }
        </div>
    )
}

export default Submit;