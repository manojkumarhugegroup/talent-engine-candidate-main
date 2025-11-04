"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CandidateProfileForm } from "./Candidate-profile-form";
import Image from "next/image";

export function WelcomeScreen() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <CandidateProfileForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-[calc(100vh-48px)] bg-(--bg-profile) flex items-center justify-center p-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="relative mb-8 text-center flex items-center justify-center">
          <Image
            src="/assets/icons/create-candidate.svg"
            alt="create-candidate"
            width={200}
            height={200}
          />
        </div>

        {/* Content */}
        <div className="mb-8 space-y-4">
          <p className="text-(--create-text) text-sm w-11/12">
            {` Welcome! Let's get you started with your candidate profile. This
            will help recruiters find you and match you to the best
            opportunities in the industry.`}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => setShowForm(true)}
          className="bg-(--interview) hover:bg-(--interview) text-white px-6 py-2 rounded-md"
        >
          Create new profile
        </Button>
      </div>
    </div>
  );
}
