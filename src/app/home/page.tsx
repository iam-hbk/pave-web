"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeComponent from "@/components/clients/home";
type Props = {};

const queryClient = new QueryClient();

function Home({}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeComponent />;
    </QueryClientProvider>
  );
}

export default Home;
