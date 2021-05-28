import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { useCharactersQuery } from "../generated/graphql";

interface hiraganaProps {}

const hiragana: React.FC<hiraganaProps> = ({}) => {
  const { data } = useCharactersQuery();

  return (
    <Layout>
      <Flex justifyContent="center" maxWidth="27ch" mx="auto" flexWrap="wrap">
        {data?.characters.map((char) => (
          <Flex key={char.id} m={2} flexDir="column" alignItems="center">
            <Box fontWeight="light" fontSize="3xl">
              {char.text}
            </Box>
            <Box textColor="blackAlpha.600" fontWeight="medium">
              {char.romaji}
            </Box>
          </Flex>
        ))}
      </Flex>
      <Flex justifyContent="center">
        <NextLink href="/create/character">
          <Button mt={2} variant="solid" size="sm" colorScheme="teal">
            new
          </Button>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default hiragana;
