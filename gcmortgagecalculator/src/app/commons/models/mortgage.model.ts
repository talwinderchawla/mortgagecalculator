export interface MortgageSummary {
    category: string;
    term: string | null;
    amortperiod: string | null;
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
    chartData: number[];
    chartLabels: number[];
  }

  export interface AmortizationInfo {
    interestpayments: number;
    principalpayments: number;
    totalcost: number;
    numOfPayments: number;
    frequencyPayment: number;
  }
  
  export interface TermInfo {
    numofpayments: number;
    principalpayments: number;
    interestpayment: number;
    totalcost: number;
    frequencyPayment: number;
  }
  
  
  export interface MortgageCalculations {
    frequencyPayment: number;
    frequencyRate: number;
    monthlyPayment: number;
    yearlyNumOfPayments: number;
  }