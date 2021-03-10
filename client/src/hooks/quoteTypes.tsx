export interface Quote {
  quoteID: number;
  quoteContent?: string;
  approved?: boolean;
  voteCount?: number;
}

export interface Vote {
  quoteID: number;
}

export interface Status {
  submissionStatus:
    | "Waiting"
    | "Success"
    | "Duplicate"
    | "Too Fast"
    | "Too Long"
    | "Not Logged In"
    | "Failed";
  waitSeconds?: number;
}
