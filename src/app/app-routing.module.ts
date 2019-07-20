import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: "list",
    loadChildren: "./list/list.module#ListPageModule"
  },
  { path: "login", loadChildren: "./account/login/login.module#LoginPageModule" },
  { path: "list", loadChildren: "./items/list/list.module#ListPageModule" },
  { path: "itemslist", loadChildren: "./varieties/itemslist/itemslist.module#ItemslistPageModule" },
  {
    path: "varietieslist",
    loadChildren: "./varieties/varietieslist/varietieslist.module#VarietieslistPageModule"
  },
  {
    path: "varietydetails",
    loadChildren: "./varieties/varietydetails/varietydetails.module#VarietydetailsPageModule"
  },
  {
    path: "shoppingcart",
    loadChildren: "./checkout/shoppingcart/shoppingcart.module#ShoppingcartPageModule"
  },
  { path: "payment", loadChildren: "./checkout/payment/payment.module#PaymentPageModule" },
  { path: "profile", loadChildren: "./account/profile/profile.module#ProfilePageModule" },
  {
    path: "orderdetails",
    loadChildren: "./orders/orderdetails/orderdetails.module#OrderdetailsPageModule"
  },
  { path: 'edit-profile', loadChildren: './account/edit-profile/edit-profile.module#EditProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
