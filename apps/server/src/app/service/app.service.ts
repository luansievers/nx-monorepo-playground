import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveApparelDTO } from '@shared';

let record: SaveApparelDTO | undefined = undefined;

@Injectable()
export class AppService {
  findApparel(): SaveApparelDTO {
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  saveApparel(payload: SaveApparelDTO): void {
    record = payload;
  }
}
