import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { PasswordInput } from "./ui/password-input";
import LoaderComponent from "./loader";
import { login } from "@/api/users";

export default function Login() {
  const { setToken } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: (response) => {
      setToken(response.token);
    },
    onError: (response) => {
      //@ts-ignore
      toast.error(response.response.data.error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      toast.error("Please enter a username and password");
      return;
    }
    loginMutation.mutate();
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="h-full max-h-[calc(88vh-4rem)] w-full p-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login at AI Zustack</CardTitle>
            <CardDescription>
              To generate images at AI Zustack you need to login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="text"
                    placeholder="ai.zustack"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <PasswordInput
                    required
                    id="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  disabled={loginMutation.isPending}
                  type="submit"
                  className="w-full"
                >
                  {loginMutation.isPending && <LoaderComponent />}
                  Login
                </Button>
              </div>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="mailto:ai@zustack.com"
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                Request one here.
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
