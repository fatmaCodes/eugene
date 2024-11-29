import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class Auth {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
        this.account = new Account(this.client)

    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            
            if (userAccount) {
                return this.loginUser({ email, password });
            }
            else {
                return userAccount
            }
        } catch (e) {
            console.log("USER ACCOUNT :: SIGNUP ERROR ;; APPWRITE "+e)
        }
    }

    async loginUser({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("APPWRITE:: ACCOUNT LOGIN ERROR:: " + error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("APPWRITE:: ACCOUNT USER FETCHING ERROR:: "+error);
        }
    }

    async logoutUser(){
        try {
          await this.account.deleteSessions()
        } catch (error) {
            console.log("USER ACCOUNT :: LOGOUT ERROR ::" + error)
        }
    }

}

const auth = new Auth()

export default auth;