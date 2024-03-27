import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})
export class HeaderComponent implements OnInit{
    // collapsed = true;
// No need coz we are dding the routing components
    // @Output() featureSelected=new EventEmitter<string>();
    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);
    // }

    private userSub:Subscription;
    isAuthenticated=false;


    constructor(private dataStorageService: DataStorageService,private authService:AuthService){}

    ngOnInit() {

        this.isAuthenticated = !!this.authService.user.value;


        this.userSub=this.authService.user.subscribe(user=>{
            this.isAuthenticated=!!user;
            console.log(!user);
            console.log(!!user);
        })
    }


    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }


    onLogout(){
        this.authService.logout();
    }

}
