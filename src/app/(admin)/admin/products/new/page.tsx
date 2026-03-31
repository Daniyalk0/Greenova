"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createProduct, uploadProductImage } from "../actions";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Category } from "@prisma/client";
import ProductForm from "../components/ProductForm";

type ImageMode = "url" | "upload";

export type SubCategory =
  | "freshFruits"
  | "exoticFruits"
  | "dryFruit"
  | "leafyGreens"
  | "rootVegetables"
  | "herbs"
  | "organicVegetables";



type ProductFormValues = {
  name: string;
  slug: string;
  subCategory?: SubCategory;
  imageUrl: string;
  description?: string;

  basePricePerKg: number;
  availableWeights: number[];


  calories?: number;
  fat?: number;
  sugar?: number;
  carbohydrates?: number;
  protein?: number;

  discount?: number;
  rating?: number;

  inStock: boolean;
  isActive: boolean;
  isFeatured: boolean;

  season: "ALL" | "SUMMER" | "WINTER" | "MONSOON";
  category: Category | "";
};


export default function NewProductPage()
 {

  return (

    <ProductForm
      mode="create"

      submitLabel="Create Product"
    />
  );
}
