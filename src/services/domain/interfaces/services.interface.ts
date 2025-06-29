export interface IService {
    id?: string;
    service_at: number;
    client: string;
    route: string;
    route_type: string;
    amount: number;
    pay: string;
    viaticum?: number;
    fuel?: number;
    observation?: string;
    status?: 'active' | 'inactive' | 'locked' | 'deleted';
    created_at?: number;
    updated_at?: number;
}