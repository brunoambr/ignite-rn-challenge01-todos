import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  index: number,
  task: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, taskNewTitle }: { id: number, taskNewTitle: string }) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setEditedTitle(task.title);
  }

  function handleSubmitEditing() {
    const editedTask = {
      id: task.id,
      taskNewTitle: editedTitle
    }

    editTask(editedTask);
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    }
    else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            onChangeText={setEditedTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            value={editedTitle}
          />

        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>

        {
          isEditing && (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon
                name="x"
                size={22}
                color="#C0C0C0"
              />
            </TouchableOpacity>
          )}
        {
          !isEditing && (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Icon
                name="edit"
                size={22}
                color="#C0C0C0"
              />
            </TouchableOpacity>
          )
        }

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  actionContainer: {
    flexDirection: 'row',
  }
})