import { Component, OnInit } from '@angular/core';
import { Covid19dataService } from './../../services/covid19data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private covidData: Covid19dataService) {
   }
totalData;
satesData;
single;
view: any[] = [500,300];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  colorScheme = {
    domain: ['red','blue','green','gray']
  };
  ngOnInit() {

    this.covidData.getCovidData()
      .subscribe(res => {
        this.totalData=res['statewise'][0]
       // console.log(res['statewise'])
        this.satesData=res['statewise'];
        this.single=[{
         "name":'Confirmed',
         "value":this.totalData['confirmed']
        },
        {
          "name":'Active',
          'value':this.totalData['active']
        },
        {
          "name":"Recovered",
          'value':this.totalData['recovered']
        },
        {
          "name":"Deceased",
          'value':this.totalData['deaths']
        }
      ]
        console.log(this.single)
      },
      error=>{console.log(error)
}
      )
    
  }
  onSelect(data): void {
   // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
