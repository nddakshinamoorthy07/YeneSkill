import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp | Date;
}

interface TodoListProps {
  userId: string;
}

export default function TodoList({ userId }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, `users/${userId}/todos`),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData: Todo[] = [];
      snapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, `users/${userId}/todos`), {
        text: newTodo,
        completed: false,
        createdAt: new Date(),
      });
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (todoId: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, `users/${userId}/todos`, todoId), {
        completed: !completed,
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/todos`, todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">My Todos</h2>
      <form onSubmit={addTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </form>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No todos yet</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-md"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                className="w-5 h-5"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
