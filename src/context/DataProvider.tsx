import React, { createContext, useContext, useState } from "react";
import { CandidateDataType } from "@/types/salay-negotations";
import { OrderDataType } from "@/types/offer";
import { ResSingleCandidateData } from "@/types/profile";
import { countryType, currenciesType, LocationType } from "@/types/get.type";
import {
  ApplicationStatus,
  Job,
  InterviewData,
  Actionable,
} from "@/types/dasboard";
import { VersionItem } from "@/types/profile-history";
import { TimesheetData } from "@/types/timesheet.type";

interface DataContextType {
  candidateData: CandidateDataType | null;
  singleCandidate: ResSingleCandidateData[];
  orderData: OrderDataType | null;
  location: LocationType[];
  currency: currenciesType[];
  country: countryType[];
  recommendedJobs: Job[];
  applicationStatus: ApplicationStatus[];
  scheduledInterview: InterviewData[];
  actionables: Actionable[];
  historyData: VersionItem[];
  contract: TimesheetData[];
  fetchCandidateData: () => void;
  fetchOrderData: () => void;
  fetchSingleCandidate: (versionId?: string | null) => Promise<void>;
  fetchLocation: () => void;
  fetchCurrency: () => void;
  fetchRecommendedJobs: () => void;
  fetchApplicationStatus: (user_id?: string | null) => Promise<void>;
  fetchScheduledInterview: () => void;
  fetchActionables: () => void;
  fetchHistory: () => void;
  fetchCountry: () => void;
  fetchContract: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidateData, setCandidateData] = useState<CandidateDataType | null>(
    null
  );
  const [orderData, setOrderData] = useState<OrderDataType | null>(null);
  const [singleCandidate, setSingleCandidate] = useState<
    ResSingleCandidateData[]
  >([]);
  const [location, setLocation] = useState<LocationType[]>([]);
  const [currency, setCurrency] = useState<currenciesType[]>([]);
  const [country, setCountry] = useState<countryType[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<
    ApplicationStatus[]
  >([]);
  const [scheduledInterview, setScheduledInterview] = useState<InterviewData[]>(
    []
  );
  const [actionables, setActionables] = useState<Actionable[]>([]);
  const [historyData, setHistoryData] = useState<VersionItem[]>([]);
  const [contract, setContract] = useState<TimesheetData[]>([]);

  const fetchSingleCandidate = async (versionId?: string | null) => {
    try {
      const url = `/api/candidate/get?user_id=${versionId}`;

      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSingleCandidate([data]);
    } catch {
      setSingleCandidate([]);
    }
  };

  const fetchRecommendedJobs = async () => {
    try {
      const response = await fetch(`/api/candidate/recommended-jobs`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendedJobs(data.message?.data);
    } catch {
      setRecommendedJobs([]);
    }
  };
  const fetchApplicationStatus = async (user_id?: string | null) => {
    try {
      const response = await fetch(
        `/api/candidate/job-application?candidate_id=${user_id}`,
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApplicationStatus(data.message?.data || []);
    } catch {
      setApplicationStatus([]);
    }
  };
  const fetchScheduledInterview = async () => {
    try {
      const response = await fetch(`/api/candidate/scheduled-interview`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setScheduledInterview(data.data);
    } catch {
      setScheduledInterview([]);
    }
  };
  const fetchActionables = async () => {
    try {
      const response = await fetch(`/api/candidate/actionables`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setActionables(data);
    } catch {
      setActionables([]);
    }
  };
  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/candidate/history`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHistoryData(data.versions);
    } catch {
      setHistoryData([]);
    }
  };

  const fetchCandidateData = async () => {
    try {
      const response = await fetch("/api/jobs/salary", {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCandidateData(data);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      setCandidateData(null);
    } finally {
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch("/api/jobs/offer", {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      setOrderData(null);
    } finally {
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await fetch(`/api/masters/location`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLocation(data.data);
      // setLocation(data);
    } catch {
      setLocation([]);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch(`/api/masters/currency`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrency(data.data);
    } catch {
      setCurrency([]);
    }
  };
  const fetchCountry = async () => {
    try {
      const response = await fetch(`/api/masters/country`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountry(data);
    } catch {
      setCountry([]);
    }
  };

  const fetchContract = async () => {
    try {
      const response = await fetch(`/api/candidate/contract`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setContract(data);
    } catch {
      setContract([]);
    }
  };
  const value: DataContextType = {
    location,
    currency,
    candidateData,
    singleCandidate,
    orderData,
    recommendedJobs,
    applicationStatus,
    scheduledInterview,
    actionables,
    historyData,
    country,
    contract,
    fetchCandidateData,
    fetchOrderData,
    fetchSingleCandidate,
    fetchLocation,
    fetchCurrency,
    fetchRecommendedJobs,
    fetchApplicationStatus,
    fetchScheduledInterview,
    fetchActionables,
    fetchHistory,
    fetchCountry,
    fetchContract,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext must be used within a DataProvider");
  return context;
};
