import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/products/IProduct';

const baseUrl = `${environment.API_PATH}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAll() {
        return this.httpClient.get<IProduct[]>(baseUrl);
    }

    getById(id: number) {
        return this.httpClient.get<IProduct>(`${baseUrl}/${id}/edit`);
    }

    create(product: IProduct) {
        return this.httpClient.post<IProduct>(baseUrl, product);
    }

    update(id: number, product: IProduct) {
        return this.httpClient.put<IProduct>(`${baseUrl}/${id}`, product);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`);
    }
}
