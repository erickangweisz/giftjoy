import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/Product';

import { Auth } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'product-videogames',
  templateUrl: './app/components/product-videogames/product-videogames.template.html',
  styleUrls: ['./app/components/product-videogames/product-videogames.component.css'],
  providers: [ ProductService ]
})

export class ProductVideogamesComponent implements OnInit {

    public products: Product[];
    public status:string;
    public errorMessage:any;
    public confirm;

    constructor(private _productService: ProductService,
              private auth: Auth,
              private router: Router) {}

    ngOnInit() {
        this.getProductByVideogames();
    }

    getProductByVideogames() {
      this._productService.getProductByCategory('"videogames"')
                            .subscribe(
                                result => {
                                    console.log(result.data);
                                    this.products = result.data; 
                                    this.status = result.status;

                                    if (this.status !== "success") {
                                        alert("server error");
                                    } else {
                                        $(document).ready(function() {
                                            $('#blog-landing').pinterest_grid({
                                                no_columns: 4,
                                                padding_x: 10,
                                                padding_y: 10,
                                                margin_bottom: 50,
                                                single_column_breakpoint: 700
                                            });
                                        });
                                    }
                                }, 
                                error => {
                                    this.errorMessage = <any>error;
                                    if (this.errorMessage !== null) {
                                        console.log(this.errorMessage);
                                        alert("request error");
                                    }
                                });
  }

}