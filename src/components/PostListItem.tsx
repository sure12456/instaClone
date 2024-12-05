import { View, Text, Image, useWindowDimensions } from 'react-native'
import posts from '~/assets/data/posts.json'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { AdvancedImage } from 'cloudinary-react-native';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

import { cld } from '../lib/cloudinary';


const post1 = posts[0]

export default function PostListItem({ post }) {

    const { width } = useWindowDimensions();

    // cld.image returns a CloudinaryImage with the configuration set.
    const image = cld.image(post.image).resize(thumbnail().width(Math.floor(411)).height(Math.floor(411)));
    const avatar = cld.image(post.user.avatar_url).resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));


    // console.log(post)
    return (
        <View className='bg-white'>
            {/* Header */}

            <View className='p-3 flex-row items-center gap-2'>
                <AdvancedImage 
                    cldImg={avatar}
                    className='w-12 aspect-square rounded-full'
                />
 
                <Text className='font-semibold'>{post.user.username}</Text>
            </View>

            <AdvancedImage 
                cldImg={image}
                className='w-full aspect-[4/3]'
            />

            {/* Icons */}
            <View className="flex-row gap-3 p-3">
                <AntDesign name="hearto" size={20} />
                <Ionicons name="chatbubble-outline" size={20} />
                <Feather name="send" size={20} />

                <Feather name="bookmark" size={20} className="ml-auto" />
            </View>

        </View>
    )
}