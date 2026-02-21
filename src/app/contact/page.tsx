"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Mail, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  role: z.string().min(1, "Please select a role"),
  useCase: z.string().min(1, "Please select a use case"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge this is a prototype",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      role: "",
      useCase: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    try {
      await api.submitContact(values);
      setIsSuccess(true);
      form.reset();
      toast("Message Sent Successfully", {
        description: "Thank you for reaching out. A team member will contact you soon."
      });
    } catch (error: any) {
      toast("Error", {
        description: error.message || "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
          <Mail className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Request Received</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for exploring the BioAuth capstone concept. Your message has been simulated successfully.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-8 border-border/40">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card className="bg-card/40 border-border/40 shadow-xl shadow-black/20">
        <CardHeader className="text-center pb-8 border-b border-border/40">
          <CardTitle className="text-3xl font-bold tracking-tight">Contact Us</CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2">
            Request an in-depth code walkthrough or discuss research collaboration.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="bg-background/50 border-border/40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@example.com" className="bg-background/50 border-border/40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="University or Company" className="bg-background/50 border-border/40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 border-border/40">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Student">Student / Academic</SelectItem>
                          <SelectItem value="Researcher">Researcher</SelectItem>
                          <SelectItem value="Engineer">Software Engineer</SelectItem>
                          <SelectItem value="Product">Product Manager</SelectItem>
                          <SelectItem value="Security">Security Professional</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="useCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Interest *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-border/40">
                          <SelectValue placeholder="Select primary interest" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Information</SelectItem>
                        <SelectItem value="Technical Walkthrough">Technical Architecture Walkthrough</SelectItem>
                        <SelectItem value="Partnership">Partnership / Integration</SelectItem>
                        <SelectItem value="Academic">Academic Research Data</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us more about your interest in BioAuth..." 
                        className="bg-background/50 border-border/40 min-h-[120px] resize-y" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border/40 bg-muted/20 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Prototype Acknowledgement
                      </FormLabel>
                      <FormDescription className="text-xs">
                        I understand that BioAuth is a research/capstone prototype and operates functionally as a demonstration without production-grade PII storage.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full font-semibold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
