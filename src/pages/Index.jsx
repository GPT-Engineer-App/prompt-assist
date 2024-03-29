import React, { useState } from "react";
import { Box, Heading, Text, Textarea, Button, useToast, OrderedList, ListItem, Link } from "@chakra-ui/react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const toast = useToast();

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      toast({
        title: "An error occurred.",
        description: "Unable to enhance prompt. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    const data = await response.json();
    setOutput(data.output);
    setLoading(false);
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={8} p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        GPT Prompt Assistant
      </Heading>

      <Text fontSize="xl" mb={4}>
        Enter your prompt below and our AI assistant will help take it to the next level:
      </Text>

      <Textarea value={prompt} onChange={handlePromptChange} placeholder="Enter your prompt here..." size="lg" mb={4} />

      <Button colorScheme="blue" size="lg" onClick={handleSubmit} isLoading={loading} loadingText="Enhancing...">
        Enhance Prompt
      </Button>

      {output && (
        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4}>
            Enhanced Prompt:
          </Heading>
          <Text fontSize="lg" mb={4} whiteSpace="pre-wrap">
            {output}
          </Text>
          <Heading as="h2" size="lg" mb={4}>
            Tips for Great Prompts
          </Heading>
          <OrderedList spacing={2}>
            <ListItem>Be specific and descriptive</ListItem>
            <ListItem>Provide context and background information</ListItem>
            <ListItem>Use clear and concise language</ListItem>
            <ListItem>Ask for the format and structure you want</ListItem>
            <ListItem>Provide examples of what you're looking for</ListItem>
          </OrderedList>
          <Text mt={4}>
            For more tips, check out{" "}
            <Link color="blue.500" href="https://www.example.com/prompt-guide" isExternal>
              our guide to writing great prompts
            </Link>
            .
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Index;
