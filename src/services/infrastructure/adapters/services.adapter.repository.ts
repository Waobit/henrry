import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { DBService } from "../../../dababases/db.service";
import { IService } from "../../domain/interfaces";
import { ServicesRepository } from "src/services/domain/ports/services.port.repository";

@Injectable()
export class ServicesAdapterRepository implements ServicesRepository {
    private readonly container: string;

    constructor(private db: DBService) {
        this.container = 'services';
    }

    async create(body: IService): Promise<IService> {
        try {
            return await this.db.create(this.container, body);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(): Promise<IService[]> {
        try {
            const querySpec = {
                query: 'SELECT * FROM c WHERE AND c.status = @status',
                parameters: [{ name: '@status', value: 'active' }]
            };

            const results = await this.db.query(this.container, querySpec);
            return results;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string): Promise<IService> {
        try {
            const querySpec = {
                query: 'SELECT * FROM c WHERE c.id = @id AND c.status = @status',
                parameters: [{ name: '@id', value: id }, { name: '@status', value: 'active' }]
            };

            const results = await this.db.query(this.container, querySpec);
            return results[0] ?? null;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id: string, body: IService): Promise<IService> {
        try {
            return await this.db.update(this.container, id, body);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            return await this.db.delete(this.container, id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}