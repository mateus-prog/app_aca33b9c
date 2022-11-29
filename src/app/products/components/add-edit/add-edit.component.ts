import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { MessageService } from 'src/app/components/message/service/message.service';
import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  id!: number;
  name!: string;
  sku!: string;
  
  form!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;  

  module = 'Produto';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.isAddMode ? this.breadcrumbAction = 'Cadastrar' : this.breadcrumbAction = 'Editar';

    this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        sku: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });

    if (!this.isAddMode) {
      this.productService.getById(this.id)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private translateFormCreate(){
    let dataForm = this.form.value;
    return dataForm;
  }

  private createProduct() {
    const data = this.translateFormCreate();

    this.productService.create(data)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' cadastrado com sucesso');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  private updateProduct() {
    this.productService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe(() => {
          this.messageService.success(this.module+' atualizado com sucesso');
          this.router.navigate(['../../'], { relativeTo: this.route });
        })
        .add(() => this.loading = false);
}

  backClicked() {
    this._location.back();
  }

}