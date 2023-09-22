import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { Exercise } from "../models/Exercise";
import { HttpClient } from "./HttpClient";
import { IDataRepository } from "./IDataRepository";
import { BASE_URL } from "../constants/constants";
import { PersonalPageInfo } from "../models/PersonalPageInfo";
import { User } from "../models/User";
import { saveAs } from 'file-saver';
import { FoodDiaryEntry } from "../models/FoodDiaryEntry";
import { TipoRefeicao } from "../models/TipoRefeicao";
import { ModuloInfo } from "../models/ModuloInfo";
import { SubModuleInfo } from "../models/SubModuleInfo";
import { SubModulePage } from "../models/SubModulePage";



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
  completedLogin : boolean = false;

  async getPageContent(moduloId: Number, subModuloId: Number, pageNumber: Number): Promise<SubModulePage> {
    const instance = this.createInstance();
    
    try{
      const result = await instance.get(`${BASE_URL}/modulo/${moduloId}/${subModuloId}/${pageNumber}`).then(transform);    
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  async getSubmoduleList(moduloId: Number): Promise<SubModuleInfo[]> {
    const instance = this.createInstance();
    
    try{
      const result = await instance.get(`${BASE_URL}/modulo-progress/${this.user.code}/${moduloId}`).then(transform);
      let submodulesInfo: SubModuleInfo[] = [];
      const submodules = result.data.subModuleUserProgresses;
      let lockModules = false;
      submodules.forEach((submodule: any) => {
        submodulesInfo.push({
          title: submodule.subModule.title,
          isBlocked: lockModules,
        });
        if(!submodule.isCompleted) lockModules = true;

        
        });
      
      return submodulesInfo;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  userCompletedLogin(): boolean {
    return this.completedLogin;
  }

  setUserCompletedLogin(hasCompletedLogin: boolean): void {
    this.completedLogin = hasCompletedLogin;
  }
  async fetchModuloNameAndIntro(moduloId: Number): Promise<ModuloInfo> {
    const instance = this.createInstance();
    
    try{
      const result = await instance.get(`${BASE_URL}/modulo/${moduloId}`).then(transform);
      
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async registerSubModuloTimeStamps(moduloId: Number, subModuloId: Number, timeInicio?: string | undefined, timeFim?: string | undefined): Promise<void> {
    const instance = this.createInstance();
    //create object with timeInicio if not undefined
    let timeStamps = {};
    if(timeInicio !== undefined){
      timeStamps = {
        timeInicio: timeInicio,
      };
    }
  
    if(timeFim !== undefined){
      timeStamps = {
        ...timeStamps,
        timeFim: timeFim,
      };
    }
    try{
      const result = await instance.post(`${BASE_URL}/modulo-progress/${this.user.code}/${moduloId}/${subModuloId}`,
        timeStamps
      ).then(transform);
      
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async registerModuloTimeStamps(moduloId: Number, timeInicio?: string | undefined, timeFim?: string | undefined): Promise<void> {
    const instance = this.createInstance();
    //create object with timeInicio if not undefined
    let timeStamps = {};
    if(timeInicio !== undefined){
      timeStamps = {
        timeStampInicio: timeInicio,
      };
    }
  
    if(timeFim !== undefined){
      timeStamps = {
        ...timeStamps,
        timeStampFim: timeFim,
      };
    }
    try{
      const result = await instance.post(`${BASE_URL}/modulo-progress/${this.user.code}/${moduloId}`,
        timeStamps
      ).then(transform);
      
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  } 
  async checkIfMealDiaryIsAlreadyAdded(refeicao : TipoRefeicao): Promise<FoodDiaryEntry> {
    const instance = this.createInstance();
    const data = new  Date().toLocaleString().split(',')[0].replace('/','-').replace('/','-');
    try{
      const result = await instance.get(`${BASE_URL}/meal-diary/${this.user.code}/${data}/${refeicao}`).then(transform);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  async addFoodDiaryEntry(foodDiary: FoodDiaryEntry): Promise<void> {
    const instance = this.createInstance();
    const dataFim = new Date().toLocaleString().replace(',','');
    try{
      const result = await instance.post(`${BASE_URL}/meal-diary/${this.user.code}`,
        foodDiary
      ).then(transform);
      
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
  logOutUser(): void {
    localStorage.removeItem('user');
    this.user = '{}';
    localStorage.removeItem('dataInicio');
  }
  
  logTimeStampOnAppLogin(): void {
    const timestamp =  new Date().toLocaleString().replace(',','');
    localStorage.setItem('dataInicio', JSON.stringify(timestamp));
  
  }


  async hasAccessToDiaries(): Promise<boolean> {
    const instance = this.createInstance();
    const dataFim = new Date().toLocaleString().replace(',','');
    try{
      const result = await instance.get(`${BASE_URL}/user/${this.user.code}/accessToDiaries`).then(transform);
      
      console.log(result.data);
      return result.data;
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }

  updateUser() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  async logAccessToApp(): Promise<void> {
    if(!this.completedLogin) return;
    const instance = this.createInstance();
    if (localStorage.getItem('dataInicio') === null) {
      return;
    }
    const dataInicio = JSON.parse(localStorage.getItem('dataInicio') || '{}');
    const dataFim = new Date().toLocaleString().replace(',','');
    try{
      const result = await instance.post(`${BASE_URL}/access/`,
      {
        userCode: this.user.code,
        dataInicio: dataInicio,
        dataFim: dataFim,
      }).then(transform);
      
      console.log(result.data);
     
    }
    catch(error){
      
      throw error;
    }
  }

  async downloadExcel(): Promise<void> {
    let instance = axios.create({  baseURL: BASE_URL });  
    let options: AxiosRequestConfig = { 
      url: `/excel`,
      "method": "GET",
      responseType: 'blob' // don't forget this
    };  
    return instance.request<any>(options)
      .then(response => { 
        let filename = response.headers['content-disposition']
          .split(';')
          .find((n: any) => n.includes('filename='))
          .replace('filename=', '')
          .trim();      
        let url = window.URL
          .createObjectURL(new Blob([response.data]));     
        saveAs(url, filename);    
    }).catch(error => {
      console.log(error);
      throw error;
    });
    
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