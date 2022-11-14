import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MortgageCalculatorService } from 'src/app/commons/services/mortgage-calculator.service';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
})
export class MortgageCalculatorComponent implements OnInit {
  mrtgCalcForm = new UntypedFormGroup({
    mrtgAmt: new UntypedFormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intRate: new UntypedFormControl('', { validators: [Validators.required] }),
    amorPeriodYr: new UntypedFormControl('', {}),
    amorPeriodMonth: new UntypedFormControl('', {}),
    paymtFreq: new UntypedFormControl('', {
      validators: [Validators.required],
    }),
    term: new UntypedFormControl('', { validators: [Validators.required] }),
    prepaymentAmt: new UntypedFormControl(''),
    prepaymentFreq: new UntypedFormControl(''),
    startWithPayment: new UntypedFormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
  });

  public amortizationYears: { yearLabel: string; value: number }[] = [
    { yearLabel: '1 Year', value: 1 },
    { yearLabel: '2 Years', value: 2 },
    { yearLabel: '3 Years', value: 3 },
    { yearLabel: '4 Years', value: 4 },
    { yearLabel: '5 Years', value: 5 },
    { yearLabel: '6 Years', value: 6 },
    { yearLabel: '7 Years', value: 7 },
    { yearLabel: '8 Years', value: 8 },
    { yearLabel: '9 Years', value: 9 },
    { yearLabel: '10 Years', value: 10 },
    { yearLabel: '11 Years', value: 11 },
    { yearLabel: '12 Years', value: 12 },
    { yearLabel: '13 Years', value: 13 },
    { yearLabel: '14 Years', value: 14 },
    { yearLabel: '15 Years', value: 15 },
    { yearLabel: '16 Years', value: 16 },
    { yearLabel: '17 Years', value: 17 },
    { yearLabel: '18 Years', value: 18 },
    { yearLabel: '19 Years', value: 19 },
    { yearLabel: '20 Years', value: 20 },
    { yearLabel: '21 Years', value: 21 },
    { yearLabel: '22 Years', value: 22 },
    { yearLabel: '23 Years', value: 23 },
    { yearLabel: '24 Years', value: 24 },
    { yearLabel: '25 Years', value: 25 },
    { yearLabel: '26 Years', value: 26 },
    { yearLabel: '27 Years', value: 27 },
    { yearLabel: '28 Years', value: 28 },
    { yearLabel: '29 Years', value: 29 },
    { yearLabel: '30 Years', value: 30 },
  ];
  public amortizationMonths: { monthLabel: string; value: number }[] = [
    { monthLabel: '1 Month', value: 1 },
    { monthLabel: '2 Months', value: 2 },
    { monthLabel: '3 Months', value: 3 },
    { monthLabel: '4 Months', value: 4 },
    { monthLabel: '5 Months', value: 5 },
    { monthLabel: '6 Months', value: 6 },
    { monthLabel: '7 Months', value: 7 },
    { monthLabel: '8 Months', value: 8 },
    { monthLabel: '9 Months', value: 9 },
    { monthLabel: '10 Months', value: 10 },
    { monthLabel: '11 Months', value: 11 },
  ];
  public paymentFrequencies: { frequencyLabel: string; value: string }[] = [
    { frequencyLabel: 'Accelerated Weekly', value: 'accw' },
    { frequencyLabel: 'Weekly', value: 'weekly' },
    { frequencyLabel: 'Accelerated Bi-weekly', value: 'accbiw' },
    { frequencyLabel: 'Bi-Weekly (every 2 weeks)', value: 'biw' },
    { frequencyLabel: 'Semi-monthly (24x per year)', value: 'semim' },
    { frequencyLabel: 'Monthly (12x per year)', value: 'monthly' },
  ];

  public prepaymentFrequencies: { frequencyLabel: string; value: string }[] = [
    { frequencyLabel: 'One time', value: 'one' },
    { frequencyLabel: 'Each Year', value: 'eachyr' },
    { frequencyLabel: 'Same as regular payment', value: 'samelikeregular' },
  ];

  public terms: { termLabel: string; value: number }[] = [
    { termLabel: '1 Year', value: 1 },
    { termLabel: '2 Years', value: 2 },
    { termLabel: '3 Years', value: 3 },
    { termLabel: '4 Years', value: 4 },
    { termLabel: '5 Years', value: 5 },
    { termLabel: '6 Years', value: 6 },
    { termLabel: '7 Years', value: 7 },
    { termLabel: '8 Years', value: 8 },
    { termLabel: '9 Years', value: 9 },
    { termLabel: '10 Years', value: 10 },
  ];

  public dataSource = new MatTableDataSource<MortgageSummary>();
  public displayedColumns: string[] = [];

  public amortizationInfo: AmortizationInfo = {
    interestpayments: 0,
    principalpayments: 0,
    totalcost: 0,
    interestSavings: 0,
    numOfPayments: 0,
    frequencyPayment: 0,
    numOfTermPayments: 0,
    termInterest: 0,
    termPrincipal: 0,
  };

  private mortgageSummary: MortgageSummary[];

  constructor(
    private mortgageCalcService: MortgageCalculatorService,
    private currencyPipe: CurrencyPipe
  ) {
    this.mortgageSummary = [];
  }

