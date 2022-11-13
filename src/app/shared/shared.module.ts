import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {AddItemFormComponent} from 'src/app/shared/components/add-item-form/add-item-form.component'
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    HeaderComponent, AddItemFormComponent
  ],
  exports: [
    HeaderComponent, AddItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
}
