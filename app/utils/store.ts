const appSettings = require('application-settings')

export class Store {

  private static _instance:Store = new Store();

  constructor() {
    if(Store._instance){
        throw new Error("Error: You can have only one instance of the class: Use Store.getInstance() instead of new.");
    }
    Store._instance = this;
  }

  public clear() {
    appSettings.clear()
  }

  public static getInstance(): Store {
    return Store._instance;
  }

  public setUser(data: IUser) {
    appSettings.setString('user', JSON.stringify(data));
  }

  public getUSer(): IUser {
    let user = {}
    if (appSettings.getString('user')) {
      user = JSON.parse(appSettings.getString('user'))
    }
    return user;
  }

  public setToken(token: string) {
    appSettings.setString('token', token);
  }

  public getToken(): string {
    return appSettings.getString('token') || '';
  }
  
}