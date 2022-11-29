import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductStock } from 'src/app/product-stock/IProductStock';

const baseUrl = `${environment.API_PATH}/product-stock`;

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAll() {
        return this.httpClient.get<IProductStock[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IProductStock>(`${baseUrl}/${id}/edit`);
    }

    create(productStock: IProductStock) {
        return this.httpClient.post<IProductStock>(baseUrl, productStock);
    }

    update(id: number, productStock: IProductStock) {
        return this.httpClient.put<IProductStock>(`${baseUrl}/${id}`, productStock);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`);
    }
}
