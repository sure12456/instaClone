import { Image, Text, View, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '~/src/components/Button';
import { uploadImage } from '~/src/lib/cloudinary';
import { supabase } from '~/src/lib/supabase';
import { useAuth } from '~/src/providers/AuthProvider';
import { router } from 'expo-router';

export default function CreatPost() {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState<string | null>(null);

    const { session } = useAuth();

    useEffect(() => {
        if(!image) {
            pickImage();
        }
    }, [image]);



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const createpost = async () => {
                
        if (!image) {
            return;
        }
        console.log("Sent for upload")
        const response = await uploadImage(image);
        console.log("Image Id: ", response?.public_id)
        
        const { data, error } = await supabase
        .from('posts')
        .insert([
        { 
            caption, 
            image: response?.public_id, 
            user_id: session?.user.id 
        },
        ])
        .select()

        router.push('/(tabs)');
        
        // later it is going to store the post in database.
    }

    return (
        <View className='p-3 items-center flex-1'>
            {image? (
                <Image 
                source={{ uri: image}}
                className='w-52 aspect-[3/4] rounded-lg shadow-md'
            />
            ) : (
                <View
                    className='w-52 aspect-[3/4] rounded-lg shadow-md'
                >
                </View>
            )}

            <Text onPress={pickImage} className='text-blue font-semibold m-5'>Change</Text>

            <TextInput 
                value={caption} 
                onChangeText={(newValue) => setCaption(newValue)}
                placeholder='What is on your mind?' 
                className='w-full p-3' 
            />

            <View className='mt-auto w-full'>
                <Button title="Share" onPress={createpost}/>
            </View>
            




        </View>
    )
}