import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useCreateCharacterMutation } from "../../generated/graphql";

interface characterProps {}

const Character: React.FC<characterProps> = ({}) => {
  const [createCharacter] = useCreateCharacterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ romaji: "", text: "", type: "" }}
        onSubmit={async (values) => {
          const response = await createCharacter({
            variables: { input: values },
          });
          router.push("/hiragana");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="romaji" placeholder="romaji" label="Romaji" />
            <Box mt={4}>
              <InputField name="text" placeholder="text" label="Text" />
            </Box>
            <Box mt={4}>
              <InputField name="type" placeholder="type" label="Type" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create character
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Character;
