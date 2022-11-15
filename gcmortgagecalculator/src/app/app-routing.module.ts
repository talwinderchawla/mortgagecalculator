import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MortgageCalculatorComponent } from './components/mortgage-calculator/mortgage-calculator.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "mortgagecalc"
  },
  {
    path: "mortgagecalc",
    component: MortgageCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
