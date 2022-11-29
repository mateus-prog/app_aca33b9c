import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { NumberValidator } from 'src/app/validators/number/number.validator';

import { IProduct } from 'src/app/products/IProduct';

import { ProductService } from 'src/app/products/service/product.service';
import { MessageService } from 'src/app/components/message/service/message.service';
import { ProductStockService } from 'src/app/product-stock/service/product-stock.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddEditComponent implements OnInit {

  id!: number;
  product_id!: number;
  count!: number;
  is_sum!: boolean;
  checkedAdd!: string;
  checkedRemove!: string;

  products!: IProduct[];
  
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
    private productStockService: ProductStockService,
    private messageService: MessageService,
    private _location: Location
  ) { }

  async ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.isAddMode ? this.breadcrumbAction = 'Cadastrar' : this.breadcrumbAction = 'Editar';

    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.products = products);

    this.form = this.formBuilder.group({
        product_id: ['', Validators.required],
        count: ['', [Validators.required, NumberValidator.validate]],
        is_sum: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.productStockService.getById(this.id)
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
      this.createProductStock();
    } else {
      this.updateProductStock();
    }
  }

  private translateFormCreate(){
    let dataForm = this.form.value;
    return dataForm;
  }

  private createProductStock() {
    const data = this.translateFormCreate();
    console.log(data);
    this.productStockService.create(data)
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' cadastrado com sucesso');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  private updateProductStock() {
    this.productStockService.update(this.id, this.form.value)
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