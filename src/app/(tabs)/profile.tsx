import { Text, View, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import Button from '~/src/components/Button';
import { supabase } from '~/src/lib/supabase';

export default function ProfileScreen() {
    
    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useState('')

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
    <View className='flex-1'>
        {/* Avatar Image picker */}
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

        <Text className='text-gray-500 font-semibold mb-2 ml-2'>
            Username
        </Text>
        <TextInput 
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder='Username'
            className='p-3 rounded-md border border-gray-300'
        />

        <View className='gap-2 mt-auto'>
            <Button title="Update profile"/>
            <Button title="Sign out" onPress={() => supabase.auth.signOut()}/>
        </View>


    </View>
    )
}