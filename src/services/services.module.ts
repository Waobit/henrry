import { Module } from '@nestjs/common';
import { ServicesController } from './infrastructure/services.controller';
import { ServicesService } from './application/services.service';

// Repositories
import { ServicesAdapterRepository } from './infrastructure/adapters/services.adapter.repository';

// Ports
import { SERVICES_REPOSITORY } from './domain/ports/services.port.repository';

// Auth Module
import { AuthModule } from '../auth/auth.module';

// Database
import { CosmosDBModule } from '../dababases/cosmos.module';

const REPOSITORIES = [
  { provide: SERVICES_REPOSITORY, useClass: ServicesAdapterRepository },
];

const SERVICES = [
  ServicesService
];

@Module({
  imports: [AuthModule, CosmosDBModule.forRoot()],
  controllers: [ServicesController],
  providers: [...SERVICES, ...REPOSITORIES],
  exports: [ServicesService],
})
export class ServicesModule { }
