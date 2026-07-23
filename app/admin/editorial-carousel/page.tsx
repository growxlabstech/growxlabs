import React from "react";
import { EditorialCarouselClient } from "@/components/shared/EditorialCarouselClient";

export async function generateMetadata() {
  return {
    title: "Editorial Carousel Creator | GrowXLabs Admin",
    description: "Premium Figma/Canva-like content creator for GrowXLabs LinkedIn & Instagram carousels with fixed and free layout modes."
  };
}

export default async function EditorialCarouselPage() {
  return <EditorialCarouselClient />;
}
