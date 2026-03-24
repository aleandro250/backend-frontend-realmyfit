import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedController } from './seed.controller';
import { DatabaseModule } from './database/database.module';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { enviroments } from './enviroments';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { ProductsModule } from './products/products.module';
import { EventsModule } from './events/events.module';
import { EventRegistrationsModule } from './event-registrations/event-registrations.module';
import { MembershipsModule } from './memberships/memberships.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContactsModule } from './contacts/contacts.module';
import { PaymentsModule } from './payments/payments.module';
import { TrainersModule } from './trainers/trainers.module';
import { MachinesModule } from './machines/machines.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import config from './config';

@Module({
  imports: [
    // ...
    FilesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    EventsModule,
    EventRegistrationsModule,
    MembershipsModule,
    ReviewsModule,
    ContactsModule,
    PaymentsModule,
    TrainersModule,
    MachinesModule,
    OrdersModule,
  ],
  controllers: [AppController, SeedController],
  providers: [AppService],
})
export class AppModule { }
