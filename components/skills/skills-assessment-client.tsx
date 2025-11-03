"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Award, Brain, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "Marketing",
  "Sales",
  "Design",
  "Finance",
  "Operations",
]

export function SkillsAssessmentClient({ userId }: { userId: string }) {
  const [step, setStep] = useState<"select" | "assess" | "results">("select")
  const [category, setCategory] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [questions, setQuestions] = useState<any[]>([])
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const startAssessment = async (selectedCategory: string) => {
    setCategory(selectedCategory)

    // Generate AI questions
    const response = await fetch("/api/skills/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: selectedCategory, userId }),
    })

    if (response.ok) {
      const data = await response.json()
      setQuestions(data.questions)
      setStep("assess")
    } else {
      toast({
        title: "Error",
        description: "Failed to generate assessment",
        variant: "destructive",
      })
    }
  }

  const submitAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      evaluateAssessment()
    }
  }

  const evaluateAssessment = async () => {
    const response = await fetch("/api/skills/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        category,
        questions,
        answers,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      setResults(data)
      setStep("results")
    }
  }

  if (step === "select") {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Skills Assessment</h1>
            <p className="text-muted-foreground text-lg">
              Take an AI-powered assessment to showcase your skills and earn verified badges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => startAssessment(cat)}
              >
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-semibold text-lg">{cat}</h3>
                    <p className="text-sm text-muted-foreground">20 min • 10 questions</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === "assess" && questions.length > 0) {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {question.type === "multiple-choice" ? (
                <RadioGroup onValueChange={(value) => submitAnswer(value)}>
                  {question.options.map((option: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    rows={6}
                    onChange={(e) => setAnswers({ ...answers, [currentQuestion]: e.target.value })}
                  />
                  <Button onClick={() => submitAnswer(answers[currentQuestion] || "")}>
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Submit Assessment"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "results" && results) {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Award className="h-20 w-20 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
            <p className="text-muted-foreground text-lg">
              You scored {results.score}/100 in {category}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(results.breakdown).map(([skill, score]: [string, any]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="text-muted-foreground">{score}/100</span>
                    </div>
                    <Progress value={score} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4">
            <Button onClick={() => (window.location.href = "/profile")} className="flex-1">
              View on Profile
            </Button>
            <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
              Take Another Assessment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
