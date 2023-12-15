export interface ReviewFormValues {
  comment: string;
  rating: number;
}

export interface Review extends ReviewFormValues {
  id: string;
  date: string;
  user: string;
}
