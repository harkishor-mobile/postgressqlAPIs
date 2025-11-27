export interface GetUsersPaginatedParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string; // format: "field:asc" or "field:desc"
  excludeUserId?: number; // ID to exclude from results
}

// Create product types
export type CreateProductInput = {
  name: string;
  description?: string;
  price: number;
  images: string[]; //  ARRAY OF IMAGES
  createdById: number;
};

// Update product types
export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  images?: string[]; // optional array of images
};
