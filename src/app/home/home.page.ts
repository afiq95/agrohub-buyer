import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "../providers/api-provider.service";
import { Router } from "@angular/router";
import { LocalStorageProviderService } from "../providers/local-storage-provider.service";
import { PopoverController, Events } from "@ionic/angular";
import { SearchResultPage } from "../popovers/search-result/search-result.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  items: any[];
  itemInCart: any;
  belian: any[] = [];
  belianInit: any = null;
  beliOpen = false;
  favs: any[] = [];
  searchResult: any[] = [];
  popover: any = null;
  constructor(
    public api: ApiProviderService,
    public router: Router,
    public storage: LocalStorageProviderService,
    public popoverController: PopoverController,
    public event: Events
  ) {}

  async ngOnInit() {
    this.event.publish("changeMenu", false);
    this.items = (await this.api.getTypeOfProduce()).data;
    this.favs = await this.storage.getFavItems();
    this.itemInCart = (await this.storage.getFromCart()).length;
    this.belian = (await this.api.getOrderHistory(await this.storage.getContactId())).data.filter(
      x => {
        return x.status == "New";
      }
    );
    this.belian = this.belian.reverse();
    this.belianInit = this.belian[0];
    if (this.belian.length > 1) {
      this.belian = this.belian.splice(1, 3);
    } else {
      this.belian = [];
    }
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

  goSearch() {
    this.router.navigate(["/search-result"]);
  }
}
