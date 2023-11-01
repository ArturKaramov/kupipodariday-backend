import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 400,
  UserAlreadyExists = 409,
  UserNotFound = '404_User',
  WishNotFound = '404_Wish',
  WishlistNotFound = '404_Wishlist',
  OfferNotFound = '404_Offer',
  Forbidden = 403,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Login or password is incorrect'],
  [ErrorCode.UserAlreadyExists, 'User already exists'],
  [ErrorCode.UserNotFound, 'User Not Found'],
  [ErrorCode.WishNotFound, 'Wish Not Found'],
  [ErrorCode.WishlistNotFound, 'Wishlist Not Found'],
  [ErrorCode.OfferNotFound, 'Offer Not Found'],
  [ErrorCode.Forbidden, 'No Permission For Request'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.OfferNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.Forbidden, HttpStatus.FORBIDDEN],
]);
