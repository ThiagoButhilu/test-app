import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTasks } from '@/contexts/TasksContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TaskFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { tasks, addTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const isEditing = !!id;
  const task = isEditing ? tasks.find((t) => t.id === id) : null;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o título da tarefa');
      return;
    }

    if (isEditing && id) {
      updateTask(id, title.trim(), description.trim());
      Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } else {
      addTask(title.trim(), description.trim());
      Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={tintColor} />
          </TouchableOpacity>
          <ThemedText type="title">{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</ThemedText>
          <ThemedView style={styles.placeholder} />
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText type="subtitle" style={styles.label}>
              Título *
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { borderColor: borderColor, color: textColor },
              ]}
              placeholder="Digite o título da tarefa"
              placeholderTextColor={iconColor}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText type="subtitle" style={styles.label}>
              Descrição
            </ThemedText>
            <TextInput
              style={[
                styles.textArea,
                { borderColor: borderColor, color: textColor },
              ]}
              placeholder="Digite a descrição da tarefa (opcional)"
              placeholderTextColor={iconColor}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </ThemedView>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tintColor }]}
            onPress={handleSave}>
            <ThemedText style={styles.saveButtonText}>
              {isEditing ? 'Atualizar' : 'Criar'} Tarefa
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

