import express, {  Router,Request, Response } from "express";
import todoservices from '../services/todoservices';
import toNewTodoEntry from '../validations/todovalidations';


const router: Router = express.Router();



router.get("/", (_req:Request, res:Response):void => {
  res.send(todoservices.getEntries());
});

router.post("/", (req: Request, res: Response): void => {
    try {
    const newTodoEntry = toNewTodoEntry(req.body);

    const addedEntry = todoservices.addTodo(newTodoEntry);
    res.status(201).send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.delete("/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deletedEntry = todoservices.deleteTodo(id);
  if (deletedEntry) {
    res.send(deletedEntry);
  } else {
    res.status(404).send('Todo not found');
  }
}
);

router.put("/status/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const updatedEntry = todoservices.toggleStatus(id);
  if (updatedEntry) {
    res.json(updatedEntry);
  } else {
    res.status(404).send('Todo not found');
  }
}
);

router.put("/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  try {
     const newTodoEntry = toNewTodoEntry(req.body);

     const updatedEntry = todoservices.updateTodo(id, newTodoEntry.task);
  if (updatedEntry) {
    res.send(updatedEntry);
  } else {
    res.status(404).send('Todo not found');
  }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
 
}
);

export default router;
