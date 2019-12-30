import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecapService } from '../../services/recap.service';
import { FileUploader } from 'ng2-file-upload';
import { interval, Observable } from 'rxjs';
import { sortDate } from '../common/sortDate';
import { Scene } from '../../models/scene.model';


const URL = 'http://23.94.26.75/node/api/upload';

@Component({
  selector: 'app-recap',
  styleUrls: ['./recap.component.scss'],
  templateUrl: './recap.component.html',
})

export class RecapComponent implements OnInit, OnDestroy {

  uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  isCreated: boolean = false;
  message: string = '';
  images: string[] = [];
  link: string;
  progress: number = -1;
  scenes: Scene[] = [];
  uploaded: number = 0;
  newSceneName: string = '';
  processing: boolean = false;
  constructor(private service: RecapService) {
  }

  ngOnInit(): void {
    this.getHistory();
    this.uploader.onSuccessItem = (item, response) => this.images.push(response);
  }

  getHistory() {
    this.service.getScenes().subscribe(res => {
      this.scenes = res.reverse();
      this.scenes.forEach(scene => {
        if (scene.status == "Processing") {
          var context = this;
          var progressChecker = setInterval(function () {
            context.checkProgress(scene, progressChecker);
          }, 5000);
        }
      })
    })
  }

  checkProgress(scene: Scene, interval) {
    this.service.checkProgress(scene.sceneId).subscribe(res => {
      if (res.status == 'DONE') {
        scene.status = res.status;
        scene.link = res.link;
        clearInterval(interval);
      } else if (res.status == 'ERROR') {
        scene.status = res.status;
        clearInterval(interval);
      } else if (res.status == 'Processing') {
        scene.progress = res.progress;
      }
    })
  }

  removeAll() {
    this.uploader.clearQueue();
    this.service.deleteImages(this.images).subscribe(res => {
      console.log(res);
    });
    this.images = [];
  }
  process() {
    this.processing = true;
    this.message = 'Create scene...'
    this.service.createScene(this.newSceneName).subscribe(res => {
      if (res.success == true) {
        var sceneId = res.sceneId;
        this.images.forEach(image => {
          this.service.addImage(sceneId, image).subscribe(res => {
            if (res.success == true) {
              this.uploaded++;
              this.message = 'Add images...(' + this.uploaded + '/' + this.images.length + ')'
              if (this.uploaded == this.images.length) {
                this.message = 'Start process...'
                this.service.startProcess(sceneId).subscribe(res => {
                  if (res.success == true) {
                    this.getHistory();
                    this.message = '';
                    this.processing = false;
                    this.newSceneName = '';
                    this.uploader.clearQueue();
                  } else {
                    this.message = res.error.msg;
                  }
                })
              }
            } else {
              this.message = res.error.msg;
            }
          })
        });
      } else {
        this.message = res.error.msg;
      }
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.service.deleteImages(this.images).subscribe(res => {
      console.log(res);
    })
  }
}
