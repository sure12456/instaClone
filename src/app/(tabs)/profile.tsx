import { useState, useEffect } from 'react'
import { supabase } from '~/src/lib/supabase'
import { StyleSheet, View, Alert, TextInput, Text, Image } from 'react-native'
// import { Session } from '@supabase/supabase-js'
import Button from '~/src/components/Button'
import { useAuth } from '~/src/providers/AuthProvider'
import * as ImagePicker from 'expo-image-picker';



export default function Account() {
    const { session } = useAuth();
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

  return (
    <View style={styles.container}>
        {image? (
            <Image 
            source={{ uri: image}}
            className='w-52 aspect-square rounded-full self-center bg-slate-300'
        />
        ) : (
            <View
                className='w-52 aspect-square rounded-full self-center bg-slate-300'
            >
            </View>
        )}
        <Text 
            onPress={pickImage} 
            className='font-semibold m-5 self-center text-blue-500'>Change
        </Text>



      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text className='text-gray-500 font-semibold mb-2 ml-2'>
            Email
        </Text>
        <TextInput 
            className='p-3 rounded-md border border-gray-300' value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Text className='text-gray-500 font-semibold mb-2 ml-2'>
            Username
        </Text>
        <TextInput 
            className='p-3 rounded-md border border-gray-300' value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Text className='text-gray-500 font-semibold mb-2 ml-2'>
            Website
        </Text>
        <TextInput 
            className='p-3 rounded-md border border-gray-300' value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})