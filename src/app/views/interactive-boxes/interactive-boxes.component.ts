import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-interactive-boxes',
  templateUrl: './interactive-boxes.component.html',
  styleUrls: [ './interactive-boxes.component.css' ],
} )

export class InteractiveBoxesComponent implements OnInit
{
  results: any;
  collapsed = false;
  collapsedFirstBox = false;
  collapsedSecondBox = false;
  collapsedThirdBox = false;
  totalValue: any;

  constructor () { }

  ngOnInit (): void
  {
  }


  toggle ()
  {
    this.collapsed = !this.collapsed;
  }

  expand ()
  {
    this.collapsed = false;
  }

  collapse ( data: any )
  {
    console.log( data )
    if ( data == 0 )
    {
      this.collapsedFirstBox = true;
      this.collapsedSecondBox = false;
      this.collapsedThirdBox = false;
      this.totalValue = '$10.00 USD';
    } else if ( data == 1 )
    {
      this.collapsedFirstBox = false;
      this.collapsedSecondBox = true;
      this.collapsedThirdBox = false;
      this.totalValue = '$18.00 USD';
    } else if ( data == 2 )
    {
      this.collapsedFirstBox = false;
      this.collapsedSecondBox = false;
      this.collapsedThirdBox = true;
      this.totalValue = '$24.00 USD';
    }

  }
}
