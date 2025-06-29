import { IService } from "../interfaces";

export const SERVICES_REPOSITORY = 'SERVICES_REPOSITORY';

export interface ServicesRepository {
    create(body: IService): Promise<IService>;
    findAll(): Promise<IService[]>;
    findOne(id: string): Promise<IService>;
    update(id: string, body: IService): Promise<IService>;
    delete(id: string): Promise<void>;
}