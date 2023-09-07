import { AxiosResponse } from "axios";
import { Exercise } from "../models/Exercise";
import { HttpClient } from "./HttpClient";
import { IDataRepository } from "./IDataRepository";
import { BASE_URL, user } from "../constants/constants";



export class ApiResponse<T> {
    data?: T;
    succeeded?: boolean;
    errors: any;
}


const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
      const result: ApiResponse<any> = {
        data: response.data,
        succeeded: response.status === 200,
        errors: response.data.errors,
      };
      resolve(result);
    });
  };


class ApiDataRepository extends HttpClient implements IDataRepository  {
    async fetchFavoriteExercises(): Promise<Exercise[]> {
        const instance = this.createInstance();
        const result = await instance.get(`${BASE_URL}/user-favorites/${user.code}`).then(transform);
        return result.data;
    }
   
} 