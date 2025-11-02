import { z } from "zod";

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  triedFlavors: string[];
  achievements: string[];
  stats: {
    totalTried: number;
    totalReviews: number;
    avgRating: number;
  };
}

export interface Flavor {
  _id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  avgRating: number;
  totalReviews: number;
}

export interface Review {
  _id: string;
  userId: string;
  flavorId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  username?: string;
}

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const reviewSchema = z.object({
  flavorId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
