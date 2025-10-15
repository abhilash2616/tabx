export interface Review {
  id: string;
  quote: string;
  name: string;
  title: string;
  rating: number;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    quote: "This product has completely transformed my workflow. The quality is exceptional and the customer service is outstanding. I couldn't be happier with my purchase!",
    name: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    rating: 5,
  },
  {
    id: "2",
    quote: "Amazing experience from start to finish. The team was professional, responsive, and delivered exactly what they promised. Highly recommend to anyone looking for quality solutions.",
    name: "Michael Chen",
    title: "CEO at StartupXYZ",
    rating: 5,
  },
  {
    id: "3",
    quote: "Outstanding service and incredible attention to detail. They went above and beyond to ensure everything was perfect. Will definitely be using their services again!",
    name: "Emily Rodriguez",
    title: "Creative Director at DesignStudio",
    rating: 5,
  },
  {
    id: "4",
    quote: "The best investment I've made for my business. The results speak for themselves - increased efficiency, better outcomes, and a team that truly cares about your success.",
    name: "David Thompson",
    title: "Founder at InnovateLab",
    rating: 5,
  },
  {
    id: "5",
    quote: "Professional, reliable, and innovative. They understand the market and deliver solutions that actually work. Couldn't ask for a better partner!",
    name: "Lisa Wang",
    title: "CTO at DataFlow",
    rating: 5,
  },
  {
    id: "6",
    quote: "Exceptional quality and service. The team's expertise is evident in every interaction. They've helped us achieve goals we never thought possible.",
    name: "James Wilson",
    title: "VP of Operations at GlobalTech",
    rating: 5,
  },
  {
    id: "7",
    quote: "A game-changer for our organization. The implementation was smooth, the results were immediate, and the ongoing support has been fantastic.",
    name: "Maria Garcia",
    title: "Head of Marketing at BrandCo",
    rating: 5,
  },
  {
    id: "8",
    quote: "Top-notch service with a personal touch. They took the time to understand our unique needs and delivered a solution that exceeded our expectations.",
    name: "Robert Kim",
    title: "Director at FinanceFirst",
    rating: 5,
  },
];
