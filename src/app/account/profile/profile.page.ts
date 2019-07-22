import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Router } from "@angular/router";
import { LoadingService } from "src/app/providers/loading.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  userInfo: any = null;
  segment: any = "Maklumat";
  belian: any;
  constructor(
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router,
    private loadService: LoadingService
  ) {}

  async ionViewWillEnter() {
    this.loadService.CreateAndPresent();
    this.userInfo = (await this.api.getUserContact(await this.storage.getContactId())).data;
    this.belian = (await this.api.getOrderHistory(await this.storage.getContactId())).data;
    console.log(this.belian);
    this.loadService.DismissLoad();
  }

  openOrderDetail(item) {
    this.router.navigate(["/orderdetails"], {
      state: {
        id: item.id
      }
    });
  }
}
