import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstObsSubscritption;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.comlete()
        }
        if (count > 3) {
          observer.error(new Error('COunt is greater than 3!'))
        }
        count++ 
      }, 1000)
    })

    this.firstObsSubscritption = customIntervalObservable.subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
      alert(error.message) 
    }, () => {
      console.log('Completed!')
    })
  }

}
