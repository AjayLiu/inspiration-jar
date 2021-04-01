import usePostQuotes from "@hooks/usePostQuotes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Submit.module.scss";

interface Props {
  refetchCallback?;
}

const Submit: React.FC<Props> = (props) => {
  const [userQuote, setUserQuote] = useState("");
  const [executeSubmitHook, setExecuteSubmitHook] = useState(false);

  const sendQuote = usePostQuotes(
    "",
    "POST",
    { quote: userQuote },
    executeSubmitHook
  ); //only posts after executeSubmitHook turns to true

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
      props.refetchCallback();
      setExecuteSubmitHook(false);
    }
  }, [sendQuote]);

  return (
    <div>
      <hr className={styles.divider} />
      <h2>Submit a quote!</h2>
      <div className={styles.disclaimer}>
        <p>Your quote will be anonymous.</p>
        <p>
          Your email address will be visible only to admin for moderation
          purposes.
        </p>
      </div>
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
        <div className={styles.charCounter}>
          {userQuote.length + "/255 characters used"}
        </div>
        <input className={styles.formSubmit} type="submit" value="Submit" />
      </form>
      <hr className={styles.divider} />
    </div>
  );
};

export default Submit;
