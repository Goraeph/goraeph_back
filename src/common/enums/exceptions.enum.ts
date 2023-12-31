export enum UserExceptionCodeEnum {
  UserNotFound = '0001',
  NotAuthenticated = '0002',
  EmailExists = '0003',
  UsernameExists = '0004',
  InternalServerError = '0005',
  PasswordIncorrect = '0006',
  FieldInvalid = '0007',
}
export enum JwtExceptionCodeEnum {
  JWTVerifyFailed = '1001',
}
export enum NestExceptionCodeEnum {
  PageNotFound = '0050',
}
export enum UncatchedExceptrionCodeEnum {
  Uncatched = '0100',
}
