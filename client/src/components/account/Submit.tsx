import usePostQuotes from "@hooks/usePostQuotes";
import styles from "@styles/Submit.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Submit: React.FC = () => {
  const [userQuote, setUserQuote] = useState("");
  const [executeSubmitHook, setExecuteSubmitHook] = useState(false);

  const sendQuote = usePostQuotes("", { quote: userQuote }, executeSubmitHook); //only posts after executeSubmitHook turns to true

  const onQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserQuote(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setExecuteSubmitHook(true);
  };
  useEffect(() => {
    if (sendQuote.submissionStatus !== "Waiting") {
      if (sendQuote.submissionStatus === "Success") {
        //reset the form
        setUserQuote("");

        Swal.fire({
          title: "Quote Submission",
          text: "Success!",
          icon: "success",
        });
      } else {
        let errorText: string = sendQuote.submissionStatus;
        let errorTitle = "Error!";
        switch (sendQuote.submissionStatus) {
          case "Duplicate":
            errorTitle = "Duplicate";
            errorText =
              "Your quote seems to have already been submitted by someone. Try writing a different quote!";
            break;
          case "Too Fast":
            errorTitle = "Too Fast";
            errorText = `Please wait for another ${sendQuote.waitSeconds} seconds before submitting another quote!`;
            break;
          case "Too Long":
            errorTitle = "Too Long";
            errorText = "Please keep your quote under 255 characters";
            break;
        }
        Swal.fire({
          title: errorTitle,
          text: errorText,
          icon: "error",
        });
      }
      setExecuteSubmitHook(false);
    }
  }, [sendQuote]);

  return (
    <div>
      <hr className={styles.divider} />
      <h2>Submit a quote!</h2>
      <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
        <label className={styles.formLabel} htmlFor="quote">
          Your Heartwarming Message:
        </label>
        <textarea
          className={styles.formText}
          name="quote"
          value={userQuote}
          onChange={(e) => onQuoteChange(e)}
          maxLength={255}
        />
        <input className={styles.formSubmit} type="submit" value="Submit" />
      </form>
      <hr className={styles.divider} />
    </div>
  );
};

export default Submit;
