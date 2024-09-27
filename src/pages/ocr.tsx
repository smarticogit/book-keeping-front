
import { useOCRApi } from "@/api/get";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { Toaster } from "sonner";

export function OCR() {
  const { data, isLoading } = useOCRApi();

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl font-bold mb-4">OCR Data</h1>

      {isLoading && (
        <p>
          <Toaster />
          Carregando...
        </p>
      )}

      {data && (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Account Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Bank Name:</strong> {data.bankName}
                </p>
                <p>
                  <strong>Customer Number:</strong> {data.customerNumber}
                </p>
              </div>
              <div>
                <p>
                  <strong>Account Type:</strong> {data.accountType}
                </p>
                <p>
                  <strong>Account Number:</strong> {data.accountNumber}
                </p>
              </div>
              <div>
                <p>
                  <strong>Beginning Balance:</strong> {data.beginningBalance}
                </p>
                <p>
                  <strong>Ending Balance:</strong> {data.endingBalance}
                </p>
              </div>
              <div>
                <p>
                  <strong>Statement Date:</strong> {data.statementDate}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Account Activities</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left">Post Date</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Debits</th>
                  <th className="px-4 py-2 text-left">Credits</th>
                  <th className="px-4 py-2 text-left">Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.activities.map(
                  (
                    activity: {
                      postDate:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      description:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                      debits: any;
                      credits: any;
                      balance:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | null
                        | undefined;
                    },
                    index: Key | null | undefined
                  ) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{activity.postDate}</td>
                      <td className="px-4 py-2">{activity.description}</td>
                      <td className="px-4 py-2">{activity.debits || "-"}</td>
                      <td className="px-4 py-2">{activity.credits || "-"}</td>
                      <td className="px-4 py-2">{activity.balance}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
