import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BackButton from "./BackButton";
import Social from "./Social";
import Header from "../ui/Header";
export default function CardWrapper({
  cardTitle,
  cardContent,
  social,
  backButton,
}: {
  cardTitle?: string;
  cardContent: React.ReactNode;
  social: boolean;
  backButton?: { label: string; link: string } | undefined;
}) {
  return (
    <Card className={"flex w-fit flex-col items-center"}>
      {cardTitle && (
        <CardHeader>
          <Header>{cardTitle}</Header>
        </CardHeader>
      )}
      <CardContent>{cardContent}</CardContent>
      {social && (
        <CardFooter>
          {" "}
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {backButton && (
          <BackButton link={backButton.link}>{backButton.label}</BackButton>
        )}
      </CardFooter>
    </Card>
  );
}
