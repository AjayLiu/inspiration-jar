import styles from "@styles/Submit.module.css"
const Submit: React.FC = () => {
    return (
        <div>
            <hr className={styles.divider} />
            <h2>Submit a quote!</h2>
            <form className={styles.form} action="/api/quotes" method="POST">
                <label htmlFor="quote">Your Heartwarming Message:</label>
                <input name="quote" type="text"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Submit;