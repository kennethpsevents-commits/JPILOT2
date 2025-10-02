"use client"

import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

interface Review {
  id: string
  author: string
  role: string
  rating: number
  date: string
  title: string
  pros: string
  cons: string
  verified: boolean
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Current Employee",
    role: "Senior Software Engineer",
    rating: 5,
    date: "2 weeks ago",
    title: "Great place for career growth",
    pros: "Excellent work-life balance, innovative projects, supportive management, and great learning opportunities.",
    cons: "Office can get busy during peak hours, but remote work is always an option.",
    verified: true,
  },
  {
    id: "2",
    author: "Former Employee",
    role: "Product Manager",
    rating: 4,
    date: "1 month ago",
    title: "Solid company with good culture",
    pros: "Strong team collaboration, competitive salary, modern tech stack, and flexible working hours.",
    cons: "Some processes could be more streamlined, decision-making can be slow at times.",
    verified: true,
  },
  {
    id: "3",
    author: "Current Employee",
    role: "Frontend Developer",
    rating: 5,
    date: "3 weeks ago",
    title: "Best decision of my career",
    pros: "Amazing colleagues, cutting-edge technology, great benefits package, and truly values work-life balance.",
    cons: "High expectations, but that pushes you to grow professionally.",
    verified: true,
  },
]

export function EmployeeInsights() {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(averageRating) ? "text-yellow-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Overall Rating</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">92%</div>
          <p className="text-sm text-muted-foreground">Would Recommend</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">4.6</div>
          <p className="text-sm text-muted-foreground">Work-Life Balance</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">4.8</div>
          <p className="text-sm text-muted-foreground">Career Growth</p>
        </Card>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">{review.author[0]}</span>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {review.verified && (
                      <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold">Verified</span>
                    )}
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="font-semibold mb-3">{review.title}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-semibold text-accent">Pros: </span>
                    <span className="text-sm text-muted-foreground">{review.pros}</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary">Cons: </span>
                    <span className="text-sm text-muted-foreground">{review.cons}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
