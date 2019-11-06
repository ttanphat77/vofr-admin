import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class RecapService {
    serverUri: string = 'http://107.150.52.213/node/recapapi/v1';
    constructor(private http: HttpClient) {

    }
    // process(email: string, images: string[]): Observable<any> {
    //     return this.http.post('http://localhost:3000/api/processImages', {
    //         email: email,
    //         images: images
    //     });
    // }
    createScene(): Observable<any> {
        return this.http.get(this.serverUri + '/api/createScene');
    }
    addImage(token: string, sceneId: string, image: string): Observable<any> {
        return this.http.post(this.serverUri + '/api/addImage', {
            token: token,
            sceneId: sceneId,
            image: image,
        })
    }
    // addImages(token: string, sceneId: string, images: string[]): Observable<any> {
    //     return this.http.post(this.serverUri + '/api/addImages', {
    //         token: token,
    //         sceneId: sceneId,
    //         images: images
    //     })
    // }
    startProcess(token: string, sceneId: string): Observable<any> {
        return this.http.post(this.serverUri + '/api/startProcess', {
            token: token,
            sceneId: sceneId
        })
    }
    checkProgress(token: string, sceneId: string): Observable<any> {
        return this.http.post(this.serverUri + '/api/checkProgress', {
            token: token,
            sceneId: sceneId
        })
    }
    deleteImages(images: string[]): Observable<any> {
        console.log('delete');
        return this.http.post(this.serverUri + '/api/deleteImages', {
            images: images,
        })
    }
}
