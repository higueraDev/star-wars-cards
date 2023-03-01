import { NgModule } from '@angular/core';
// Components
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatProgressSpinnerModule],
  exports: [MatCardModule, MatChipsModule, MatButtonModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
