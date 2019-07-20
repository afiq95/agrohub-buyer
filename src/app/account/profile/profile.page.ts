import { Component, OnInit } from "@angular/core";
import { ApiProviderService } from "src/app/providers/api-provider.service";
import { LocalStorageProviderService } from "src/app/providers/local-storage-provider.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  userInfo: any = null;
  segment: any = "Maklumat";
  belian: any;
  constructor(
    private api: ApiProviderService,
    private storage: LocalStorageProviderService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userInfo = (await this.api.getUserContact(await this.storage.getContactId())).data;
    this.belian = (await this.api.getOrderHistory(await this.storage.getContactId())).data;
    console.log(this.belian);
  }

  openOrderDetail(item) {
    this.router.navigate(["/orderdetails"], {
      state: {
        id: item.id
      }
    });
  }
}
