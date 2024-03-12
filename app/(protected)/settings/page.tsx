"use client";

import { SettingsContent } from "@/components/Settings";
import CardWrapper from "@/components/auth/card-wrapper";

export default function Settings() {
  return (
    <div>
      <CardWrapper
        cardTitle="Settings"
        social={false}
        cardContent={<SettingsContent />}
      />
    </div>
  );
}
