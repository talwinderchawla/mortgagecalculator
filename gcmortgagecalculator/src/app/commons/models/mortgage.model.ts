export interface MortgageSummary {
    category: string;
    term: string | null;
    amortperiod: string | null;
  }
  
  export interface PrepaymentInfo {
    prepaymentValue: number,
    prepaymentFreq: string,
    prepaymentStartPoint: number
  }

  export interface MortgageInfo {
    interestpayments: number;
    principalpayments: number;
    totalcost: number;
    interestSavings: number;
    numOfPayments: number;
    frequencyPayment: number;
    numOfTermPayments: number;
    termInterest: number;
    termPrincipal: number;
    termInterestSavings: number;
    chartData: number[];
    chartLabels: number[];
  }

  export interface AmortizationInfo {
    interestpayments: number;
    principalpayments: number;
    totalcost: number;
    numOfPayments: number;
    frequencyPayment: number;
    prepayment: number;
    totalInterestSavings: number | null;
  }
  
  export interface TermInfo {
    numofpayments: number;
    principalpayments: number;
    interestpayment: number;
    totalcost: number;
    frequencyPayment: number;
    prepayment: number;
    totalInterestSavings: number | null;
  }
  
  
  export interface MortgageCalculations {
    frequencyPayment: number;
    frequencyRate: number;
    monthlyPayment: number;
    yearlyNumOfPayments: number;
  }