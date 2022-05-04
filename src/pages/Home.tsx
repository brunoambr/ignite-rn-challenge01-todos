import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task })); // deep copy

    const selectedTask = updatedTasks.find(task => task.id === id);

    if (selectedTask) {
      selectedTask.done = !selectedTask.done;
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(tasks.filter(task => task.id !== id));
          }
        }
      ]
    );
  }

  function handleEditTask({ id, taskNewTitle }: { id: number, taskNewTitle: string }) {
    const updatedTasks = tasks.map(task => ({ ...task })); // deep copy

    const selectedTask = updatedTasks.find(task => task.id === id);

    if (selectedTask) {
      selectedTask.title = taskNewTitle;
    }

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})