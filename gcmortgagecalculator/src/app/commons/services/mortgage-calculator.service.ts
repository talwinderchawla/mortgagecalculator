import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MortgageCalculatorService {

  constructor() { }


  
  public getMortgageDetails(
    nominalRate: number,
    amount: number,
    amortizationMonths: number,
    paymentFrequency: string
  ) {
    console.log("nominalRate" , nominalRate);
    // Calculate compounded rate based on compounded semi-anually
    const compoundedRate = Math.pow(1 + (nominalRate / 200), 2) - 1;
    console.log("compoundedRate" , compoundedRate);
    const monthlyRate = Math.pow(1 + compoundedRate, 1 / 12) - 1;
    console.log("monthlyfrequencyRate" , monthlyRate);
    const monthlyPayment =
      parseFloat(    ((monthlyRate * amount) /
      (1 - Math.pow(1 + monthlyRate, -amortizationMonths))).toFixed(2));
    let frequencyRate = 0;
    let frequencyPayment = 0;
    let yearlyNumOfPayments = 0;
  
    console.log("Monthly payment ", monthlyPayment);
    switch (paymentFrequency) {
      case "monthly":
        frequencyPayment = monthlyPayment;
        frequencyRate = monthlyRate;
        yearlyNumOfPayments = 12;
        break;
      case "semim":
        frequencyPayment =  parseFloat((monthlyPayment / 2).toFixed(2));
        frequencyRate = Math.pow(1 + compoundedRate, 1 / 24) - 1;
        yearlyNumOfPayments = 24;
        break;
      case "biw":
        frequencyPayment =  parseFloat(((monthlyPayment * 12) / 26).toFixed(2));
        frequencyRate = Math.pow(1 + compoundedRate, 1 / 26) - 1;
        yearlyNumOfPayments = 26;
        break;
      case "weekly":
        frequencyPayment = parseFloat(((monthlyPayment * 12) / 52).toFixed(2));
        console.log("Weekly payment ", frequencyPayment);
        frequencyRate = Math.pow(1 + compoundedRate, 1 / 52) - 1;
        yearlyNumOfPayments = 52;
        break;
      case "accbiw":
        frequencyPayment =  parseFloat((monthlyPayment / 2).toFixed(2));
        frequencyRate = Math.pow(1 + compoundedRate, 1 / 26) - 1;
        yearlyNumOfPayments = 26;
        break;
      case "accw":
        frequencyPayment =  parseFloat((monthlyPayment / 4).toFixed(2));
        frequencyRate = Math.pow(1 + compoundedRate, 1 / 52) - 1;
        yearlyNumOfPayments = 52;
        break;
    }
  
    return {
      frequencyPayment,
      frequencyRate,
      monthlyPayment,
      yearlyNumOfPayments
    } as const;
  }
  
}
