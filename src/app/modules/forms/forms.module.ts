import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
// import { ComponentsComponent } from './components/components.component';
import { CurrentFormComponent } from './componets/current-form/current-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CurrentFormComponent
    ],
    exports: [
        CurrentFormComponent
    ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormsModule { }
