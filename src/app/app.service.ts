import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './upload.service';


@Injectable() 
export class AppService { 
    apiURL: string = 'http://localhost:8080/api/'
    constructor(public http:HttpClient, public uploadService:UploadService){
        
    }

    postFile(file: File) {
        //console.log(file);
       //return this.http.post(this.apiURL + 'import', file, {reportProgress: true, observe: 'events'});
        return this.uploadService.upload(new Set([file]));
      
    }

    deleteData(){
        return this.http.delete(this.apiURL + "delete-all");
    }

    getDataBySearchParams(payload) {             
        return this.http.post(this.apiURL + "search", payload);
    }
}