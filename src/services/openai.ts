import OpenAI from 'openai';
import { LessonPrompt, GeneratedLesson } from '../types/lesson';

const SYSTEM_PROMPT = `You are an experienced ESL teacher creating lesson content.
Generate a structured lesson plan with the following sections:
- Reading passage (150-200 words)
- 5 comprehension questions
- 10 key vocabulary words
- 2-3 student activities
- Teacher notes with objectives and timing`;

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
    // Simple parsing for MVP
    const sections = response.split('\n\n');
    
    return {
      reading: {
        passage: sections[0] || '',
        questions: sections[1]?.split('\n').filter(q => q.trim()) || [],
        vocabulary: sections[2]?.split('\n').filter(v => v.trim()) || []
      },
      activities: {
        instructions: sections[3]?.split('\n').filter(a => a.trim()) || []
      },
      teacherNotes: {
        objectives: sections[4]?.split('\n').filter(n => n.trim()) || [],
        timing: { 'total': prompt.duration }
      }
    };
  }
}
