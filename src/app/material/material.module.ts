import { NgModule } from '@angular/core';
// Components
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [MatCardModule, MatChipsModule, MatButtonModule],
  exports: [MatCardModule, MatChipsModule, MatButtonModule],
})
export class MaterialModule {}
