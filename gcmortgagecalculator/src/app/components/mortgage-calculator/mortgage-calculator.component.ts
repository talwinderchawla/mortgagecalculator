import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
})
export class MortgageCalculatorComponent implements OnInit {
  mrtgCalcForm = new FormGroup({
    mrtgAmt: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    intRate: new FormControl('', { validators: [Validators.required] }),
    amorPeriodYr: new FormControl('', {}),
    amorPeriodMonth: new FormControl('', {}),
    paymtFreq: new FormControl('', { validators: [Validators.required] }),
    term: new FormControl('', { validators: [Validators.required] }),
    prepaymentAmt: new FormControl(''),
    prepaymentFreq: new FormControl(''),
    startWithPayment: new FormControl('', {
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
    { frequencyLabel: 'Accelerated Bi-weekly', value: 'AccBiW' },
    { frequencyLabel: 'Bi-Weekly (every 2 weeks)', value: 'BiW' },
    { frequencyLabel: 'Semi-monthly (24x per year)', value: 'SemiM' },
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

  constructor() {}

  ngOnInit(): void {

    
    console.log("Math ", Math.pow(1.00417, 12));

  }


  calculateMortgageMonthly() {
    
    //Formula M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].
    
    console.log("Math ", Math.pow(1.00417, 12));

    const principal = this.mrtgCalcForm.controls['mrtgAmt'].value;
    const perAnnumInterest =  this.mrtgCalcForm.controls['intRate'].value / 1200;
    const monthsAmortization =  this.mrtgCalcForm.controls['amorPeriodYr'].value * 12 + this.mrtgCalcForm.controls['amorPeriodMonth'].value;

    console.log("principal ", principal, " perAnnumInterest ", perAnnumInterest, " monthsAmortization ", monthsAmortization );

     
    const step1 = perAnnumInterest + 1;
    const step2 =  Math.pow( step1 ,360); 
    const step3 = perAnnumInterest * step2; 
    const step4 = step2 - 1;
    const step5 = step3 / step4;
    
    
    
    let monthlyCosts = principal * step5;

    console.log("Monthly cost ", monthlyCosts);


    
  }


}
