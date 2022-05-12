import supertest from 'supertest';
import app from '../src/app';

const api = supertest(app); 

describe('Todo API', () => {  
    it('should return a list of todos', async () => {
        const response = await api.get('/api/todos');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
         expect(response.body.length).toBe(0);
    })
   
    it('should create a todo', async () => {
        await api.post('/api/todos').send({
            task: 'test',
        }).expect(201);
        
        const response = await api.get('/api/todos')
        expect(response.body[0].task).toBe('test');

    })

    it('should toggle a todo status', async () => {
        await api.put('/api/todos/status/1').expect(200);
        const response = await api.get('/api/todos');
        expect(response.body[0].status).toBe('completed');
        await api.put('/api/todos/status/1').expect(200);
        const responseTwo = await api.get('/api/todos');
        expect(responseTwo.body[0].status).toBe('active');
    })
        

    it('should update a todo', async () => {
         await api.put('/api/todos/1').send({
            task: 'updatedtest',
         }).expect(200);
        const response = await api.get('/api/todos');
        expect(response.body[0].task).toBe('updatedtest');
    })

    it('should delete a todo', async () => {
        await api.delete('/api/todos/1').expect(200);
        const response = await api.get('/api/todos');
        expect(response.body.length).toBe(0);
    })
}
)
;