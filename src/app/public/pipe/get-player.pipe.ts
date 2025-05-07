import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPlayer'
})
export class GetPlayerPipe implements PipeTransform {

  transform(players: any[], player_id: string): unknown {
    let player:any = players.filter((element:any) => element.id == player_id);
    return player[0].name;
  }

}
