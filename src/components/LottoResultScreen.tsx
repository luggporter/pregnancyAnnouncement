import {
  Box,
  Flex,
  Text,
  IconButton,
  Circle,
  Container,
  useToken,
} from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import { FiUser, FiChevronUp } from "react-icons/fi";

type BallTone = "blue" | "red" | "gray" | "orange";

type Ball = {
  value: number;
  tone: BallTone;
};

const BallChip = ({ value, tone }: Ball) => {
  const tones: Record<BallTone, { bg: string; color: string }> = {
    blue: { bg: "#2F6BFF", color: "white" },
    red: { bg: "#E53935", color: "white" },
    gray: { bg: "#6B7280", color: "white" },
    orange: { bg: "#F59E0B", color: "white" },
  };

  return (
    <Circle
      size="30px"
      bg={tones[tone].bg}
      color={tones[tone].color}
      fontWeight="800"
      fontSize="13px"
      boxShadow="0 6px 14px rgba(0,0,0,0.12)"
      justifyItems={'center'}
    >
      {value}
    </Circle>
  );
};

export default function LottoResultScreen() {
  const [gray100, gray200, gray500] = useToken("colors", [
    "gray.50",
    "gray.100",
    "gray.500",
  ]);

  const main = "#0E8E7E";

  const draw = {
    title: "로또 02/10 제 2026회",
    date: "2026-10-02 출산",
    numbers: [
      { value: 20, tone: "blue" },
      { value: 26, tone: "red" },
      { value: 10, tone: "red" },
      { value: 2, tone: "red" },
      { value: 82, tone: "gray" },
      { value: 82, tone: "gray" },
    ] as Ball[],
    bonus: { value: 7, tone: "orange" } as Ball,
    total: "20,261,002원",
  };

  return (
    <Box minH="100vh" bg={gray100}>
      <Box bg="white" borderBottom="1px solid" borderColor="blackAlpha.100">
        <Container maxW={{ base: "100%", sm: "sm", md: "md", lg: "lg" }} px="16px" py="14px">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap="10px">
              <Box
                w="28px"
                h="28px"
                borderRadius="10px"
                bg={main}
                position="relative"
              >
                <Box
                  position="absolute"
                  inset="7px"
                  border="2px solid white"
                  borderRadius="10px"
                  opacity={0.9}
                />
              </Box>
              <Text fontSize="20px" fontWeight="800" letterSpacing="-0.3px">
                동행복권
              </Text>
            </Flex>

            <Flex align="center" gap="10px">
              <Flex direction="column" align="center" gap="2px" color={gray500}>
                <FiUser size={20} />
                <Text fontSize="12px">로그인</Text>
              </Flex>

              <Flex direction="column" align="center" gap="2px">
                <IconButton
                  aria-label="전체메뉴"
                  icon={<HiBars3 size={20} />}
                  size="sm"
                  variant="solid"
                  bg="#C9F2E9"
                  color={main}
                  borderRadius="full"
                  _hover={{ bg: "#B7EADD" }}
                />
                <Text fontSize="12px" color={gray500}>
                  전체메뉴
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box bg={main}>
        <Container maxW={{ base: "100%", sm: "sm", md: "md", lg: "lg" }} px="16px" py="18px">
          <Text
            textAlign="center"
            color="white"
            fontSize="26px"
            fontWeight="900"
            letterSpacing="-0.6px"
          >
            구매복권 당첨결과
          </Text>
        </Container>
      </Box>

      <Container maxW={{ base: "100%", sm: "sm", md: "md", lg: "lg" }} px="16px" py="18px">
        <Box
          bg="white"
          borderRadius="16px"
          border="1px solid"
          borderColor="blackAlpha.100"
          boxShadow="0 10px 24px rgba(0,0,0,0.08)"
          p="18px"
        >
          <Text
            textAlign="center"
            fontSize="22px"
            fontWeight="900"
            letterSpacing="-0.6px"
          >
            {draw.title.split(" ").slice(0, 2).join(" ")}{" "}
            <Text as="span" color={main}>
              {draw.title.split(" ").slice(2).join(" ")}
            </Text>
          </Text>

          <Text
            textAlign="center"
            mt="6px"
            fontSize="14px"
            color="gray.600"
          >
            {draw.date}
          </Text>

          <Box mt="14px" borderTop="1px solid" borderColor="blackAlpha.100" />

          <Flex
            mt="16px"
            align="center"
            justify="center"
            gap="10px"
            flexWrap="wrap"
          >
            {draw.numbers.map((b) => (
              <BallChip key={b.value} value={b.value} tone={b.tone} />
            ))}

            <Text
              mx="4px"
              fontSize="22px"
              fontWeight="900"
              color="gray.400"
              lineHeight="1"
            >
              +
            </Text>

            <BallChip value={draw.bonus.value} tone={draw.bonus.tone} />
          </Flex>

          <Flex mt="10px" justify="space-between" gap="28px" color="gray.600" w={'100%'}>
            <Text fontSize="14px" pl={'50px'}>당첨번호</Text>
            <Text fontSize="14px" pr={'10px'}>보너스</Text>
          </Flex>
        </Box>

        <Box
          mt="16px"
          bg={gray200}
          borderRadius="16px"
          p="18px"
          border="1px solid"
          borderColor="blackAlpha.100"
          textAlign="center"
        >
          <Text fontSize="20px" fontWeight="900" mb="6px">
            축하합니다!
          </Text>

          <Text fontSize="18px" fontWeight="800">
            총{" "}
            <Text as="span" color={main} fontWeight="900">
              {draw.total}
            </Text>{" "}
            당첨
          </Text>

          <Text mt="14px" fontSize="14px" color={main} fontWeight="700">
            고객님이 구매하신 복권 구매 금액의 40% 이상이
            <br />
            쉽고 행복한 기부로 사용됩니다.
          </Text>
        </Box>

        <Text mt="14px" fontSize="12px" color="gray.500" lineHeight="1.5">
          - QR 당첨확인은 보조 확인수단이므로 반드시 실물과 대조하시기 바라며,
          당첨금은 실물 복권소지자에게 지급합니다.
        </Text>

        <Box mt="12px" h="1px" bg="blackAlpha.200" />
      </Container>

      <Box
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        bg="white"
        borderTop="1px solid"
        borderColor="blackAlpha.200"
      >
        <Container maxW={{ base: "100%", sm: "sm", md: "md", lg: "lg" }} px="16px" py="10px">
          <Flex align="center" justify="space-between">
            <Text fontWeight="800">A</Text>

            <Flex align="center" gap="12px">
              <Text fontWeight="900">1등당첨</Text>
              <Flex align="center" gap="6px">
                {draw.numbers.slice(0, 5).map((b) => (
                  <Circle
                    key={`mini-${b.value}`}
                    size="28px"
                    bg={
                      b.tone === "blue"
                        ? "#2F6BFF"
                        : b.tone === "red"
                          ? "#E53935"
                          : "#6B7280"
                    }
                    color="white"
                    fontSize="13px"
                    fontWeight="900"
                  >
                    {b.value}
                  </Circle>
                ))}
              </Flex>
            </Flex>

            <Circle size="44px" bg="blackAlpha.700" color="white">
              <FiChevronUp size={28} />
            </Circle>
          </Flex>
        </Container>
      </Box>

      <Box h="80px" />
    </Box>
  );
}