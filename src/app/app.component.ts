import { Component, TemplateRef } from '@angular/core';
import { AppService } from './app.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public appService:AppService, private toastr: ToastrService, private modalService: BsModalService){

  }

  title = 'pipe-drive-test-wajid';
  disabled: boolean = false;
  selectedFile: File;
  public progress: number = 0;

  public searchId: number = 0;

  modalRef: BsModalRef;

  dtOptions: DataTables.Settings = {};
  
  testDatas: any;
  

  ngOnInit(): void {    
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false   
    };
  }

  // Loading data to fill in the datatable
  loadData(){    
    if(this.searchId !== 0){
    let searchParams = {
      query: this.searchId
    };
    this.appService.getDataBySearchParams(searchParams).subscribe(result=> {      
      this.testDatas = result;           
    })
  }
}

// Changing the temporary variable which holds the file to send. 
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  // TODO Some probelem with the toaster, only show with the mouse hover.
  // Uploading the file  
  uploadFile() {
    if(this.selectedFile == undefined){
      //this.notifierService.notify( 'Fail', 'You are awesome! I mean it!' );

      this.toastr.error("Please select File", "", { progressBar: true });
      return;
    }
    let status = this.appService.postFile(this.selectedFile);
    //this.progress = status[this.selectedFile.name].progress;
    
    status[this.selectedFile.name].progress.subscribe(value => {
      this.progress = value;
    })
  }  

 // Open delete modal 
  openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  // Confirm delete all data
  confirm(): void {
    // This deletes all data
    this.appService.deleteData().subscribe(deleted => {
      this.modalRef.hide();
      console.log('all data deleted');
    });    
  }
 
  // Decline delete data
  decline(): void {    
    this.modalRef.hide();
  }
}
