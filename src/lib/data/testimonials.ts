export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with NIXAR has been a game changer for RunMyProcess. Their creativity, strategic approach and hands on support has been invaluable to our growth and innovation.",
    author: "Sebastian Ardilla",
    role: "Director of User Experience",
    company: "RunMyProcess",
    rating: 5,
  },
  {
    quote:
      "As someone who has been in the industry for a long time I have always seemed the best for my business. Working with NIXAR has been a game changer for my business and helped us bring in so many new customers. Completely transformed my online presence.",
    author: "Qassam Tariq",
    role: "Owner",
    company: "Tire Wheel Center",
    rating: 5,
  },
  {
    quote:
      "Completely transformed our website and online presence and helped us look so much more professional. They worked with us every step of the way to make sure it came out to my team and I's desired result. Couldn't be more happy!",
    author: "Rick Lokken",
    role: "Owner",
    company: "SYB Builders",
    rating: 5,
  },
];
