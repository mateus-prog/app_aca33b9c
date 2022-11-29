import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from 'src/app/components/modal/components/modal-confirm';

@NgModule({
  declarations: [
    ModalConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalConfirmComponent
  ]
})

export class ModalModule { }