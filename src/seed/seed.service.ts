import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response.interface';
import { AxiosAdapater } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapater
  ) {}




  async executeSeed(){

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('http://pokeapi.co/api/v2/pokemon?limit=650');

    // const insertPromisesArray = [];

    const pokemonToInsert: {name:string,no:number}[] = []

    data.results.forEach(async({name,url})=>{

      const segments = url.split('/');
      const no = +segments[segments.length -2];

      // const pokemon = await this.pokemonModel.create({name,no});
      // insertPromisesArray.push(
      //   this.pokemonModel.create({name,no})
      // )
 
      pokemonToInsert.push({name,no});
      
    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
