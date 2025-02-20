"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight, User } from "lucide-react"

type CardWithFormProps = {
  type: "login" | "signup" | "contact"
  onClose: () => void
}

export const CardWithForm = ({ type, onClose }: CardWithFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Submitting ${type} with email: ${email} and password: ${password}`)
    onClose()
  }

  const formConfig = {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account",
      buttonText: "Sign in",
    },
    signup: {
      title: "Create account",
      subtitle: "Sign up for a new account",
      buttonText: "Sign up",
    },
    contact: {
      title: "Get in touch",
      subtitle: "Send us a message",
      buttonText: "Send message",
    },
  }[type]

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">{formConfig.title}</h2>
        <p className="text-sm text-muted-foreground">{formConfig.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {type === "signup" && (
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10"
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        {type !== "contact" ? (
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        )}
        <Button type="submit" className="w-full mt-2" size="lg">
          {formConfig.buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  )
}

