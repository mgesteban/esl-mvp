import OpenAI from 'openai';
import { LessonPrompt, GeneratedLesson } from '../types/lesson';

const SYSTEM_PROMPT = `You are an experienced ESL teacher creating lesson content.
Generate a structured lesson plan with the following sections.
Do not use any markdown formatting, asterisks, or bullet points.

1. Reading passage (150-200 words)
2. 5 comprehension questions (number them 1-5)
3. 10 key vocabulary words (one per line)
4. 2-3 student activities (number them 1-3)
5. Teacher notes with objectives and timing

Use plain text only. Do not use any special characters or formatting.`;

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // For client-side usage
    });
  }

  async generateLesson(prompt: LessonPrompt): Promise<GeneratedLesson> {
    try {
      const userPrompt = `
        Create an ESL lesson plan for ${prompt.level} level students.
        Topic: ${prompt.topic}
        Duration: ${prompt.duration} minutes
        
        Please provide the lesson plan in a clear, structured format.`;

      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7
      });

      const response = completion.choices[0].message.content;
      if (!response) throw new Error('No response from OpenAI');

      return this.parseResponse(response, prompt);
    } catch (error) {
      console.error('Error generating lesson:', error);
      throw new Error('Failed to generate lesson plan');
    }
  }

  private parseResponse(response: string, prompt: LessonPrompt): GeneratedLesson {
    // Split into sections and clean up any remaining special characters
    const sections = response.split('\n\n');
    
    const cleanText = (text: string) => {
      return text.replace(/[*\-_]/g, '').trim();
    };
    
    return {
      reading: {
        passage: cleanText(sections[0] || ''),
        questions: sections[1]?.split('\n')
          .map(q => cleanText(q))
          .filter(q => q.length > 0) || [],
        vocabulary: sections[2]?.split('\n')
          .map(v => cleanText(v))
          .filter(v => v.length > 0) || []
      },
      activities: {
        instructions: sections[3]?.split('\n')
          .map(a => cleanText(a))
          .filter(a => a.length > 0) || []
      },
      teacherNotes: {
        objectives: sections[4]?.split('\n')
          .map(n => cleanText(n))
          .filter(n => n.length > 0) || [],
        timing: { 'total': prompt.duration }
      }
    };
  }
}
