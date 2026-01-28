import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTasks } from '@/contexts/TasksContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TasksScreen() {
  const router = useRouter();
  const { tasks, deleteTask, toggleTask, loading } = useTasks();
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Deletar Tarefa', `Tem certeza que deseja deletar "${title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: () => deleteTask(id),
      },
    ]);
  };

  const handleEdit = (id: string) => {
    router.push(`/task-form?id=${id}`);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={tintColor} />
        <ThemedText style={styles.loadingText}>Carregando tarefas...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Minhas Tarefas</ThemedText>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tintColor }]}
          onPress={() => router.push('/task-form')}>
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView>

      {tasks.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <IconSymbol name="list.bullet" size={64} color={iconColor} />
          <ThemedText type="subtitle" style={styles.emptyText}>
            Nenhuma tarefa ainda
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Toque no botão + para criar sua primeira tarefa
          </ThemedText>
        </ThemedView>
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {tasks.map((task) => (
            <ThemedView key={task.id} style={styles.taskCard}>
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() => toggleTask(task.id)}
                activeOpacity={0.7}>
                <IconSymbol
                  name={task.completed ? 'checkmark.circle.fill' : 'circle'}
                  size={24}
                  color={task.completed ? '#4CAF50' : iconColor}
                />
                <ThemedView style={styles.taskTextContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskCompleted,
                    ]}>
                    {task.title}
                  </ThemedText>
                  {task.description ? (
                    <ThemedText
                      style={[styles.taskDescription, task.completed && styles.taskCompleted]}>
                      {task.description}
                    </ThemedText>
                  ) : null}
                </ThemedView>
              </TouchableOpacity>

              <ThemedView style={styles.taskActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEdit(task.id)}
                  activeOpacity={0.7}>
                  <IconSymbol name="pencil" size={20} color={tintColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(task.id, task.title)}
                  activeOpacity={0.7}>
                  <IconSymbol name="trash" size={20} color="#F44336" />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 60,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskTextContainer: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    marginTop: 16,
  },
  emptySubtext: {
    textAlign: 'center',
    opacity: 0.7,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

