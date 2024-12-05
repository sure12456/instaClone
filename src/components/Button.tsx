import { Pressable, Text } from "react-native";
    

type ButtonProps ={
    title: String;
    onPress?: () => void;
}
export default function Button({ title, onPress }: ButtonProps ) {
    return(
        <Pressable className='bg-blue-500 w-full p-3 items-center rounded-lg'>
            <Text className='text-white font-semibold'>{title}</Text>
        </Pressable>
    );

};
    
    
    
    
