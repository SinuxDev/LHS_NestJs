import { IsString, IsEnum, IsNotEmpty, IsEmail } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['admin', 'guest', 'user'], {
    message: 'Role must be either admin, guest, or user',
  })
  @IsNotEmpty()
  role: 'admin' | 'guest' | 'user';
}
