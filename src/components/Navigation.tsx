import React from "react";
import NextLink from "next/link";
import { Avatar, Box, Button, Flex, Link, List } from "@chakra-ui/react";
import { useLougoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const { loading, error, data } = useMeQuery();
  const [logout] = useLougoutMutation();
  const router = useRouter();

  let user;
  if (loading) {
    user = <div>loading...</div>;
  } else if (!data?.me) {
    user = (
      <>
        <NextLink href="/register">
          <Button ml={2} variant="solid" size="sm" colorScheme="teal">
            Register
          </Button>
        </NextLink>
        <NextLink href="/login">
          <Button ml={2} variant="outline" size="sm" colorScheme="teal">
            Login
          </Button>
        </NextLink>
      </>
    );
  } else {
    user = (
      <Flex alignItems="center">
        <Avatar
          size="sm"
          colorScheme="teal"
          mr={2}
          src={`https://d1u1mce87gyfbn.cloudfront.net/hero/${data.me.username}/icon-portrait.png`}
        ></Avatar>
        <Box mr={4} fontWeight="bold" color="gray">
          {data.me.username}
        </Box>
        <Button
          size="sm"
          onClick={async () => {
            await logout();
            router.reload();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" p={4}>
      <Box mr="auto">
        <nav>
          <List>
            <Flex>
              <li>
                <NextLink href="/">
                  <Link mr={2}>Home</Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/hiragana">
                  <Link mr={2}>Hiragana</Link>
                </NextLink>
              </li>
            </Flex>
          </List>
        </nav>
      </Box>
      <Box>{user}</Box>
    </Flex>
  );
};
