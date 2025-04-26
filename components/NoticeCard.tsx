import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notice } from '../constants/mockNotices';

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onPress }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateDescription = (description: string, maxLines: number = 3) => {
    const words = description.split(' ');
    if (words.length <= maxLines * 10) return description;
    return words.slice(0, maxLines * 10).join(' ') + '...';
  };

  return (
    <TouchableOpacity
      style={[styles.card, notice.isUnread && styles.unreadCard]}
      onPress={() => onPress(notice)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{notice.title}</Text>
        {notice.isUnread && (
          <View style={styles.unreadIndicator} />
        )}
      </View>
      
      {notice.subtitle && (
        <Text style={styles.subtitle}>{notice.subtitle}</Text>
      )}
      
      <Text style={styles.description}>
        {truncateDescription(notice.description)}
      </Text>
      
      <View style={styles.footer}>
        {notice.hasAttachment && (
          <Ionicons name="document-attach" size={20} color="#666" />
        )}
        <Text style={styles.dateTime}>{formatDateTime(notice.dateTime)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF69B4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 12,
    color: '#888',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF69B4',
    marginLeft: 8,
  },
}); 