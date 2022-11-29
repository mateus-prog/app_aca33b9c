import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductStockRoutingModule } from './product-stock-routing.module';
import { AddEditComponent } from './components/add-edit';
import { ListComponent } from './components/list';

import { AlertModule } from 'src/app/components/alert/alert.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ModalModule } from 'src/app/components/modal/modal.module';

@NgModule({
  declarations: [
    AddEditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ProductStockRoutingModule,
    AlertModule,
    ModalModule,
    BreadcrumbModule
  ],
  exports:[
    AddEditComponent,
    ListComponent
  ]
})

export class ProductStockModule { }