import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IProductStock } from 'src/app/product-stock/IProductStock';

import { ProductStockService } from 'src/app/product-stock/service/product-stock.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  currentProductStock: any;
  currentInUse: any;
  title: string = '';
  buttonCancel: string = '';
  buttonConfirm: string = '';
  messageModal: string = '';
  filter: string = '';

  productsStock!: IProductStock[];

  module: string = 'Estoque de Produto';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private productStockService: ProductStockService
  ) { }

  async ngOnInit(){
    this.productsStock = await this.productStockService.getAll().toPromise();
  }

  productsStockFilter() {
    if (this.filter.length >= 2) {
      var resultFilter = this.productsStock.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return resultFilter.reverse();
    }

    return this.productsStock.reverse();
  }

  showModalDelete(product: IProductStock) {
    this.currentProductStock = product.id;

    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'EXCLUIR';
    this.title = 'Confirma a exclusão do registro';

    this.messageModal = '';
  }

  deleteProductStock(id: number) {
    this.productStockService.delete(id)
      .pipe(first())
      .subscribe(() => this.productsStock = this.productsStock.filter(x => x.id !== id));
  }

  confirm(confirm: boolean){
    if(confirm){
      this.deleteProductStock(this.currentProductStock);
    }
  }

}