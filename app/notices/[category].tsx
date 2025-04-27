import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NoticeCard } from '../../components/NoticeCard';
import { mockNotices, Notice } from '../../constants/mockNotices';

const ITEMS_PER_PAGE = 10;

export default function NoticesScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // Track read/unread state for each notice
  const [readNotices, setReadNotices] = useState<Set<string>>(new Set());

  // Filter notices by category and search query
  const filteredNotices = mockNotices.filter(
    (notice) =>
      notice.category === category &&
      (notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Paginate notices
  const paginatedNotices = filteredNotices.slice(0, page * ITEMS_PER_PAGE);

  const showToast = (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
      position: 'top',
      visibilityTime: 1500,
    });
  };

  const handleLoadMore = useCallback(() => {
    if (loading || paginatedNotices.length >= filteredNotices.length) return;

    setLoading(true);
    showToast('Fetching more notices...');
    
    // Simulate API call delay
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  }, [loading, paginatedNotices.length, filteredNotices.length]);

  const handleNoticePress = (notice: Notice) => {
    // Mark notice as read
    setReadNotices((prev) => new Set(prev).add(notice.id));
    // You can also navigate to detail screen here if needed
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={styles.loadingText}>Fetching more notices...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category} Notices</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notices..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={paginatedNotices}
        renderItem={({ item }) => (
          <NoticeCard
            notice={{ ...item, isUnread: !readNotices.has(item.id) }}
            onPress={handleNoticePress}
          />
        )}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
}); 