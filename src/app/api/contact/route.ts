import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or save to DB here
    console.log("Contact form payload received:", result.data);

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. A member of our research team will reach out soon.",
      request_id: `req_${crypto.randomUUID()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
