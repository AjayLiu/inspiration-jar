import { Status } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";

const usePostQuotes = (
  path: string,
  method?: string,
  body?: Object,
  execute = true
) => {
  const [quoteConfirmation, setQuoteConfirmation] = useState<Status>({
    submissionStatus: "Waiting",
  });
  // console.log(body);
  useEffect(() => {
    if (execute) {
      const postQuotes = async () => {
        const response = await fetch(`/api/quotes${path}`, {
          method: method ?? "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setQuoteConfirmation({
          submissionStatus: data.submissionStatus,
          waitSeconds: data.waitSeconds,
        });
      };
      postQuotes();
    } else {
      setQuoteConfirmation({ submissionStatus: "Waiting" });
    }
  }, [execute]);
  return quoteConfirmation;
};

export default usePostQuotes;
