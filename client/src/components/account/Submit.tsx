import { useState, useEffect} from 'react';
import useFetchQuotes from '@hooks/useFetchQuotes'

import styles from "@styles/Submit.module.css"
const Submit: React.FC = () => {

    const [userQuote, setUserQuote] = useState("");
    const [executeSubmitHook, setExecuteSubmitHook] = useState(false);

    useFetchQuotes('', "POST", {"quote": userQuote}, executeSubmitHook); //only posts after executeSubmitHook turns to true

    const onQuoteChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserQuote(event.target.value)
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setExecuteSubmitHook(true);
    }

    return (
        <div>
            <hr className={styles.divider} />
            <h2>Submit a quote!</h2>
            <form className={styles.form} onSubmit={(e)=>onSubmit(e)}>
                <label className={styles.formLabel} htmlFor="quote">Your Heartwarming Message:</label>
                <textarea className={styles.formText} name="quote" value={userQuote} onChange={(e)=>onQuoteChange(e)}/>
                <input className={styles.formSubmit} type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Submit;