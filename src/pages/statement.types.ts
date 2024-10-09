// types.ts
export type AccountActivityUpdate = {
  postDate: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  beginningBalance: number;
  endingBalance: number;
  category?: string;
};

export interface ExtractedData {
  id: string;
  clientId: string;
  bankName: string;
  customerName: string;
  customerNumber: string;
  accountType: string;
  accountNumber: string;
  beginningBalance: number;
  endingBalance: number;
  statementDate: Date | null;
  statementKey: string;
  accountActivity?: AccountActivityUpdate[];
  createdAt: Date;
  updatedAt: Date;
}
