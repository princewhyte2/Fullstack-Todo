
import todoservices from '../src/services/todoservices';

describe('todoservices', () => {


    describe('getEntries', () => {
        it('should return an array of todos', () => {
            const todos = todoservices.getEntries();
            expect(todos).toBeInstanceOf(Array);
        }
        );
    }
    );
    describe('addTodo', () => {
        it('should add a todo', () => {
            const todo = todoservices.addTodo({ task: 'test' });
            expect(todo.task).toBe('test');
        }
        );
    }
    );
    describe('findById', () => {
        it('should find a todo by id', () => {
            const todo = todoservices.findById(1);
            expect(todo?.id).toBe(1);
        }
        );
    }
    );
    describe('toggleStatus', () => {
        it('should toggle the status of a todo', () => {
            const todo = todoservices.toggleStatus(1);
            expect(todo?.status).toBe('completed');
        }
        );

         it('should toggle the status of a todo', () => {
            const todo = todoservices.toggleStatus(1);
            expect(todo?.status).toBe('active');
        }
        );

    }
    );
  
    describe('updateTodo', () => {
        it('should update a todo', () => {
            const todo = todoservices.updateTodo(1, 'updatedtest');
            expect(todo?.task).toBe('updatedtest');
        }
        );
    }
    );

      describe('deleteTodo', () => {
        it('should delete a todo', () => {
            todoservices.deleteTodo(1);
            const todos = todoservices.getEntries();
            expect(todos.length).toBe(0);
        }
        );
    }
    );
}
)
;