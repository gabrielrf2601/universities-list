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

    static async search(text: string) {
        const { data } = await api.get(`/universities`);
        const dataFiltered = data.filter(
            (value: University) => (
                value.name.toLowerCase().search(text) >= 0||
                value.initial.toLowerCase().search(text) >= 0||
                value.region.toLowerCase().search(text) >= 0||
                value.state.toLowerCase().search(text) >= 0
            )
        )

        return { total: dataFiltered.length, items: dataFiltered };
    }
}

export class Filter {
    size: number;
    offset: number;
    total: number;
    search: string
}
