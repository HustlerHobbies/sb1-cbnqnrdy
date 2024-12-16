import React, { useState, useEffect } from 'react';
import { MessageCircle, ExternalLink, Wifi, WifiOff } from 'lucide-react';
import { telegramService } from '../services/telegramService';

export function TelegramConnect() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkConnection = () => {
      const connected = telegramService.isConnected();
      setIsConnected(connected);
      
      if (!connected && retryCount < 3) {
        setRetryCount(prev => prev + 1);
      }
    };

    // Check connection status periodically
    const interval = setInterval(checkConnection, 5000);
    checkConnection(); // Initial check

    return () => clearInterval(interval);
  }, [retryCount]);

  const handleConnect = () => {
    window.open(telegramService.getWebAppUrl(), '_blank');
    setShowInstructions(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold">Telegram Notifications</h2>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="text-green-500" size={18} />
          ) : (
            <WifiOff className="text-red-500" size={18} />
          )}
          <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            {isConnected ? 'Connected' : 'Development Mode'}
          </span>
        </div>
      </div>

      <button
        onClick={handleConnect}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
      >
        <span>Connect with Telegram</span>
        <ExternalLink size={16} />
      </button>

      {showInstructions && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">How to connect:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the button above to open Telegram</li>
            <li>Start a chat with the bot</li>
            <li>Send the /start command</li>
            <li>You'll receive notifications for new predictions!</li>
          </ol>
          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-blue-700">
            <p className="text-sm">
              ℹ️ Running in development mode. Predictions will be simulated locally.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}