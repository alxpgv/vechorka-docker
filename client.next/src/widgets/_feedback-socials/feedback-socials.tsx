import React, { useRef } from "react";
import { FormFeedback } from "@/widgets/_feedback-socials/form-feedback";
import { SocialLinks } from "@/widgets/_feedback-socials/social-links";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

export const FeedbackSocials = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useIntersectionObserver(ref, { freezeOnceVisible: true });

  return (
    <div className="flex flex-col md:flex-row mt-6 md:mt-12" ref={ref}>
      <div className="w-full md:flex-1 px-5 py-6 sm:px-8 sm:py-10 md:mr-6 lg:mr-12 bg-blue-200">
        <FormFeedback />
      </div>
      <div className="w-full p-8 md:w-[280px] bg-grey-100 mt-6 md:mt-0">
        <SocialLinks />
      </div>
    </div>
  );
};
