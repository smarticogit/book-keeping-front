export type CategoryRequest = {
  name: string;
};

export type AccountActivity = {
  id: string;
  statementId: string;
  postDate: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  beginningBalance: number;
  endingBalance: number;
  category?: CategoryRequest[];
};
export type Statement = {
  id: string;
  clientId: string;
  bankName: string;
  customerName: string;
  customerNumber: string;
  accountType: string;
  accountNumber: string;
  beginningBalance: string;
  endingBalance: string;
  statementDate: string;
  statementFile: Buffer;
  statementKey: string;
  accountActivity?: AccountActivity[];
  createdAt: Date;
  updatedAt: Date;
};

export type StatementCreate = {
  clientId: string;
  bankName: string;
  statementFile: File[];
  customerName: string;
};

export type Client = {
  id?: string;
  name: string;
  email: string;
  doc: string;
  statements?: Statement[];
  createdAt: Date;
  updatedAt: Date;
};

export type ClientRequest = {
  name: string;
  email: string;
  doc: string;
};
