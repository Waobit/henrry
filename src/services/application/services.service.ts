import { HttpException, Inject, Injectable, InternalServerErrorException, UnauthorizedException, Logger } from "@nestjs/common";

import { MessagesConstant } from "../../common/constants";
import { ResponsesUtil, FunctionsUtil } from "../../common/utils";

import { IService } from "../domain/interfaces";
import { SERVICES_REPOSITORY, ServicesRepository } from "../domain/ports/services.port.repository";

@Injectable()
export class ServicesService {
    private readonly logger = new Logger(ServicesService.name);

    constructor(
        @Inject(SERVICES_REPOSITORY) private readonly serviceRepository: ServicesRepository
    ) { }

    async create(body: IService): Promise<ResponsesUtil> {
        try {
            const serviceToSave: IService = {
                ...body,
                status: 'active',
                created_at: FunctionsUtil.generateUnixTimestamp(),
                updated_at: FunctionsUtil.generateUnixTimestamp()
            };

            const serviceCreated = await this.serviceRepository.create(serviceToSave);
            return ResponsesUtil.response(200, MessagesConstant.service.create, [serviceCreated]);
        } catch (error) {
            this.logger.error(`Error creating service: ${error.message}`, error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(routeType?: string): Promise<ResponsesUtil> {
        console.log('routeType', routeType);
        try {
            const services = await this.serviceRepository.findAll();
            if (!services) throw new UnauthorizedException('Invalid credentials.');

            let filteredServices = services;
            if (routeType) {
                filteredServices = services.filter(service => service.route_type === routeType);
            }

            return ResponsesUtil.response(200, MessagesConstant.service.find_all, [filteredServices]);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string): Promise<ResponsesUtil> {
        try {
            const service = await this.serviceRepository.findOne(id);
            if (!service) throw new UnauthorizedException('Invalid credentials.');

            return ResponsesUtil.response(200, MessagesConstant.service.find_one, [service]);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, body: Partial<IService>): Promise<ResponsesUtil> {
        try {
            const serviceFound = await this.serviceRepository.findOne(id);
            if (!serviceFound) throw new UnauthorizedException('Invalid credentials.');

            const serviceToSave: IService = {
                ...serviceFound,
                ...body,
                updated_at: FunctionsUtil.generateUnixTimestamp()
            };

            const serviceUpdated = await this.serviceRepository.update(serviceFound.id, { ...serviceToSave });

            return ResponsesUtil.response(200, MessagesConstant.service.update, [serviceUpdated]);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const service = await this.serviceRepository.findOne(id);
            if (!service) throw new UnauthorizedException('Invalid credentials.');

            const serviceToDelete: IService = {
                ...service,
                status: 'deleted',
                updated_at: FunctionsUtil.generateUnixTimestamp()
            };
            await this.serviceRepository.update(service.id, serviceToDelete);

            return ResponsesUtil.response(200, MessagesConstant.service.delete);
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException(error.message);
        }
    }

}