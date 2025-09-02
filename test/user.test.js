import request from 'supertest';
import app from  '../app.js'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import dotenv from "dotenv";

dotenv.config();

describe('test crud user', () =>{
    let token = null;
    let id;

    it('create user', async () => {
        const response = await request(app)
        .post('/api/register')
        .send({username : "supertest5556",
             mail: "gaming.j@gmail.com", 
             password: "1234"
            });

            console.log(response.body)
            expect(response.status).toBe(201);
    })

    it('login', async () =>{
     const response = await request(app)
     .post('/api/login')
     .send({mail: "gaming.j@gmail.com", password: "1234"});
console.log(response.body)
      token = response.body.token;
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    })

    it('user by ID', async () =>{
        const response = await request(app)
        .get('/api/profile/')
        .set('Authorization', `${token}`);
        console.log(response);
        

        id = response.body.idUser;

        expect(response.status).toBe(200);

        
    })

    it('delete user', async () => {
        const response = await request(app)
        .delete('/api/profile/deleteAccount')
        .set('Authorization', `${token}`);
        expect(response.status).toBe(200)
    })
})
