import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  type: 'crypto' | 'b3';
}

export function MarketWidget() {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarket = async () => {
    setLoading(true);
    try {
      // Fetch Crypto (CoinGecko)
      const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
      const cryptoJson = await cryptoRes.json();
      
      const cryptoData: MarketData[] = [
        { symbol: 'BTC', price: cryptoJson.bitcoin.usd, change: cryptoJson.bitcoin.usd_24h_change, type: 'crypto' },
        { symbol: 'ETH', price: cryptoJson.ethereum.usd, change: cryptoJson.ethereum.usd_24h_change, type: 'crypto' },
        { symbol: 'SOL', price: cryptoJson.solana.usd, change: cryptoJson.solana.usd_24h_change, type: 'crypto' }
      ];

      // Fetch B3 (Brapi - might need proxy or CORS, but usually works for basic public requests. Using mocked fallback if fails)
      let b3Data: MarketData[] = [];
      try {
        const b3Res = await fetch('https://brapi.dev/api/quote/PETR4,VALE3?range=1d&interval=1d');
        const b3Json = await b3Res.json();
        if (b3Json.results) {
          b3Data = b3Json.results.map((r: any) => ({
            symbol: r.symbol,
            price: r.regularMarketPrice,
            change: r.regularMarketChangePercent,
            type: 'b3'
          }));
        }
      } catch (e) {
        console.warn('B3 API failed, using fallback data', e);
        b3Data = [
          { symbol: 'PETR4', price: 38.50, change: 1.2, type: 'b3' },
          { symbol: 'VALE3', price: 62.30, change: -0.5, type: 'b3' }
        ];
      }

      setData([...cryptoData, ...b3Data]);
    } catch (error) {
      console.error('Failed to fetch market data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket();
    const interval = setInterval(fetchMarket, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#06080f]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-4 border-b border-[#8b5cf6]/20 pb-2">
        <h2 className="text-white font-black text-sm tracking-widest uppercase drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
          MARKETPLACE
        </h2>
        <button onClick={fetchMarket} className={`text-slate-500 hover:text-[#8b5cf6] transition-colors ${loading ? 'animate-spin' : ''}`}>
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.symbol} className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-[#8b5cf6]/10 border border-transparent hover:border-[#8b5cf6]/30 transition-all cursor-default">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${item.type === 'crypto' ? 'bg-[#f7931a]/20 text-[#f7931a]' : 'bg-[#009b3a]/20 text-[#009b3a]'}`}>
                {item.symbol.substring(0,3)}
              </div>
              <span className="text-white font-bold text-sm">{item.symbol}</span>
            </div>
            
            <div className="text-right">
              <p className="text-white font-mono text-sm">${item.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              <div className={`flex items-center gap-1 justify-end text-xs font-bold ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(item.change).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && !loading && (
          <p className="text-slate-500 text-xs text-center">No market data available.</p>
        )}
      </div>
    </div>
  );
}
