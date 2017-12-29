import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

import { NotificationService } from '../../../core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  public entity: any = { Status: true };

  public products: any[];
  public orderDetails: any[] = [];
  public detailEntity: any = {
    ProductID: 0,
    Quantity: 0,
    Price: 0
  };

  constructor(private utilityService: UtilityService,
    private _dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }
  /*Product quantity management */
  public showAddDetail() {
    this.loadProducts();
    this.addEditModal.show();

  }
  public loadProducts() {
    this._dataService.get('/api/product/getall').subscribe((response: any[]) => {
      this.products = response;
    }, error => this._dataService.handleError(error));
  }

  public goBack() {
    this.utilityService.navigate('/main/order/index');
  }

  public saveChanges(form: NgForm) {
    if (form.valid) {
      this.entity.OrderDetails = this.orderDetails;
      console.log(this.entity);
      this._dataService.post('/api/order/create', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.entity = response;
        this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      }, error => this._dataService.handleError(error));
      form.resetForm();
    }
  }
  public saveOrderDetail(form: NgForm) {
    if (form.valid) {
      this.addEditModal.hide();
      this.detailEntity.Product = this.products.find(x => x.ID == this.detailEntity.ProductID);
      if(this.orderDetails.length > 0){
        let productDetail = this.orderDetails.find(x => x.ProductID == this.detailEntity.Product.ID);
        if(productDetail != undefined){
          productDetail.Quantity = productDetail.Quantity+ this.detailEntity.Quantity;
        }
        else {
          this.orderDetails.push(this.detailEntity);
        }
      }
      else{
        this.orderDetails.push(this.detailEntity);
      }
      this.detailEntity = {
        ProductID: 0,
        Quantity: 0,
        Price: 0
      };
      console.log(this.orderDetails);
      form.resetForm();
    }
  }

  public deleteDetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (orderDetail.ProductID == item.ProductID) {
        this.orderDetails.splice(index, 1);
      }
    }
  }

  onChangeProduct(event){
    let productId = event.target.value;
    let product = this.products.find(x => x.ID == productId);
    this.detailEntity.Price = product.Price;
  }
}
