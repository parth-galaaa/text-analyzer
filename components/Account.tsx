import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CardWithForm({ type }: { type: "login" | "signup" | "contact" }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{type === "login" ? "Login" : type === "signup" ? "Sign Up" : "Contact Us"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Sign in with your credentials"
            : type === "signup"
              ? "Create a new account"
              : "Get in touch with us"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {type === "login" && (
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username here" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password here" />
              </div>
            </div>
          </form>
        )}
        {type === "signup" && (
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter email here" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password here" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Re-enter Password</Label>
                <Input id="confirm-password" type="password" placeholder="Re-enter password here" />
              </div>
            </div>
          </form>
        )}
        {type === "contact" && (
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Input id="message" placeholder="Enter your message" />
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>{type === "login" ? "Login" : type === "signup" ? "Sign Up" : "Submit"}</Button>
      </CardFooter>
    </Card>
  );
}
