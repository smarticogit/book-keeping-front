// types.ts
export interface Activity {
  postDate: string;
  description: string;
  debits: string;
  credits: string;
  balance: string;
}

export interface ExtractedData {
  bankName: string;
  customerName: string;
  customerNumber: string;
  phoneNumber: string;
  accountType: string;
  accountNumber: string;
  beginningBalance: string;
  endingBalance: string;
  statementDate: string;
  activities: Activity[];
}
