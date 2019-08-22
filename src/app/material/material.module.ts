import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports:[CommonModule,BrowserAnimationsModule,MatButtonModule],
    exports:[MatButtonModule],
    providers:[],
    declarations:[]
})
export class MaterialModule{

}



