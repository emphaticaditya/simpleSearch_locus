import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MockService } from '../../services/mock.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent = (event: KeyboardEvent) => {
    if(event.keyCode == 38){ // up
      this.moveInTheList("up");
    }
    else if(event.keyCode == 40){ // down
      this.moveInTheList("down");
    }
  }
  @ViewChild("searchInput") searchInput: ElementRef;

  searchKeyword: string;
  searchResults: any = [];
  foundInItems: boolean = false;
  noItemsFound: boolean = false;
  currentIndex: number = 0;
  constructor(private dataService: MockService) { }

  ngOnInit() {
    this.searchInput.nativeElement.focus();
  }
  
  getInfo = (event:any) => {
    this.foundInItems = false;
    if(event===""){
      this.searchResults = [];
      this.currentIndex = 0;
      return;
    }
    this.searchResults = [];
    let data = this.dataService.mockDataGetter();
    data.forEach((searchedItem:any)=> {
      if(searchedItem.address.includes(event) || searchedItem.id.includes(event) || searchedItem.name.includes(event) || searchedItem.pincode.includes(event)){
        this.searchResults.push(searchedItem);
      }
      if(event!==" "){
        searchedItem.items.forEach((item:any) => {
          if(item.includes(event)){
            this.searchResults.push(searchedItem);
            this.foundInItems = true;
          }
        });
      }
    });
    this.searchResults.length ? this.noItemsFound = false : this.noItemsFound = true;
  }

  moveInTheList = (movement:string) => {
    if(this.searchResults.length){
      if(movement==="up" && this.currentIndex>0){
        this.currentIndex--;
      }
      if(movement==="up"){
        let selectedItem = document.getElementsByClassName('listItem active')[0] as HTMLElement;
        selectedItem.scrollIntoView({behavior: "smooth"});
      }
      else if(movement==="down" && this.currentIndex<this.searchResults.length-1){
        this.currentIndex++;
        let selectedItem = document.getElementsByClassName('listItem active')[0] as HTMLElement;
        selectedItem.scrollIntoView({behavior: "smooth"});
      }
    }
  }

}
