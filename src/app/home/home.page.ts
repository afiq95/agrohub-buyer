import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "../providers/api-provider.service";
import { Router } from "@angular/router";
import { LocalStorageProviderService } from "../providers/local-storage-provider.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  items: any[];
  itemInCart: any;
  belian: any[] = [];
  belianInit: any;
  beliOpen = false;
  favs: any[] = [];
  constructor(
    public api: ApiProviderService,
    public router: Router,
    public storage: LocalStorageProviderService
  ) {}

  async ngOnInit() {
    this.items = (await this.api.getTypeOfProduce()).data;
    this.favs = await this.storage.getFavItems();
    this.itemInCart = (await this.storage.getFromCart()).length;
    this.belian = (await this.api.getOrderHistory(await this.storage.getContactId())).data.filter(
      x => {
        return x.status == "New";
      }
    );
    console.log(this.belian);
    this.belianInit = this.belian[0];
    this.belian = this.belian.splice(1, this.belian.length);
  }

  async viewVarieties(item) {
    this.router.navigate(["/varietieslist"], {
      state: {
        varietyId: item,
        isFav: false
      },
      replaceUrl: true
    });
  }

  async viewFavs() {
    this.router.navigate(["/varietieslist"], {
      state: {
        isFav: true
      },
      replaceUrl: true
    });
  }

  goToCart() {
    this.router.navigate(["/shoppingcart"]);
  }

  openBeli() {
    this.beliOpen = true;
  }

  closeBeli() {
    this.beliOpen = false;
  }

  openOrderDetail(item) {
    this.router.navigate(["/orderdetails"], {
      state: {
        id: item.id
      }
    });
  }
}
