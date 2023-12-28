<script setup>
  import { useAccount } from 'use-wagmi'

  const { address } = useAccount()
  
  console.log('use-wagmi address: ', address.value)
</script>

<template>
  <w3m-button />
</template>

<style>
  body{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #141414;
  }
</style>
