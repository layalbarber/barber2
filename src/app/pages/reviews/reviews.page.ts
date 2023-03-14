import { Component, OnInit } from "@angular/core";
import { TimeAgoPipe } from "ngx-pipes";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.page.html",
  styleUrls: ["./reviews.page.scss"],
  providers: [TimeAgoPipe]
})
export class ReviewsPage implements OnInit {
  public reviews: Array<any> = new Array();
  language: any = '';
  d = new Date();
  constructor(private api: ApiService, private util: UtilService) {
    this.getReviews();
  }

  changeStatus(e) {
    console.log(e);
    let data = {
      review_id: e,
    };
    this.api.postWithHeader("reviewReport", data).subscribe(
      (success: any) => {
        if (success.success) {

          if (this.language == 'en') {
            this.util.success("Success !", "Status has Been Changed")
          }
          else {
            this.util.success("نجاح!", "لقد تغير الوضع");
          }

        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  ngOnInit() {
    this.language = localStorage.getItem('lan')
  }

  getReviews(): void {
    this.api.getWithHeader("review").subscribe((res: any) => {
      console.log("res: ", res);
      this.reviews = res.data;
      console.log("rev", this.reviews);

    });
  }

  stringToDate(sd): Date {
    return new Date(sd);
  }
}
