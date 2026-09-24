import { useState, useEffect, useCallback } from 'react';
import { getAllMarkets } from '@/api/marketsApi';

function formatTimeString(timeVal) {
  if (!timeVal) return '';
  if (typeof timeVal === 'string') return timeVal;
  if (typeof timeVal === 'object' && 'hour' in timeVal) {
    const h = String(timeVal.hour).padStart(2, '0');
    const m = String(timeVal.minute || 0).padStart(2, '0');
    return `${h}:${m}`;
  }
  return '';
}

function normalizeMarket(m, index = 0) {
  let pickupHours = '06:00 - 11:00 AM';
  if (m.schedules && m.schedules.length > 0) {
    const s = m.schedules[0];
    const open = formatTimeString(s.openTime);
    const close = formatTimeString(s.closeTime);
    if (open && close) {
      pickupHours = `${open} - ${close}`;
    }
  }

  return {
    id: m.marketId ? `market-${m.marketId}` : (m.id || `m-${index}`),
    marketId: m.marketId ?? (typeof m.id === 'number' ? m.id : null),
    name: m.name || 'Điểm Chợ Nông Sản',
    shortName: m.name || 'Market Hub',
    address: m.address || '',
    pickupHours,
    availableSlots: 15,
    totalSlots: 20,
    coordinates: {
      lat: m.latitude ?? 10.0342,
      lng: m.longitude ?? 105.7876,
    },
    activeFarmers: m.activeFarmersCount ?? 0,
    status: m.status || 'ACTIVE',
    description: m.description || '',
    imageUrl: m.imageUrl || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
  };
}

export function useMarkets() {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromApi, setIsFromApi] = useState(false);

  const fetchMarkets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllMarkets();
      if (Array.isArray(data)) {
        const normalized = data.map((item, idx) => normalizeMarket(item, idx));
        setMarkets(normalized);
        setIsFromApi(true);
      } else {
        setMarkets([]);
        setIsFromApi(false);
      }
    } catch (err) {
      setError(err.message);
      setMarkets([]);
      setIsFromApi(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  return { markets, isLoading, error, isFromApi, refetch: fetchMarkets };
}
