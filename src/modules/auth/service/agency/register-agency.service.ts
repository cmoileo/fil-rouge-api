import { HttpException, HttpStatus } from '@nestjs/common';
import HashPassword from '../../../../shared/utils/hash-password';
import GenerateJwt from '../../../../shared/utils/jwt-token/generate-jwt';
import { PrismaClient } from '@prisma/client';
import { RegisterAgencyDto } from '../../dto/agency/register-agency.dto';
import storageService from '../../../../shared/utils/supabase/storage.service';
import { extname } from 'path';

export default class RegisterAgencyService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly body: RegisterAgencyDto,
  ) {}

  async execute(): Promise<
    { token: string; role: string; userId: string } | HttpException
  > {
    if (this.body.password !== this.body.passwordConfirm) {
      throw new HttpException(
        'Password and confirm password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await new HashPassword(this.body.password).hash();

    try {
      const newAgency = await this.prisma.agency.create({
        data: {
          name: this.body.name,
          house_number: this.body.house_number,
          street: this.body.street,
          city: this.body.city,
          zip_code: this.body.zip_code,
          country: this.body.country,
          employee_count: this.body.employee_count,
          plan: 'freemium',
        },
      });

      let imageUrl: { name: string; image_url: string } | null;
      let image_key: string | null;
      if (this.body.avatar) {
        imageUrl = await storageService.uploadFile(this.body.avatar);
        image_key = `${Date.now()}${extname(this.body.avatar.originalname)}`;
      }

      const newUser = await this.prisma.user.create({
        data: {
          email: this.body.email,
          password: hashedPassword,
          agency_id: newAgency.id,
          firstname: this.body.firstname,
          lastname: this.body.lastname,
          role: 'OWNER',
          profile_picture_url: imageUrl ? imageUrl.image_url : null,
          profile_picture_key: imageUrl ? image_key : null,
        },
      });
      if (!newUser) {
        throw new HttpException(
          'User not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!newAgency) {
        throw new HttpException(
          'Agency not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const payload = { sub: this.body.email };
      const token = new GenerateJwt(payload, '30d').generate();

      return {
        token: token,
        role: newUser.role,
        userId: newUser.id,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
