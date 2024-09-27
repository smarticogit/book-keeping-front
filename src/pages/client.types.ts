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
  statementDate: Date;
  statementFile: Buffer;
  statementKey: string;
  accountActivity?: AccountActivity[];
  createdAt: Date;
  updatedAt: Date;
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
