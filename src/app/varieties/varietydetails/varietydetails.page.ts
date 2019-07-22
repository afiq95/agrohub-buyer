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
  favs: any[];
  isFav: boolean;
  constructor(
    public router: Router,
    public storage: LocalStorageProviderService,
    public event: Events,
    public toast: ToastController
  ) {}

  async ngOnInit() {
    this.detail = this.router.getCurrentNavigation().extras.state.detail;
    this.favs = await this.storage.getFavItems();
    this.isFav = this.getFavourite(this.detail);
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

  getFavourite(item) {
    var found = this.favs.findIndex(x => {
      return item.farmProduceId == x.id && item.grade == x.grade;
    });
    console.log(found);
    if (found > -1) return true;
    else return false;
  }

  removeMore() {
    if (this.quantity > 0) this.quantity--;
  }

  async addToFav() {
    this.isFav = true;
    await this.storage.addFavItem(this.detail.farmProduceId, this.detail.grade);
  }

  async removeFromFav() {
    this.isFav = false;
    await this.storage.removeFavItem(this.detail.farmProduceId, this.detail.grade);
  }
}
