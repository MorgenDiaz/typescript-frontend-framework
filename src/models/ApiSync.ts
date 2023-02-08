import axios, { AxiosPromise, AxiosResponse } from "axios";

interface Syncable {
  id?: number;
}

export class ApiSync<T extends Syncable> {
  constructor(public rootUrl: string) {}

  async fetch(id: number): AxiosPromise<T> {
    const response: AxiosResponse = await axios.get(`${this.rootUrl}/${id}`);

    return response.data;
  }

  async save(data: T): AxiosPromise<T> {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
