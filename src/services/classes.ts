import api from "./api";

export class University {
    id: number;
    name: string;
    initial: string;
    region: string;
    regionType: string;
    state: string;
    type: string;
    createdAt: string;
    updatedAt: string;

    static async getAll(size: number, offset: number) {
        const { data } = await api.get(`/universities`);

        const filteredResponse = await api.get(`/universities`, {
            params: {
                size,
                offset
            }
        });

        return { total: data.length, items: filteredResponse.data };
    }
}

export class Filter {
    size: number;
    offset: number;
    total: number
}
