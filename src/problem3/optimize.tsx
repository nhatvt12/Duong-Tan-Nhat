/**
 * This is the code after enhence and fixing.
 * 1. Separation of Filtering and Sorting: 
 *  - Introduced filteredBalances for clarity.
 *  - Applied sorting on filtered data only.
 * 2. Fixed Filtering Bug: 
 *  - Correctly replaced lhsPriority with balancePriority.
 * 3. Optimized useMemo Usage: 
 *  - Removed unnecessary dependencies and added missing optimizations for formattedBalances.
 * 4. Precomputed usdValue: 
 *  - Added usdValue to the formattedBalances computation, reducing repeated operations in rendering.
 * 5. Improved Key Usage: 
 *  - Replaced the index as the key with balance.currency.
 * 6. Fixed Typing Issues:
 *  - Added the blockchain property to the WalletBalance interface.
 */



interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case "Osmosis":
          return 100;
        case "Ethereum":
          return 50;
        case "Arbitrum":
          return 30;
        case "Zilliqa":
        case "Neo":
          return 20;
        default:
          return -99;
      }
    };
  
    const filteredBalances = useMemo(() => {
      return balances.filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      );
    }, [balances]);
  
    const sortedBalances = useMemo(() => {
      return [...filteredBalances].sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
    }, [filteredBalances]);
  
    const formattedBalances = useMemo(() => {
      return sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue: prices[balance.currency] * balance.amount,
      }));
    }, [sortedBalances, prices]);
  
    const rows = formattedBalances.map((balance: FormattedWalletBalance) => (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  
    return <div {...rest}>{rows}</div>;
  };
  