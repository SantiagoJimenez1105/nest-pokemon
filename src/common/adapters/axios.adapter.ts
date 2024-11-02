import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapater implements HttpAdapter{

  private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try{
            const {data} = await this. axios.get<T>(url);
            return data
        }catch{
            throw new Error("Esto es un error-Observe los logs0009");
        }
    }

}