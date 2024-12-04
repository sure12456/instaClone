import { Image, Text, View, TextInput, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function CreatPost() {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState<string | null>(null);

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
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

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
                <Pressable className='bg-blue-500 w-full p-3 items-center rounded-lg'>
                    <Text className='text-white font-semibold'>Share</Text>
                </Pressable>
            </View>
            




        </View>
    )
}