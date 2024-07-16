
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:1000'; 

  constructor(private http: HttpClient) { }

  createAdmin(adminData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createadmin`, adminData, { headers });
  }
  createProject(projectData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createproject`, projectData, { headers });
  }
  lAdmin(adminData:any):Observable<any>{
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/adminlogin`, adminData);
  }
  getAdmins(companyname: string): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/getadmin`,{companyname});
  }
  getProject(): Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}/getadminproject`);
  }
  getManagerLeave():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getmangerleave`)
  }
  getManagerProject(manageremail:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(`${this.apiUrl}/getmanagerproject`, {manageremail}, { headers });
  }
  createProjectTeam(data:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(`${this.apiUrl}/createteam`, data, { headers });
  }
  grantManagerLeave(id:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/grantmanagerleave`,{id},{headers})
  }
  denyManagerLeave(id:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/denymanagerleave`,{id},{headers})
  }
  uAdmin(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updateadmin`,user,{headers})
  }
  
  dAdmin(id:any):Observable<any>{
    
    return this.http.delete<any>(`${this.apiUrl}/deleteadmin`,{body:{id:id}})
  }
  getMangers(companyname:string): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/getmanager`,{companyname});
  }
  lManager(managerData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/managerlogin`, managerData, { headers });
  }
  createManager(managerData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createmanager`, managerData, { headers });
  }
  
  uManager(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updatemanager`,user,{headers})
  }
  dManager(id:any):Observable<any>{
   
    return this.http.delete<any>(`${this.apiUrl}/deletemanager`,{body:{id:id}})
  }
  applyManagerLeave(data:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/applymanagerleave`,data,{headers})
  }
  getManagerLeaveByEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(`${this.apiUrl}/getmanagerleavebyemail`, {email}, { headers });
  }
  
  applyUserLeave(data:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/applyuserleave`,data,{headers})
  }
  getUserLeaveByEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/getuserleavebyemail`, { email });
  }

  getUserLeave():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getuserleave`)
  }
  grantUserLeave(id:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/grantuserleave`,{id},{headers})
  }
  denyUserLeave(id:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/denyuserleave`,{id},{headers})
  }
  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createuser`, userData, { headers });
  }
  uUser(user:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json'})
    return this.http.put<any>(`${this.apiUrl}/updateuser`,user,{headers})
  }
  getUsers(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/getuser`);
  }
   getUserProjects(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/userproject`,{username},{headers});
  }
  dUser(id:any):Observable<any>{
    
    return this.http.delete<any>(`${this.apiUrl}/deleteuser`,{body:{id:id}});
  }
  lUser(userData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/userlogin`, userData, { headers });
  }
  rPass(userData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/sendMail`, userData);
  }

  //----------------------time sheet--------------------\\

  sendUserSheet(sheetData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/usertimesheet`, sheetData)
  }

  getUserSheet(username:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/mytimesheet`, {username})
  }

  sendManagerSheet(sheetData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/managertimesheet`, sheetData)
  }

  getManagerSheet(managername:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/myowntimesheet`, {managername})
  }

  getAllUserSheet():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/allusertimesheet`)
  }

  //---------------Team------------\\

  checkTeam(projectname:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/findprojectteam`, {projectname})
  }
}
