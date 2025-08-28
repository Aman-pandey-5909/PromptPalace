'use client'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Phone, User, Mail } from "lucide-react"


const MobileCard = ({ onSuccess }) => {
  const form = useForm({
    defaultValues: {
      mobileno: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("info");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LINK}/updatedetails`,
        data,
        { withCredentials: true }
      );

      setVariant("success");
      setMessage("Mobile number linked successfully.");
      onSuccess && onSuccess(data.mobileno);
      // keep message visible a bit
    } catch (error) {
      // console.error(error);
      setVariant("danger");
      setMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          Link Mobile Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Add your phone to secure your account and enable 2FA / SMS features.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <FormField
              control={form.control}
              name="mobileno"
              rules={{
                required: "Mobile number is required",
                minLength: { value: 10, message: "Enter a valid number" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Mobile</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
                      <Input
                        type="tel"
                        placeholder="90000 00000"
                        {...field}
                        className="rounded-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {message && (
              <div
                className={cn(
                  "mt-4 px-4 py-2 rounded-md text-sm",
                  variant === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                )}
              >
                {message}
              </div>
            )}

            <CardFooter className="mt-4 p-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Linking..." : "Link Number"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MobileCard