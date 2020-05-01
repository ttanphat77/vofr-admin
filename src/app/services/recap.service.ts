import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Scene } from '../models/scene.model';


@Injectable({ providedIn: 'root' })

export class RecapService {
    serverUri: string = 'http://23.94.26.75/node/api';
    constructor(private http: HttpClient) {

    }

    getScenes(): Observable<Scene[]> {
        return this.http.get<Scene[]>(this.serverUri + "/scenes");
    }
    // process(email: string, images: string[]): Observable<any> {
    //     return this.http.post('http://localhost:3000/api/processImages', {
    //         email: email,
    //         images: images
    //     });
    // }
    createScene(name: string): Observable<any> {
        return this.http.get(this.serverUri + '/createScene?name=' + name);
    }
    addImage(sceneId: string, image: string): Observable<any> {
        return this.http.post(this.serverUri + '/addImage', {
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
    startProcess(sceneId: string): Observable<any> {
        return this.http.post(this.serverUri + '/startProcess', {
            sceneId: sceneId
        })
    }
    checkProgress(sceneId: string): Observable<any> {
        return this.http.post(this.serverUri + '/checkProgress', {
            sceneId: sceneId
        })
    }
    deleteImages(images: string[]): Observable<any> {
        return this.http.post(this.serverUri + '/deleteImages', {
            images: images,
        })
    }
}
