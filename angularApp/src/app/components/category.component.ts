import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/categoryService';
import { PostService } from '../services/postService';
import { Post } from '../entities/post';
import { Tag } from '../entities/tag';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// Observable class extensions
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    moduleId: module.id,
    selector: 'categories',
    templateUrl: './category.component.html',
    providers: [CategoryService, PostService]
})
export class CategoryComponent implements OnInit {
    error: any;
    tags: Tag[];
    posts: Observable<Post[]>;
    errorMessage: string;
    private sub: Subscription;
 
    constructor(private route: ActivatedRoute,
        private router: Router,private categoryService: CategoryService, private postService: PostService) {
        this.categoryService
            .getCategories().subscribe(tags => {
                this.tags = tags;
            });
    }

   getPostByTag(tag: string) {
        this.categoryService.getPostByTag(tag).subscribe(
            posts => this.posts = posts,
            error => this.errorMessage = <any>error);
            
    }

    ngOnInit() :void {
        //    this.sub = this.route.params.subscribe(
        //     params => {
        //         let tag = params['tag'];
        //         debugger;
        //         this.getPostByTag(tag);
        //     });
    }

    
    ngOnDestroy() {
        //this.sub.unsubscribe();
    }
}
