import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Trophy, MessageSquare, Plus, Loader2 } from "lucide-react";
import { Flavor, Review } from "@shared/schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "@/components/StarRating";
import { Link } from "wouter";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

export default function FlavorDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: flavor, isLoading: flavorLoading } = useQuery<Flavor>({
    queryKey: ["/api/flavors", id],
    queryFn: async () => {
      const response = await api.get(`flavors/${id}`);
      return response.data;
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews/flavor", id],
    queryFn: async () => {
      const response = await api.get(`reviews/flavor/${id}`);
      return response.data;
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: async (data: { flavorId: string; rating: number; comment: string }) => {
      const response = await api.post("reviews", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flavors", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/reviews/flavor", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/profile"] });
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(5);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit review");
    },
  });

  const addToProfileMutation = useMutation({
    mutationFn: async (flavorId: string) => {
      const response = await api.put("users/profile", { addFlavorId: flavorId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users/profile"] });
      toast.success("Added to your tried flavors!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add to profile");
    },
  });

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please add a comment");
      return;
    }
    submitReviewMutation.mutate({ flavorId: id!, rating, comment });
  };

  if (flavorLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-neon-green" />
      </div>
    );
  }

  if (!flavor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Flavor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-[1920px] mx-auto px-20 py-12">
        <Link href="/catalog">
          <Button variant="ghost" className="mb-8 hover:text-neon-green" data-testid="button-back">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Catalog
          </Button>
        </Link>

        <div className="grid grid-cols-5 gap-12">
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-32">
              <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-card-border bg-card mb-6">
                <img
                  src={flavor.imageUrl}
                  alt={flavor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-neon-green to-neon-lime text-black font-bold hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]"
                onClick={() => addToProfileMutation.mutate(flavor._id)}
                disabled={addToProfileMutation.isPending || !isAuthenticated}
                data-testid="button-add-to-profile"
              >
                {addToProfileMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="mr-2 w-4 h-4" />
                    Add to Tried Flavors
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="col-span-3 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded border border-neon-green/30 font-medium">
                  {flavor.category}
                </span>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-neon-green" />
                  <span className="text-2xl font-bold text-neon-green">
                    {flavor.avgRating > 0 ? flavor.avgRating.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>

              <h1 className="text-5xl font-display font-bold mb-4">{flavor.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{flavor.description}</p>

              <div className="flex items-center gap-6 p-6 bg-card rounded-lg border border-card-border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green">{flavor.totalReviews}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div className="border-l border-border h-12" />
                <div>
                  <StarRating rating={Math.round(flavor.avgRating)} readonly size="lg" />
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-card-border">
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-neon-green" />
                Write a Review
              </h3>

              {isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Rating</label>
                    <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea
                      placeholder="Share your experience with this flavor..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-32 bg-input border-border focus:border-neon-green"
                      data-testid="textarea-review"
                    />
                  </div>

                  <Button
                    onClick={handleSubmitReview}
                    disabled={submitReviewMutation.isPending}
                    className="bg-gradient-to-r from-neon-green to-neon-lime text-black font-bold hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]"
                    data-testid="button-submit-review"
                  >
                    {submitReviewMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Please login to write a review</p>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-6">
                Reviews ({reviews.length})
              </h3>
              <div className="space-y-4">
                {reviewsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
                  </div>
                ) : reviews.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <motion.div
                      key={review._id}
                      className="bg-card p-6 rounded-lg border border-card-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      data-testid={`review-${review._id}`}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-neon-green to-neon-lime text-black font-bold">
                            {review.username?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-bold">{review.username || "Anonymous"}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(review.createdAt), "MMM dd, yyyy")}
                              </p>
                            </div>
                            <StarRating rating={review.rating} readonly size="sm" />
                          </div>
                          <p className="text-foreground/90">{review.comment}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
