export interface Quote {
  quoteID: number;
  quoteContent?: string;
  approved?: boolean;
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
    | "Not Logged In";
  waitSeconds?: number;
}
