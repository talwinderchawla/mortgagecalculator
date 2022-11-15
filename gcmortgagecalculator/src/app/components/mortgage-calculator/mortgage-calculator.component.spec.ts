import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from 'src/app/commons/components/charts/charts.component';
import { MaterialLibsModule } from 'src/app/commons/material-libs/material-libs.module';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';
import { MatSelectHarness } from '@angular/material/select/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialLibsModule,
        ReactiveFormsModule,
        NgChartsModule,
      ],
      declarations: [MortgageCalculatorComponent, ChartsComponent],
      providers: [CurrencyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculateMortgageDetails when valid form is submitted', async () => {
    spyOn(component, 'calculateMortgageDetails').and.callThrough();

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Weekly',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.calculateMortgageDetails).toHaveBeenCalled();
    });
  });

  it('should NOT call calculateMortgageDetails when valid form is submitted', async () => {
    spyOn(component, 'calculateMortgageDetails').and.callThrough();

    let mortgForm: UntypedFormGroup = component.mrtgCalcForm;

    mortgForm.controls['mrtgAmt'].setValue('100000');
    mortgForm.controls['intRate'].setValue(5);
    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    expect(component.calculateMortgageDetails).not.toHaveBeenCalled();
  });

  it('should set table data with appropriate mortgage summary for weekly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '260', amortperiod: '1555' },
      { category: 'Mortgage Payment', term: '$123.16', amortperiod: '$123.16' },
      {
        category: 'Principal Payments',
        term: '$8,295.91',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,725.69',
        amortperiod: '$91,431.70',
      },
      {
        category: 'Total Cost',
        term: '$32,021.60',
        amortperiod: '$191,431.70',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Weekly',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  it('should set table data with appropriate mortgage summary for monthly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '60', amortperiod: '361' },
      {
        category: 'Mortgage Payment',
        term: '$533.69',
        amortperiod: '$533.69',
      },
      {
        category: 'Principal Payments',
        term: '$8,238.24',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,783.16',
        amortperiod: '$92,128.96',
      },
      {
        category: 'Total Cost',
        term: '$32,021.40',
        amortperiod: '$192,128.96',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Monthly (12x per year)',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  it('should set table data with appropriate mortgage summary for semi-monthly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '120', amortperiod: '719' },
      {
        category: 'Mortgage Payment',
        term: '$266.85',
        amortperiod: '$266.85',
      },
      {
        category: 'Principal Payments',
        term: '$8,276.26',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,745.74',
        amortperiod: '$91,671.56',
      },
      {
        category: 'Total Cost',
        term: '$32,022.00',
        amortperiod: '$191,671.56',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Semi-monthly (24x per year)',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  it('should set table data with appropriate mortgage summary for Accelerated Bi-weekly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '130', amortperiod: '657' },
      {
        category: 'Mortgage Payment',
        term: '$266.85',
        amortperiod: '$266.85',
      },
      {
        category: 'Principal Payments',
        term: '$11,303.09',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,387.41',
        amortperiod: '$75,111.90',
      },
      {
        category: 'Total Cost',
        term: '$34,690.50',
        amortperiod: '$175,111.90',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Accelerated Bi-weekly',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  it('should set table data with appropriate mortgage summary for Bi-weekly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '130', amortperiod: '779' },
      {
        category: 'Mortgage Payment',
        term: '$246.32',
        amortperiod: '$246.32',
      },
      {
        category: 'Principal Payments',
        term: '$8,278.67',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,742.93',
        amortperiod: '$91,639.86',
      },
      {
        category: 'Total Cost',
        term: '$32,021.60',
        amortperiod: '$191,639.86',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Bi-Weekly (every 2 weeks)',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  it('should set table data with appropriate mortgage summary for Accelerated Weekly frequency', async () => {
    const expectedVal = [
      { category: 'Num of Payments', term: '260', amortperiod: '1312' },
      {
        category: 'Mortgage Payment',
        term: '$133.42',
        amortperiod: '$133.42',
      },
      {
        category: 'Principal Payments',
        term: '$11,320.30',
        amortperiod: '$100,000.00',
      },
      {
        category: 'Interest Payments',
        term: '$23,368.90',
        amortperiod: '$74,953.13',
      },
      {
        category: 'Total Cost',
        term: '$34,689.20',
        amortperiod: '$174,953.13',
      },
    ];

    await populateFormWithValues({
      mortAmount: 100000,
      intRate: 5,
      years: '30 Years',
      frequency: 'Accelerated Weekly',
      term: '5 Years',
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let calcButton: HTMLButtonElement = fixture.debugElement.query(
        By.css('#calculate')
      ).nativeElement;
      calcButton.click();
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.dataSource.data).toEqual(expectedVal);
    });
  });

  // COMMON Function
  async function populateFormWithValues(formValues: {
    mortAmount: any;
    intRate: any;
    years: any;
    months?: any;
    frequency: any;
    term: any;
  }) {
    let mortgForm: UntypedFormGroup = component.mrtgCalcForm;

    mortgForm.controls['mrtgAmt'].setValue(formValues.mortAmount);
    mortgForm.controls['intRate'].setValue(formValues.intRate);

    const yearSelectField = await loader.getHarness(
      MatSelectHarness.with({ selector: '#amorPeriodYr' })
    );
    await yearSelectField.open();

    const selectOption = await yearSelectField.getOptions({
      text: formValues.years,
    });
    await selectOption[0].click();

    const paymentFreqSelectField = await loader.getHarness(
      MatSelectHarness.with({ selector: '#paymtFreq' })
    );
    await paymentFreqSelectField.open();
    const paymentFreqSelectedOption = await paymentFreqSelectField.getOptions({
      text: formValues.frequency,
    });
    await paymentFreqSelectedOption[0].click();

    const termSelectField = await loader.getHarness(
      MatSelectHarness.with({ selector: '#term' })
    );
    await termSelectField.open();
    const termSelectedOption = await termSelectField.getOptions({
      text: formValues.term,
    });
    await termSelectedOption[0].click();
  }
});
