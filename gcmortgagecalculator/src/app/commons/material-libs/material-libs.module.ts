import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  exports: [MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
})
export class MaterialLibsModule {}
