import { Box, Button, Container, Divider, Flex, Heading, Input, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { FaMoneyBillAlt, FaPiggyBank, FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useAccounts } from "../context/AccountsContext";

const Index = () => {
  const { accounts, deposit, withdraw } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState(Object.keys(accounts)[0]);
  const [amount, setAmount] = useState("");
  const toast = useToast();

  // Remove the entire old Index function declaration along with its logic

  const handleDeposit = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      deposit(selectedAccount, numAmount);
      toast({
        title: "Success",
        description: `Deposited $${numAmount.toFixed(2)}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setAmount("");
  };

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0 && numAmount <= accounts[selectedAccount]) {
      withdraw(selectedAccount, numAmount);
      toast({
        title: "Success",
        description: `Withdrew $${numAmount.toFixed(2)}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (numAmount > accounts[selectedAccount]) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to withdraw.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        status: "error",
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
          Online Bank <FaPiggyBank />
        </Heading>
        <FaUserCircle size="3rem" />
      </Flex>
      <Divider my={4} />
      <Box>
        <Flex alignItems="center" justifyContent="space-between" mb={8}>
          <Select placeholder="Select account" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
            {Object.keys(accounts).map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </Select>
          <Text fontSize="2xl" fontWeight="bold">
            ${accounts[selectedAccount].toFixed(2)}
          </Text>
        </Flex>
        <Stack spacing={4}>
          <Input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" focusBorderColor="green.400" />
          <Button leftIcon={<FaMoneyBillAlt />} colorScheme="green" onClick={handleDeposit} isDisabled={!amount}>
            Deposit
          </Button>
          <Button leftIcon={<FaMoneyBillAlt />} colorScheme="red" onClick={handleWithdraw} isDisabled={!amount}>
            Withdraw
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Index;
