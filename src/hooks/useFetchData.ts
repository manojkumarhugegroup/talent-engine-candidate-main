"use client";

import { useState, useEffect } from "react";

interface UseFetchDataProps<T> {
  apiUrl: string;
  setData: (data: T | null) => void;
  setLoading?: (loading: boolean) => void;
  autoFetch?: boolean; // fetch automatically on mount
}

export function useFetchData<T>({
  apiUrl,
  setData,
  setLoading,
  autoFetch = true,
}: UseFetchDataProps<T>) {
  const fetchData = async () => {
    if (setLoading) setLoading(true);

    try {
      const res = await fetch(apiUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data: T = await res.json();
      setData(data ?? null);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setData(null);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [apiUrl]); // re-fetch if URL changes

  return { fetchData };
}
