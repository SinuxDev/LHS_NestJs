import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['admin', 'guest', 'user'], {
    message: 'Role must be either admin, guest, or user',
  })
  @IsNotEmpty()
  role: 'admin' | 'guest' | 'user';
}
