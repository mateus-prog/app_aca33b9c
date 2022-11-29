import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IProduct } from 'src/app/products/IProduct';

import { ProductService } from 'src/app/products/service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  currentProduct: any;
  currentInUse: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';
  filter: string = '';

  products!: IProduct[];

  module: string = 'Produto';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private productService: ProductService
  ) { }

  async ngOnInit(){
    this.products = await this.productService.getAll().toPromise();
  }

  productsFilter() {
    if (this.filter.length >= 2) {
      var resultFilter = this.products.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return resultFilter.reverse();
    }

    return this.products.reverse();
  }

  showModalDelete(product: IProduct) {
    this.currentProduct = product.id;

    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'EXCLUIR';
    this.title = 'Confirma a exclusão do registro';

    this.messageModal = '';
  }

  deleteProduct(id: number) {
    this.productService.delete(id)
      .pipe(first())
      .subscribe(() => this.products = this.products.filter(x => x.id !== id));
  }

  confirm(confirm: boolean){
    if(confirm){
      this.deleteProduct(this.currentProduct);
    }
  }

}