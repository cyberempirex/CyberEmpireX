import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'CyberEmpireX Backend' });
  });

  // AI Gemini Client Helper
  const getAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Endpoint: AI Cyber Coach & Command Explainer
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { prompt, context = 'termux' } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getAIClient();
      if (!ai) {
        return res.json({
          reply: `[Demo Mode / No Gemini API Key configured in Secrets]\n\nHere is guidance on **${prompt}**:\n- **Termux Basics**: Termux is a Linux terminal emulator for Android. Always keep packages updated with \`pkg update && pkg upgrade\`.\n- **Ethical Boundary**: Always obtain written authorization before scanning or testing any system.`,
          isDemo: true,
        });
      }

      const systemInstruction = `You are CyberEmpireX AI Coach, a world-class certified Ethical Hacking & Termux Cybersecurity Tutor.
Your goal is to guide students on learning Ethical Hacking, Linux CLI, Bash scripting, Network Security, and Termux tools safely and ethically.

Rules:
1. Emphasize WHITE-HAT ETHICAL HACKING ONLY (Bug Bounties, Authorized Pentesting, Defense, CTF challenges, Educational labs).
2. For Termux questions, provide clear, copyable Termux shell commands (\`pkg install ...\`, \`git clone ...\`, \`nmap ...\`, etc.) with flag explanations.
3. Keep responses structured with Markdown (headers, code blocks, bold key terms, safety tips).
4. Be encouraging, precise, and practical for mobile & terminal users.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || 'No response generated.' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        error: 'Failed to process AI request',
        details: err.message,
      });
    }
  });

  // Endpoint: Quick Command Inspector / Breakdown
  app.post('/api/ai/explain-command', async (req, res) => {
    try {
      const { command } = req.body;
      if (!command) {
        return res.status(400).json({ error: 'Command string is required' });
      }

      const ai = getAIClient();
      if (!ai) {
        return res.json({
          breakdown: {
            command,
            summary: `Explaining Termux command: ${command}`,
            parts: [
              { part: command.split(' ')[0], description: 'Primary binary / shell package' },
              { part: command.split(' ').slice(1).join(' ') || 'N/A', description: 'Arguments / Targets / Flags' },
            ],
            safetyTip: 'Ensure you own or have permission to test target IP/domains.',
          },
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Break down this Termux / Ethical Hacking command into JSON format:
Command: "${command}"

Required JSON format:
{
  "command": "${command}",
  "summary": "Brief 1-sentence description of what this command does in Termux",
  "parts": [
    { "part": "flag or word", "description": "What this specific part does" }
  ],
  "safetyTip": "Crucial white-hat legal or security warning for using this command"
}`,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ breakdown: parsed });
    } catch (err: any) {
      res.status(500).json({ error: 'Error analyzing command', details: err.message });
    }
  });

  // Vite Middleware in Development vs Static in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CyberEmpireX] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
