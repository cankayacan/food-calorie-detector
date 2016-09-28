import {Component} from '@angular/core';
import {ClarifaiService} from '../../services/clarifai.service';
import {NutritionixService} from '../../services/nutritionix.service';
import cameraModule = require('camera');
import imageModule = require('ui/image');

@Component({
    moduleId: module.id,
    selector: 'cf-tags-page',
    templateUrl: 'tags.page.html',
    styleUrls: ['tags.page.css']
})
export class TagsPage {
    isLoading:boolean = false;
    tags: string[];
    foods: any[] = [];
    errorMsg:string = '';

    constructor(private clarifaiService: ClarifaiService,
                private nutritionixService:NutritionixService) {
    }

    takePicture() {
        cameraModule.takePicture({width: 300, height: 300, keepAspectRatio: true}).then(picture => {
            this.isLoading = true;

            var image = new imageModule.Image();
            image.imageSource = picture;

            this.clarifaiService.tagWithEncodedData(image.imageSource.toBase64String('jpg')).subscribe(
                tags => {
                    this.tags = tags;
                    let top5Tags = tags.slice(0,4);
                    console.log(tags);
                    this.errorMsg = '';
                    this.isLoading = false;
                    let top5TagsSearchQuery = top5Tags.join();
                    this.nutritionixService.getFoods(top5TagsSearchQuery).subscribe(foods => {
                        this.foods = foods;
                    }, (error) => console.error(error));
                },
                error => {
                    console.error(error);
                    this.isLoading = false;
                    this.errorMsg = 'No food is detected';
                }
            );
        });
    }
}
