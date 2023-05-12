import { Pipe, PipeTransform } from '@angular/core';
import { ICoworking } from '../interfaces/interfaces';

@Pipe({
  name: 'findCoworking'
})
export class FindCoworkingPipe implements PipeTransform {

  transform(coworkings: ICoworking[], searh: string): ICoworking[] {
    if (searh.length === 0)
      return coworkings

    return coworkings.filter(p => p.name.toLowerCase().includes(searh.toLowerCase()));
  }

}
