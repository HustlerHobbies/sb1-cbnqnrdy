import { Match } from '../types';
import { format } from 'date-fns';

class TelegramService {
  private webAppUrl: string = 'https://t.me/BetPredictorBot';
  private lastPrediction: { match: Match; prediction: string; confidence: number } | null = null;
  private connected: boolean = false;
  private pendingPredictions: Array<{
    match: Match;
    prediction: string;
    confidence: number;
  }> = [];
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeDevMode();
  }

  private initializeDevMode() {
    this.connected = true;
    console.log('🤖 Telegram Bot: Development mode initialized');
    this.startDevModeHeartbeat();
  }

  private startDevModeHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.connected = true;
      this.processPendingPredictions();
    }, 3000);
  }

  private async processPendingPredictions() {
    if (!this.connected || !this.pendingPredictions.length) return;

    console.log(`🤖 Telegram Bot: Processing ${this.pendingPredictions.length} pending predictions`);
    
    for (const pred of this.pendingPredictions) {
      try {
        const result = await this.mockSendPrediction(pred.match, pred.prediction, pred.confidence);
        console.log('🤖 Telegram Bot: Prediction sent successfully', {
          match: `${pred.match.homeTeam} vs ${pred.match.awayTeam}`,
          prediction: pred.prediction,
          messageId: result.messageId
        });
      } catch (error) {
        console.error('🤖 Telegram Bot: Failed to process prediction:', error);
      }
    }
    this.pendingPredictions = [];
  }

  private async mockSendPrediction(match: Match, prediction: string, confidence: number) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const messageId = `dev-${Date.now()}`;
    console.log('🤖 Telegram Bot: Sending prediction...', {
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      prediction,
      confidence,
      messageId
    });

    return {
      success: true,
      messageId,
      timestamp: new Date().toISOString()
    };
  }

  public async sendPrediction(match: Match, prediction: string, confidence: number) {
    this.lastPrediction = { match, prediction, confidence };
    const message = this.formatPredictionMessage(match, prediction, confidence);

    console.log('🤖 Telegram Bot: New prediction request', {
      match: `${match.homeTeam} vs ${match.awayTeam}`,
      prediction,
      confidence
    });

    if (!this.connected) {
      console.log('🤖 Telegram Bot: Queuing prediction (offline mode)');
      this.pendingPredictions.push({ match, prediction, confidence });
      return {
        success: false,
        queued: true,
        timestamp: new Date().toISOString()
      };
    }

    try {
      return await this.mockSendPrediction(match, prediction, confidence);
    } catch (error) {
      console.error('🤖 Telegram Bot: Failed to send prediction:', error);
      this.pendingPredictions.push({ match, prediction, confidence });
      return {
        success: false,
        error: 'Failed to send prediction',
        timestamp: new Date().toISOString()
      };
    }
  }

  public getLastPrediction() {
    return this.lastPrediction;
  }

  public getWebAppUrl(): string {
    return this.webAppUrl;
  }

  public isConnected(): boolean {
    return this.connected;
  }

  private formatPredictionMessage(match: Match, prediction: string, confidence: number): string {
    const odds = match.odds[prediction.toLowerCase() as keyof typeof match.odds];
    const potentialReturn = `${((odds - 1) * 100).toFixed(2)}%`;

    return `
🎯 New Prediction Alert

${match.homeTeam} vs ${match.awayTeam}
📅 ${format(new Date(match.date), 'MMM d, yyyy HH:mm')}
🏆 ${match.league}

Prediction: ${prediction.toUpperCase()}
Confidence: ${confidence}/10
📊 Potential Return: ${potentialReturn}

Odds:
🏠 Home: ${match.odds.home}
🤝 Draw: ${match.odds.draw}
✈️ Away: ${match.odds.away}

${match.tags?.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') || ''}

💡 Tip: Use /subscribe to receive instant notifications
`.trim();
  }

  public disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.connected = false;
    console.log('🤖 Telegram Bot: Disconnected');
  }
}

export const telegramService = new TelegramService();