import { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
// @ts-ignore
import Lottie from 'lottie-react'
import theme from './theme'
import LottoResultScreen from './components/LottoResultScreen'
import loading1Data from './loading1.json'
import loading2Data from './loading2.json'

type LoadingStep = 'initial' | 'loading1' | 'loading2' | 'loading3' | 'complete'

function App() {
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('initial')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    // 처음 접속시 모달 표시
    onClose()
    handleInitial()
  }, [])

  const handleInitial = () => {
    setLoadingStep('loading1')
    setTimeout(() => {
      setLoadingStep('initial')
      setTimeout(() => {
        onOpen()
      }, 4000)
    }, 3000)
  }

  const handleRefresh = () => {
    setLoadingStep('loading1')

    // 5초 후 당첨 메시지 표시
    setTimeout(() => {
      setLoadingStep('loading2')

      // 2초 후 세 번째 로딩으로 전환
      setTimeout(() => {
        setLoadingStep('loading3')

        // 3초 후 최종 화면으로 전환
        setTimeout(() => {
          setLoadingStep('complete')
        }, 4000)
      }, 5000)

    }, 5000)
  }

  const renderLoadingScreen = () => {
    if (loadingStep === 'loading1') {
      return (
        <VStack justify="center" align="center" spacing={6}>
          <Box w="100px" h="100px">
            <Lottie animationData={loading1Data} loop={true} />
          </Box>
          <Text fontSize="lg" color="black" fontWeight="bold" textShadow="0 2px 4px rgba(0,0,0,0.5)" textAlign={'center'}>
            나누면 행복해지는<br />동행 복권
          </Text>
        </VStack>
      )
    }

    if (loadingStep === 'loading2') {
      return (
        <VStack justify="center" align="center" spacing={8}>
          <Text
            fontSize="4xl"
            fontWeight="900"
            color="yellow.900"
            textAlign="center"
            animation="pulse 1s infinite"
            textShadow="0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6)"
            sx={{
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.1)', opacity: 0.9 },
              },
            }}
          >
            🎉 당첨되셨습니다!! 🎉
          </Text>
          <Text fontSize="xl" color="black" fontWeight="bold" textAlign="center">
            축하합니다! 1등에 당첨되셨습니다!
          </Text>
        </VStack>
      )
    }

    if (loadingStep === 'loading3') {
      return (
        <VStack justify="center" align="center" spacing={6} position="relative">
          {/* 찌지직 효과를 위한 배경 */}
          <Box
            position="absolute"
            top="-20px"
            left="-20px"
            right="-20px"
            bottom="-20px"
            // bg="rgba(0,0,0,0.1)"
            animation="glitch 0.3s infinite"
            sx={{
              '@keyframes glitch': {
                '0%, 100%': { transform: 'translate(0)' },
                '10%': { transform: 'translate(-2px, 2px)' },
                '20%': { transform: 'translate(-2px, -2px)' },
                '30%': { transform: 'translate(2px, 2px)' },
                '40%': { transform: 'translate(2px, -2px)' },
                '50%': { transform: 'translate(-2px, 2px)' },
                '60%': { transform: 'translate(-2px, -2px)' },
                '70%': { transform: 'translate(2px, 2px)' },
                '80%': { transform: 'translate(2px, -2px)' },
                '90%': { transform: 'translate(-2px, 2px)' },
              },
            }}
          />

          <Box w="250px" h="180px" position="relative" zIndex="2">
            <Lottie animationData={loading2Data} loop={true} />
          </Box>
          <Text
            fontSize="xl"
            color="black"
            fontWeight="bold"
            position="relative"
            zIndex="2"
            textAlign={'center'}
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            할아버지, 할머니가<br />되신 것을 축하합니다!!
          </Text>
        </VStack>
      )
    }

    return null
  }

  return (
    <ChakraProvider theme={theme}>
      {loadingStep === 'complete' ? (
        /* Complete 단계: 초음파 영상 전체 화면 재생 */
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          zIndex="10000"
          bg="black"
        >
          <video
            autoPlay
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src={import.meta.env.PROD ? "/pregnancyAnnouncement/초음파.mp4" : "/초음파.mp4"} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </Box>
      ) : (
        <Box minH="100vh" bg="gray.50" position="relative">
          {/* 항상 LottoResultScreen을 배경으로 표시 */}
          <LottoResultScreen />

          {/* 로딩 오버레이 */}
          {loadingStep !== 'initial' && (
            <Box
              position="fixed"
              top="0"
              left="0"
              right="0"
              bottom="0"
              zIndex="9999"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backdropFilter="blur(12px)"
              bg="rgba(255, 255, 255, 0.4)"
            >
              {renderLoadingScreen()}
            </Box>
          )}
        </Box>
      )}

      {/* 서비스 오류 모달 */}
      <Modal isOpen={isOpen} onClose={() => { }} isCentered size="md">
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalBody py={8}>
            <VStack spacing={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" color="red.500">
                ⚠️ 서비스 오류
              </Text>
              <Text fontSize="md" textAlign="center" lineHeight="1.6">
                죄송합니다. 서비스 이슈로 오류가 발생했습니다.
                <br />
                새로고침을 눌러 당첨번호를 다시 확인해주세요.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => { onClose(); handleRefresh(); }} w="full">
              새로고침
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

export default App
