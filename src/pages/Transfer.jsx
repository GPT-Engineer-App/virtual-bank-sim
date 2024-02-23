import { Button, Container, Flex, Heading, Input, Select, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAccounts } from "../context/AccountsContext";

const Transfer = () => {
  const { accounts, transfer } = useAccounts();
  const [fromAccount, setFromAccount] = useState(Object.keys(accounts)[0]);
  const [toAccount, setToAccount] = useState(Object.keys(accounts)[1]);
  const [amount, setAmount] = useState("");
  const toast = useToast();

  const handleTransfer = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to transfer.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (numAmount > accounts[fromAccount]) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds in the source account to transfer.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      transfer(fromAccount, toAccount, numAmount);
      toast({
        title: "Success",
        description: `Transferred $${numAmount.toFixed(2)} from ${fromAccount} to ${toAccount}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setAmount("");
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h1" size="xl">
          Transfer Funds
        </Heading>
      </Flex>
      <Stack spacing={4}>
        <Select placeholder="From account" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}>
          {Object.keys(accounts).map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </Select>
        <Select placeholder="To account" value={toAccount} onChange={(e) => setToAccount(e.target.value)}>
          {Object.keys(accounts).map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </Select>
        <Input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
        <Button colorScheme="blue" onClick={handleTransfer} isDisabled={!amount}>
          Transfer
        </Button>
      </Stack>
    </Container>
  );
};

export default Transfer;
