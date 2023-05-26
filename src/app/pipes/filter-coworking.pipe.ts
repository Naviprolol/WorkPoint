import { Pipe, PipeTransform } from "@angular/core";
import { ICoworking } from "../interfaces/interfaces";


@Pipe({
  name: 'filterCoworking'
})
export class FilterCoworkingPipe implements PipeTransform {

  transform(coworkings: ICoworking[], params: string, value: boolean, name?: any): ICoworking[] {
    if (value === false) {
      return coworkings
    }

    if (params === 'district') {
      return coworkings.filter(p => p.district.includes(name));
    }

    if (params === 'type_cafe') {
      return coworkings.filter(p => p.type_cafe.includes(name));
    }

    if (params === 'opening_hours') {
      return coworkings.filter(p => p.opening_hours.includes(name));
    }

    if (params === 'parking') {
      return coworkings.filter(p => p.parking);
    }

    if (params === 'recreation_area') {
      return coworkings.filter(p => p.recreation_area);
    }

    if (params === 'conference_hall') {
      return coworkings.filter(p => p.conference_hall);
    }

    return []
  }

  // transform(coworkings: ICoworking[], filter: any): ICoworking[] {
  //   if (!coworkings) {
  //     return [];
  //   }

  //   if (!filter.category1 && !filter.category2 && !filter.category3 && !filter.category4 && !filter.category5 && !filter.category6 && !filter.category7 && !filter.category) {
  //     return coworkings;
  //   }

  //   return coworkings.filter(coworking => {
  //     const category1Checked = filter.category1 ? coworking.district === 'Академический' : false;
  //     const category2Checked = filter.category2 ? coworking.district === 'Верх-Исетский' : false;
  //     const category3Checked = filter.category3 ? coworking.district === 'Железнодорожный' : false;
  //     const category4Checked = filter.category4 ? coworking.district === 'Кировский' : false;
  //     const category5Checked = filter.category5 ? coworking.district === 'Ленинский' : false;
  //     const category6Checked = filter.category6 ? coworking.district === 'Октябрьский' : false;
  //     const category7Checked = filter.category7 ? coworking.district === 'Орджоникидзевский' : false;
  //     const category8Checked = filter.category8 ? coworking.district === 'Чкаловский' : false;

  //     return category1Checked || category2Checked || category3Checked || category4Checked || category5Checked || category6Checked || category7Checked || category8Checked;
  //   });
  // }



}
