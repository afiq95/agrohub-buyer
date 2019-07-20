import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { IonImg, Events, ToastController } from "@ionic/angular";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-varietydetails",
  templateUrl: "./varietydetails.page.html",
  styleUrls: ["./varietydetails.page.scss"]
})
export class VarietydetailsPage implements OnInit {
  detail: any = null;
  @ViewChild("img") img: any;
  quantity: number = 1;
  constructor(
    public router: Router,
    public storage: LocalStorageProviderService,
    public event: Events,
    public toast: ToastController
  ) {}

  ngOnInit() {
    this.detail = this.router.getCurrentNavigation().extras.state.detail;
    console.log(this.detail);
    setTimeout(() => {
      this.img.el.style.marginTop = "-5rem";
    }, 2);
  }

  addMore() {
    this.quantity++;
  }

  async addToCart() {
    this.detail.order = this.quantity;
    this.detail.cartItemId = Guid.create().toString();
    this.storage.addToCart(this.detail);
    this.event.publish("cartChanges");
    var toast = await this.toast.create({
      message: this.detail.name + " telah ditambah ke dalam troli anda",
      mode: "ios",
      animated: true,
      showCloseButton: true,
      duration: 2000
    });
    await toast.present();
    this.router.navigate(["/shoppingcart"], { replaceUrl: true });
  }

  removeMore() {
    if (this.quantity > 0) this.quantity--;
  }
}
