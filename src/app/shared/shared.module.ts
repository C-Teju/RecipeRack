import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ,],
    exports:[
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]

})
export class SharedModule{}