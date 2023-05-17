import { ErrorStatus } from "../enum/ErrorStatus";

export class BadRequestException extends Error {
  readonly code = ErrorStatus.ERROR_BAD_REQUEST;
}
