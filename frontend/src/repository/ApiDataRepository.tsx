import { AxiosResponse } from "axios";

import { Exercise } from "../models/Exercise";
import { HttpClient } from "./HttpClient";
import { IDataRepository } from "./IDataRepository";
import { BASE_URL, user } from "../constants/constants";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";



export class ApiResponse<T> {
    data?: T;
    succeeded?: boolean;
    errors: any;
}


const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
  
    return new Promise((resolve, reject) => {
      const result: ApiResponse<any> = {
        data: response,
        succeeded: response.status === 200,
        errors: response,
      };
      resolve(result);
    });
  };


export class ApiDataRepository extends HttpClient implements IDataRepository  {
   async loginUser(code: string, password: string): Promise<User> {
      const instance = this.createInstance();
        try{
          const result = await instance.post(`${BASE_URL}/login`, {
            code: code,
            password: password,
          }).then(transform);
          console.log(result.data);
          return result.data;
        }
        catch(error){
          console.log(error);
          throw error;
        }
    }
    async fetchPersonalPageInfo(): Promise<PersonalPageInfo> {
      const instance = this.createInstance();
        try{
          const result = await instance.get(`${BASE_URL}/user/${user.code}/personal-page`).then(transform);
          console.log(result.data);
          return result.data;
        }
        catch(error){
          console.log(error);
          throw error;
        }
    }
    async fetchFavoriteExercises(): Promise<Exercise[]> {
        const instance = this.createInstance();
        try{
          const result = await instance.get(`${BASE_URL}/user/${user.code}/favorites`).then(transform);
          user.favoriteExercises.push(...result.data);
          console.log(result.data);
          return result.data;
        }
        catch(error){
          console.log(error);
          throw error;
        }
        
    }
 
   
} 