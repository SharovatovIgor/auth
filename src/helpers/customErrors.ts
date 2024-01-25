import { HttpException } from "@nestjs/common";

export class AlredyExist extends HttpException {
  constructor(message: string) {
    super(message, 409)
  }
}