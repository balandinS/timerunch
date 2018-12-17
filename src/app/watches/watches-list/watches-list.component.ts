import { Component, OnInit, OnDestroy } from '@angular/core';
import { WatchModel } from '../watche.model';
import { Subscription } from 'rxjs';
import { WatchesService } from '../watches.service';
import { StorageService } from 'src/app/storage/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watches-list',
  templateUrl: './watches-list.component.html',
  styleUrls: ['./watches-list.component.scss']
})
export class WatchesListComponent implements OnInit, OnDestroy {
  watches: WatchModel[];
  load:boolean = false;
  visibaleProgres: boolean = true;
  endPoint: number = 3; // the point end for slice
  subcription = new Subscription();
  subcriptionRoute = new Subscription();
  constructor(
    private watchservice: WatchesService, 
    private httpClient: StorageService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subcriptionRoute = this.route.params.subscribe(params => {
      if(params['brand'] === 'all'){
        this.httpClient.methodGetAll();
      } else {
        this.httpClient.methodGetBrands(params['brand']);
       
      }
    })
    this.watches = this.watchservice.getWatches();
    this.subcription = this.watchservice.watchChange.subscribe((watches: WatchModel[]) => {
    this.watches = watches;
    },
    error => { console.error(error);}
    )
   this.initReadMore()
   if(this.watches.length > 0){
   this.visibaleProgres = false;
   } else{
      this.visibaleProgres = true;
   }
  }
  
  initReadMore() {
    if(this.watches.length <= 3) {
       this.load = true
    } else {
      this.load = false
    }
    console.log(this.load)
  }

  loadRow() {
    if(this.watches.length > 0){
    this.endPoint += 3;
    if(this.endPoint > this.watches.length) {
         this.endPoint = this.watches.length;
         this.load = true;
    }
  }
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.subcriptionRoute.unsubscribe();
    this.watches = [];
    
  }
}
