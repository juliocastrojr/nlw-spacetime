import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ImageBackground } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import blurBg from '../src/assets/bg_blur.png'
import Stripes from '../src/assets/stripes.svg'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { StatusBar } from 'expo-status-bar'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  )

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  // !!-> converte o resultado para boolean

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticate(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }
  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
