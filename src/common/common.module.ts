import { Module } from '@nestjs/common';
import { AxiosAdapater } from './adapters/axios.adapter';
import axios from 'axios';

@Module({
    providers:[AxiosAdapater],
    exports:[AxiosAdapater]
})
export class CommonModule {}
