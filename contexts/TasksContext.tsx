import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  loading: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const STORAGE_KEY = '@tasks';

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar tarefas do AsyncStorage ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  // Salvar tarefas no AsyncStorage sempre que mudarem
  useEffect(() => {
    if (!loading) {
      saveTasks();
    }
  }, [tasks, loading]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title, description } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        loading,
      }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
}

