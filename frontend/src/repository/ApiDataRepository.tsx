import { AxiosResponse } from "axios";

import { Exercise } from "../models/Exercise";
import { HttpClient } from "./HttpClient";
import { IDataRepository } from "./IDataRepository";
import { BASE_URL } from "../constants/constants";
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
  
  
  user = JSON.parse(localStorage.getItem('user') || '{}');

  async downloadExcel(): Promise<void> {
    const instance = this.createInstance();
  
    try{
      const result = await instance.get(`${BASE_URL}/excel/`).then(transform);
      console.log(result.data);
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async createUser(code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void> {
    const instance = this.createInstance();
  
    try{
      const result = await instance.post(`${BASE_URL}/user/`,
      {
        code: code,
        password: password,
        role: role,
        createdAt: createdAt,
        hasAccessToApp: hasAccessToApp,
      }).then(transform);
      
      console.log(result.data);
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  async editUser(oldCode: string, code: string, password: string, role: number, createdAt: string, hasAccessToApp: boolean): Promise<void> {
    const instance = this.createInstance();
  
    try{
      const result = await instance.put(`${BASE_URL}/user/${oldCode}`,
      {
        code: code,
        password: password,
        role: role,
        createdAt: createdAt,
        hasAccessToApp: hasAccessToApp,
      }).then(transform);
      
      console.log(result.data);
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  

  async deleteUser(code: string): Promise<void> {
    const instance = this.createInstance();
    try{
      const result = await instance.delete(`${BASE_URL}/user/${code}`).then(transform);
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async fetchAllUsers(): Promise<User[]> {
    const instance = this.createInstance();
    try{
      const result = await instance.get(`${BASE_URL}/user`).then(transform);
      
      let users: User[] = [];
      result.data.users.forEach(user => {
        let newUser: User = user;
        newUser.createdAt = user.createdAt.slice(0,10);
        users.push(newUser);
      });
      console.log(users);
      return users;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
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
          const result = await instance.get(`${BASE_URL}/user/${this.user.code}/personal-page`).then(transform);
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
          const result = await instance.get(`${BASE_URL}/user/${this.user.code}/favorites`).then(transform);
          
          console.log(result.data);
          return result.data;
        }
        catch(error){
          console.log(error);
          throw error;
        }
        
    }
 
   
} 