  ngOnInit(): void {
    this.displayedColumns = ['category', 'term', 'amortperiod'];
  }

  calculateMortgageMonthly() {
    const yearsVal = this.mrtgCalcForm.controls['amorPeriodYr'].value;
    const monthsVal = this.mrtgCalcForm.controls['amorPeriodMonth'].value;
    const mortFreq: string = this.mrtgCalcForm.controls['paymtFreq'].value;
    const principal = this.mrtgCalcForm.controls['mrtgAmt'].value;
    const perAnnumInterest = this.mrtgCalcForm.controls['intRate'].value;
    const termYears = this.mrtgCalcForm.controls['term'].value;
    const monthsAmortization = yearsVal * 12 + monthsVal;

    this.amortizationInfo = this.getMortgageInfo(
      parseFloat(perAnnumInterest),
      parseFloat(principal),
      parseInt(monthsAmortization),
      mortFreq,
      termYears
    );

    let termInfo: TermInfo = {
      numofpayments: this.amortizationInfo.numOfTermPayments,
      principalpayments: this.amortizationInfo.termPrincipal,
      interestpayment: this.amortizationInfo.termInterest,
      totalcost:
        this.amortizationInfo.termPrincipal +
        this.amortizationInfo.termInterest,
    };

    this.populateMortgageSummary(this.amortizationInfo, termInfo);
  }

  private getMortgageInfo(
    percentRate: number,
    amount: number,
    amortizationMonths: number,
    paymentFrequency: string,
    termYears: number
  ) {
    const mortgageCalculations: {
      frequencyPayment: number;
      frequencyRate: number;
      monthlyPayment: number;
      yearlyNumOfPayments: number;
    } = this.mortgageCalcService.getMortgageDetails(
      percentRate,
      amount,
      amortizationMonths,
      paymentFrequency
    );
    let balance = amount;
    let frequency = 1;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    const numOfTermPayments =
      mortgageCalculations.yearlyNumOfPayments * termYears;
    let termInterest = 0;
    let termPrincipal = 0;

    while (true) {
      const interest = balance * mortgageCalculations.frequencyRate;

      // Increment total interest based on the interest paid in regular payments.
      totalInterestPaid = totalInterestPaid + interest;

      let payment = mortgageCalculations.frequencyPayment;

      let principal = payment - interest;

      totalPrincipalPaid = totalPrincipalPaid + principal;

      balance = balance - principal;

      if (frequency == numOfTermPayments) {
        termInterest = totalInterestPaid;
        termPrincipal = totalPrincipalPaid;
      }

      if (balance < 0) {
        payment = payment + balance;
        principal = payment - interest;
        balance = 0;
      }

      if (balance === 0) {
        break;
      }
      frequency++;
    }

    console.log('totalInterestPaid ', totalInterestPaid);
    console.log('Total amount paid ', amount + totalInterestPaid);
    console.log('Num of payments', frequency);

    const totalCostBasedOnFreq = totalInterestPaid + amount;
    const totalCostForMonthly =
      mortgageCalculations.monthlyPayment * amortizationMonths;

    return {
      interestpayments: totalInterestPaid,
      principalpayments: amount,
      totalcost: totalCostBasedOnFreq,
      interestSavings: totalCostForMonthly - totalCostBasedOnFreq,
      numOfPayments: frequency,
      frequencyPayment: mortgageCalculations.frequencyPayment,
      numOfTermPayments: numOfTermPayments,
      termInterest: termInterest,
      termPrincipal: termPrincipal,
    };
  }

  private populateMortgageSummary(
    amortInfo: AmortizationInfo,
    termInfo: TermInfo
  ) {
    this.mortgageSummary = [];
    this.mortgageSummary.push({
      category: 'Num of Payments',
      term: termInfo['numofpayments'] + '',
      amortperiod: amortInfo['numOfPayments'] + '',
    });
    this.mortgageSummary.push({
      category: 'Mortgage Payment',
      term: this.currencyPipe.transform(amortInfo['frequencyPayment']),
      amortperiod: this.currencyPipe.transform(amortInfo['frequencyPayment']),
    });
    this.mortgageSummary.push({
      category: 'Principal Payments',
      term: this.currencyPipe.transform(termInfo['principalpayments']),
      amortperiod: this.currencyPipe.transform(amortInfo['principalpayments']),
    });
    this.mortgageSummary.push({
      category: 'Interest Payments',
      term: this.currencyPipe.transform(termInfo['interestpayment']),
      amortperiod: this.currencyPipe.transform(amortInfo['interestpayments']),
    });
    this.mortgageSummary.push({
      category: 'Total Cost',
      term: this.currencyPipe.transform(termInfo['totalcost']),
      amortperiod: this.currencyPipe.transform(amortInfo['totalcost']),
    });
    this.dataSource.data = this.mortgageSummary;
  }
}

export interface MortgageSummary {
  category: string;
  term: string | null;
  amortperiod: string | null;
}

export interface AmortizationInfo {
  interestpayments: number;
  principalpayments: number;
  totalcost: number;
  interestSavings: number;
  numOfPayments: number;
  frequencyPayment: number;
  numOfTermPayments: number;
  termInterest: number;
  termPrincipal: number;
}

export interface TermInfo {
  numofpayments: number;
  principalpayments: number;
  interestpayment: number;
  totalcost: number;
}
