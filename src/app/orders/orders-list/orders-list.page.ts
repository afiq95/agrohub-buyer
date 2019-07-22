import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.page.html",
  styleUrls: ["./orders-list.page.scss"]
})
export class OrdersListPage implements OnInit {
  belian: any[] = [];
  state: any[];
  title: any = "";
  loading: HTMLIonLoadingElement;

  customPopoverOptions: any = {};
  constructor(
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ionViewDidEnter() {}

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
    var tempState = this.router.getCurrentNavigation().extras.state;
    if (tempState == null) this.state = ["new"];
    else this.state = tempState.rule;
    await this.createLoad();

    await this.SetItems();
    this.getTitle();
  }

  async SetItems() {
    await this.PresentLoad();
    var temp = (await this.api.getOrderHistory(await this.storage.getContactId())).data;
    temp = temp.reverse();
    this.belian = temp.filter(x => {
      return this.state.some(y => {
        return y.toLowerCase() == x.status.toLowerCase();
      });
    });
    await this.DismissLoad();
  }

  async changeRule(item) {
    this.state = item.detail.value;
    await this.SetItems();
    this.getTitle();
  }

  getTitle() {
    if (this.state[0].toLowerCase() == "pending") this.title = "Dalam Proses";
    else if (this.state[0].toLowerCase() == "new") this.title = "Baru";
    else if (
      this.state[0].toLowerCase() == "cancelled" ||
      this.state[0].toLowerCase() == "rejected"
    )
      this.title = "Dibatalkan";
    else if (this.state[0].toLowerCase() == "expired") this.title = "Luput";
    else if (this.state[0].toLowerCase() == "completed") this.title = "Selesai";
  }

  openOrderDetail(item) {
    this.router.navigate(["/orderdetails"], {
      state: {
        id: item.id
      }
    });
  }
}
