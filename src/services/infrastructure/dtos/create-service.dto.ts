import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceDto {

    @IsNumber()
    @IsNotEmpty()
    service_at: number;

    @IsString()
    @IsNotEmpty()
    client: string;

    @IsString()
    @IsNotEmpty()
    route: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    pay: string;

    @IsString()
    @IsOptional()
    observation?: string;
}
