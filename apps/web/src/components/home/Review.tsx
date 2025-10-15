import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

const Review = () => {
  // Transform reviews data to match InfiniteMovingCards format
  const reviewItems = reviews.map((review) => ({
    quote: review.quote,
    name: review.name,
    title: review.title,
    rating: review.rating,
  }));

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="relative">
          <InfiniteMovingCards
            items={reviewItems}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Review;
