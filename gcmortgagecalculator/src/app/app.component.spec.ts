import { CurrencyPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppComponent } from './app.component';
import { MaterialLibsModule } from './commons/material-libs/material-libs.module';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: "",
            pathMatch: "full",
            redirectTo: "mortgagecalc"
          },
          {
            path: "mortgagecalc",
            component: MortgageCalculatorComponent
          }
        ]),
        MaterialLibsModule,
      ],
      declarations: [
        AppComponent,
        AppHeaderComponent
      ],
      providers: [ CurrencyPipe ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
