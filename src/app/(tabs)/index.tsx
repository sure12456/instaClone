import { Text, View, Image, FlatList } from 'react-native'
import posts from '~/assets/data/posts.json'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import PostListItem from '~/src/components/PostListItem'

const post1 = posts[0]

export default function FeedScreen() {

    console.log(post1)
    return (
        <FlatList 
            data={posts}
            contentContainerStyle={{ gap: 10, alignSelf: 'center', width: '100%', maxWidth: 512 }}
            renderItem={({ item }) => <PostListItem post={item} />}
            showsVerticalScrollIndicator={false}
        />
        
    )
}