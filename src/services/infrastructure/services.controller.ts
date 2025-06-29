import { Controller, Post, Body, Param, Put, Get, Delete } from '@nestjs/common';

import { Auth } from '../../auth/infrastructure/decorators';
import { ResponsesUtil } from '../../common/utils';
import { CreateServiceDto, UpdateServiceDto } from './dtos';
import { ServicesService } from '../application/services.service';

@Controller('services')
@Auth()
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Post()
    async create(@Body() body: CreateServiceDto): Promise<ResponsesUtil> {
        return await this.servicesService.create(body);
    }

    @Get()
    async finAll(): Promise<ResponsesUtil> {
        return await this.servicesService.findAll();
    }

    @Get(':id')
    async finOne(@Param('id') id: string): Promise<ResponsesUtil> {
        return await this.servicesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateServiceDto): Promise<ResponsesUtil> {
        return await this.servicesService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ResponsesUtil> {
        return await this.servicesService.delete(id);
    }

}
