import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
