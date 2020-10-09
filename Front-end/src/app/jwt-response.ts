export interface JwtResponse {
    user: {
        id: number,
        name: string,
        access_token: string,
        expires_in: number
    }
    msg:{
        err: string;
        mes: string;
        
    }
}

