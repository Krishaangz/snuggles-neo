import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { measurements, babyAge } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a pediatric growth analysis AI that strictly follows WHO Child Growth Standards. 
    
CRITICAL RULES:
1. Base ALL analysis on WHO Child Growth Standards charts and percentiles
2. Reference CDC growth charts for US-specific data when relevant
3. Consider age-specific growth patterns and milestones
4. Provide percentile rankings when possible
5. Flag concerning trends (sudden drops/spikes, consistent below 3rd percentile)
6. Always cite WHO/CDC standards in your analysis

Analyze growth data and provide:
- Current growth assessment with WHO percentile rankings
- Growth velocity analysis (is baby growing at expected rate?)
- Comparison to WHO standards for age and sex
- Specific concerns or red flags
- Actionable recommendations for parents
- When to consult pediatrician

Be precise, evidence-based, and reassuring when appropriate.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this growth data for a ${babyAge}-month-old baby: ${JSON.stringify(measurements)}. Provide detailed analysis based on WHO standards.` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Growth analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
