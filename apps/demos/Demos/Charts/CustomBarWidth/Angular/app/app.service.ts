import { Injectable } from '@angular/core';

export class OilProduction {
  state: string;

  year1970: number;

  year1980: number;

  year1990: number;

  year2000: number;

  year2008: number;

  year2009: number;
}

const oilProductionData: OilProduction[] = [{
  state: 'Saudi Arabia',
  year1970: 186.7,
  year1980: 480.4,
  year1990: 319.6,
  year2000: 465,
  year2008: 549.7,
  year2009: 428.4,
}, {
  state: 'USA',
  year1970: 557.8,
  year1980: 423.2,
  year1990: 340.1,
  year2000: 282.9,
  year2008: 280,
  year2009: 298.9,
}, {
  state: 'China',
  year1970: 32.7,
  year1980: 87.7,
  year1990: 165.1,
  year2000: 126.6,
  year2008: 191.3,
  year2009: 181.1,
}, {
  state: 'Canada',
  year1970: 87.5,
  year1980: 78.1,
  year1990: 69.3,
  year2000: 145.7,
  year2008: 148.5,
  year2009: 182.2,
}, {
  state: 'Mexico',
  year1970: 24.7,
  year1980: 109.2,
  year1990: 145.3,
  year2000: 148.3,
  year2008: 132.1,
  year2009: 121.6,
}];

@Injectable()
export class Service {
  getOilProductionData(): OilProduction[] {
    return oilProductionData;
  }
}
