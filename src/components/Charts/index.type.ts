export interface Commend{
    key:string
    method:string
    args:Array<any>
}

export interface State{
    chunks:Array<string>,
    cursor:number,
}