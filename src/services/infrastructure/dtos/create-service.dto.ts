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

    @IsString()
    @IsNotEmpty()
    route_type: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    pay: string;

    @IsNumber()
    @IsOptional()
    viaticum?: number;
    
    @IsNumber()
    @IsOptional()
    fuel?: number;

    @IsString()
    @IsOptional()
    observation?: string;
}
