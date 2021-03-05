export interface Quote {
  quoteID: number;
  quoteContent?: string;
}

export interface Vote {
  quoteID: number;
}

export interface Status {
  submissionStatus: "Waiting" | "Success" | "Duplicate" | "Too Fast";
  waitSeconds?: number;
}
