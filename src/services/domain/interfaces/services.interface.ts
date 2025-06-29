export interface IService {
    id?: string;
    service_at: number;
    client: string;
    route: string;
    amount: number;
    observation?: string;
    status?: 'active' | 'inactive' | 'locked' | 'deleted';
    created_at?: number;
    updated_at?: number;
}