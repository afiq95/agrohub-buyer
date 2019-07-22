import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-varietieslist",
  templateUrl: "./varietieslist.page.html",
  styleUrls: ["./varietieslist.page.scss"]
})
export class VarietieslistPage implements OnInit {
  varietyId: string = "";
  items: any[] = [];
  variety: any = {};
  favs: any[] = [];
  state: any = {};
  loading: HTMLIonLoadingElement;
  constructor(
    public router: Router,
    public api: ApiProviderService,
    public storage: LocalStorageProviderService,
    private loadingController: LoadingController
  ) {}

  async createLoad() {
    this.loading = await this.loadingController.create({
      spinner: "circles",
      backdropDismiss: false
    });
  }

  async PresentLoad() {
    this.loading.present();
  }

  async DismissLoad() {
    this.loading.dismiss();
    this.loading = await this.loadingController.create({
      spinner: "circles",
      backdropDismiss: false
    });
  }

  async ngOnInit() {
    this.state = this.router.getCurrentNavigation().extras.state;
    await this.createLoad();
    await this.PresentLoad();
    this.favs = await this.storage.getFavItems();
    if (this.state.isFav) {
      var latest = (await this.api.getItemsPricing()).data;
      this.items = latest.prices.filter(x => {
        var found = this.favs.findIndex(y => {
          return y.id == x.farmProduceId && y.grade == x.grade;
        });
        if (found > -1) return true;
        else return false;
      });
      console.log(this.items);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].isFav = true;
      }
      this.variety.name = "Kegemaran Anda";
    } else {
      this.varietyId = this.state.varietyId;
      this.variety = (await this.api.getTypeOfProduceById(this.varietyId)).data;
      var latest = (await this.api.getItemsPricing()).data;
      this.items = latest.prices.filter(x => {
        return x.itemGroupId == this.varietyId;
      });
      for (var i = 0; i < this.items.length; i++) {
        var isFav = this.getFavourite(this.items[i]);
        console.log(isFav);
        if (isFav) this.items[i].isFav = true;
        else this.items[i].isFav = false;
      }
      console.log(this.items);
      this.variety.name = this.variety.name.toLowerCase();
    }
    await this.DismissLoad();
  }

  async goToDetail(item) {
    this.router.navigate(["/varietydetails"], {
      state: {
        detail: item
      }
    });
  }

  async addToFav(item) {
    item.isFav = true;
    await this.storage.addFavItem(item.farmProduceId, item.grade);
  }

  async removeFromFav(item) {
    item.isFav = false;
    await this.storage.removeFavItem(item.farmProduceId, item.grade);
  }

  getFavourite(item) {
    var found = this.favs.findIndex(x => {
      return item.farmProduceId == x.id && item.grade == x.grade;
    });
    console.log(found);
    if (found > -1) return true;
    else return false;
  }
}
