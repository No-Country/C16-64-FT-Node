import React, { useEffect, useState } from "react";
import TransactionCard from "@/components/TransactionCard";
import Transactions from "@/services/Transactions";
import { cleanParams } from "@/utils/queryParams";
import { type ITransaction } from "@/interfaces/Transactions";
import { useStore } from "@nanostores/react";
import { loading_screen, transactionParams, transaction_update } from "@/store";
import { groupTransactions } from "@/utils/groupTransaction";
import LoadingScreen from "../screen/loadingscreen";

interface TransactionsData {
  incomeTotal: number;
  outcomeTotal: number;
  total: number;
  transactions: {
    date: string;
    incomeTotal: number;
    outcomeTotal: number;
    transactions: ITransaction[];
  }[];
}

const TransactionList = () => {
  /** State */

  const $transaction_update = useStore(transaction_update);
  const $loading_screen = useStore(loading_screen);

  const [data, setData] = useState<TransactionsData>({
    incomeTotal: 0,
    outcomeTotal: 0,
    transactions: [],
    total: 0,
  });

  const $transactionsParams = useStore(transactionParams);
  const params = cleanParams($transactionsParams);

  /** Fetch Data  */
  const getTransactions = new Transactions().fetchPaginatedData;

  useEffect(() => {
    fetchTransactions();
  }, [$transactionsParams, $transaction_update]);

  const handdleTransaction = (value: number) => transaction_update.set(value);

  const fetchTransactions = async () => {
    loading_screen.set(true);
    await getTransactions(params)
      .then((response) => {
        if (response) {
          const groupData = groupTransactions(response);
          setData(groupData);
        }
      })
      .finally(() => loading_screen.set(false));
  };

  return (
    <div className="bg-white relative min-h-[65vh] z-0">
      {$loading_screen ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex justify-between items-center px-8 py-4 delay-300">
            <div className="flex flex-col items-center text-md md:text-lg text-gray-500">
              <span>Ingresos</span>
              <span className="text-lg md:text-xl font-bold text-[#477beb]">
                $ {data.incomeTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-center text-md md:text-lg text-gray-500">
              <span>Egresos</span>
              <span className="text-lg md:text-xl font-bold text-[#f35252]">
                $ {data.outcomeTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-center text-md md:text-lg text-gray-500">
              <span>Total</span>
              <span className="text-lg md:text-xl font-bold text-black">
                $ {data.total.toFixed(2)}
              </span>
            </div>
          </div>
          {data.transactions &&
            data.transactions.map((item, index) => {
              const date = new Date(item.date).getUTCDate();
              const period = new Date(item.date).toLocaleDateString("es-ES", {
                month: "short",
              });
              const month = new Date(item.date).toLocaleDateString("es-ES", {
                month: "2-digit",
              });
              const year = new Date(item.date).toLocaleDateString("es-ES", {
                year: "2-digit",
              });

              return (
                <div key={index} className="">
                  <div className="mt-4  flex justify-between items-center px-8 py-4 bg-gray-200 rounded-md">
                    <div className="flex gap-2 items-center">
                      <span className="text-3xl font-bold">{date}</span>
                      <span className="bg-secondary-900 text-white font-bold text-md px-2 py-0 rounded-md first-letter:uppercase">
                        {period}
                      </span>
                      <span className="text-md text-gray-500">
                        {month}.{year}
                      </span>
                    </div>
                    <div className="flex gap-16 items-center">
                      <span className=" text-md md:text-lg font-bold text-[#477beb]">
                        $ {item.incomeTotal.toFixed(2)}
                      </span>
                      <span className=" text-md md:text-lg font-bold text-[#f35252]">
                        $ {item.outcomeTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {item.transactions &&
                    item.transactions.map(
                      (transaction: ITransaction, index) => (
                        <TransactionCard
                          key={index}
                          {...transaction}
                          updateData={handdleTransaction}
                        />
                      ),
                    )}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default TransactionList;
