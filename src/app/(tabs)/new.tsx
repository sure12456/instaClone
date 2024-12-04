import { Image, Text, View, TextInput } from 'react-native'

export default function CreatPost() {
    return (
        <View className='p-3 items-center'>
            <Image 
                source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg"}}
                className='w-52 aspect-[3/4] rounded-lg shadow-md'
            />

            <Text onPress={() => {}} className='text-blue font-semibold m-5'>Change</Text>

            <TextInput placeholder='What is on your mind?' className='bg-red-500 w-full p-3' />


        </View>
    )
}