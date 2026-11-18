import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ExternalLink,
  RefreshCw,
  Plus,
  X,
  Camera,
  Play,
  Pause,
  Tv,
  Radio,
  Flame,
  Volume2,
  VolumeX,
  Search,
  ThumbsUp,
  Eye,
  CheckCircle2,
  Star,
  Bookmark
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CatholicInstagramSource,
  CatholicStaticSocialPost
} from '../data/catholicSocial';
import {
  CHRISTENDOM_CHANNELS,
  CHRISTENDOM_VIDEOS,
  ChristendomVideo
} from '../data/christendomData';
import { CatholicSocialShareIcon } from './SanctumIcons';
import { EwtnLiveVideoPlayer } from './EwtnLiveVideoPlayer';

type SocialPlatformTab = 'all' | 'favorites' | 'ewtn' | 'instagram' | 'christendom';

const FAVORITES_STORAGE_KEY = 'sanctum_catholic_social_favorites_v1';
const CUSTOM_IG_FAVORITES_STORAGE_KEY = 'sanctum_catholic_social_custom_ig_v1';

const DEFAULT_FAVORITE_FEEDS: string[] = [
  'ewtn-tv:ewtn-us-global',
  'ig:aleteia_en',
  'christendom:ch-wordonfire'
];

interface EwtnEpgChannelInfo {
  channelId: string;
  name: string;
  mediaUrl: string;
  nowPlaying?: {
    title: string;
    subtitle?: string;
    description?: string;
    startIso?: string;
    endIso?: string;
  };
  upNext?: {
    title: string;
    subtitle?: string;
    startIso?: string;
  };
}

export const CatholicSocialView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatformTab>('all');

  // =========================================================================
  // FAVORITE FEEDS STATE (PERSISTED IN LOCALSTORAGE)
  // =========================================================================
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (id): id is string => typeof id === 'string' && !id.startsWith('fb:') && id !== 'soul-sanctum-fb'
          );
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_FAVORITE_FEEDS;
  });

  const [customIgSources, setCustomIgSources] = useState<CatholicInstagramSource[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_IG_FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_IG_FAVORITES_STORAGE_KEY, JSON.stringify(customIgSources));
    } catch {
      // ignore
    }
  }, [customIgSources]);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [id, ...prev]));
  }, []);

  // =========================================================================
  // EWTN HUB STATE (TELEVISION, RADIO & 24/7 EUCHARISTIC ADORATION)
  // =========================================================================
  const [ewtnHubTab, setEwtnHubTab] = useState<'tv' | 'radio' | 'adoration'>('tv');
  const [ewtnEpgMap, setEwtnEpgMap] = useState<Record<string, EwtnEpgChannelInfo>>({});
  const [irondaleAdorationLive, setIrondaleAdorationLive] = useState<boolean>(false);

  const ewtnTvChannels = useMemo(() => [
    {
      id: 'ewtn-us-global',
      epgChannelId: 'canada',
      altEpgChannelId: 'united-states',
      label: 'EWTN North America (US & Canada)',
      location: 'Irondale, Alabama • Eastern / Central Time Feed',
      streamUrl: ewtnEpgMap['canada']?.mediaUrl || 'https://cdn3.wowza.com/1/YW5wSWZiRGd2eFlU/bGV0aVBq/hls/live/playlist.m3u8',
      fallbackStreamUrl: 'https://cdn3.wowza.com/1/T2NXeHF6UGlGbHY3/WFluRldQ/hls/live/playlist.m3u8',
      portalUrl: 'https://www.ewtn.com/live/tv/united-states',
      youtubeUrl: 'https://www.youtube.com/@EWTN/streams',
      schedule: 'Daily Mass at 8:00 AM, 12:00 PM & 7:00 PM ET • The World Over • EWTN News Nightly'
    },
    {
      id: 'ewtn-asia-pacific',
      epgChannelId: 'asia-pacific',
      label: 'EWTN Asia-Pacific',
      location: 'Manila / Sydney / Irondale • Asia & Oceania Feed',
      streamUrl: ewtnEpgMap['asia-pacific']?.mediaUrl || 'https://cdn3.wowza.com/1/QmVNUVhTNTZSS3Uz/YWQ0aHpi/hls/live/playlist.m3u8',
      portalUrl: 'https://www.ewtn.com/live/tv/asia-pacific',
      youtubeUrl: 'https://www.youtube.com/@EWTN/streams',
      schedule: '24/7 Catholic Television tailored for the Philippines, Asia & Oceania time zones'
    },
    {
      id: 'ewtn-uk-europe',
      epgChannelId: 'europe',
      label: 'EWTN Great Britain & Europe',
      location: 'London / Walsingham / Rome • European Feed',
      streamUrl: ewtnEpgMap['europe']?.mediaUrl || 'https://cdn3.wowza.com/1/T2NXeHF6UGlGbHY3/WFluRldQ/hls/live/playlist.m3u8',
      portalUrl: 'https://www.ewtn.com/live/tv/europe',
      youtubeUrl: 'https://www.youtube.com/@EWTN/streams',
      schedule: 'Live Masses from European Shrines, Vatican Coverage & UK/Ireland Programming'
    },
    {
      id: 'ewtn-africa',
      epgChannelId: 'africa-asia',
      label: 'EWTN Africa & Middle East',
      location: 'Nairobi / Rome / Irondale • Pan-African Feed',
      streamUrl: ewtnEpgMap['africa-asia']?.mediaUrl || 'https://cdn3.wowza.com/1/ZVBYYXFLLzE0c3NC/Qk1FMURC/hls/live/playlist.m3u8',
      portalUrl: 'https://www.ewtn.com/live/tv/africa-asia',
      youtubeUrl: 'https://www.youtube.com/@EWTN/streams',
      schedule: 'Pan-African Catholic broadcasts, Papal liturgies & daily devotions'
    }
  ], [ewtnEpgMap]);

  const ewtnAdorationChapels = useMemo(() => [
    {
      id: 'ewtn-adoration-melbourne',
      epgChannelId: '',
      label: 'St. Benedict\'s Perpetual Adoration Shrine',
      location: 'Melbourne, Australia • 24/7 Exposition of the Blessed Sacrament',
      scheduleBadge: 'LIVE 24/7 • MORNING, AFTERNOON & EVENING',
      streamUrl: undefined as string | undefined,
      embedUrl: 'https://www.youtube.com/embed/qz8YE61BoXM?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=qz8YE61BoXM',
      portalUrl: 'https://www.youtube.com/watch?v=qz8YE61BoXM',
      description: 'Continuous 24/7 live Eucharistic Adoration before the Most Blessed Sacrament exposed on the altar at St. Benedict\'s Parish Shrine (daytime in Oceania during US evenings).'
    },
    {
      id: 'ewtn-adoration-tyburn',
      epgChannelId: 'adoration',
      label: 'Tyburn Convent Shrine • EWTN Great Britain',
      location: 'London, United Kingdom • Shrine of the English Martyrs',
      scheduleBadge: 'LIVE 24/7 • MORNING, AFTERNOON & EVENING',
      streamUrl: undefined as string | undefined,
      embedUrl: 'https://www.youtube.com/embed/9spEO2iFGKI?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=9spEO2iFGKI',
      portalUrl: 'https://www.ewtn.co.uk/live/adoration',
      description: 'Official EWTN Great Britain 24/7 Perpetual Eucharistic Adoration broadcast day and night from the Benedictine Adorers of the Sacred Heart of Jesus of Montmartre at Tyburn Convent.'
    },
    {
      id: 'ewtn-adoration-niepokalanow',
      epgChannelId: '',
      label: 'Sanctuary of St. Maximilian Kolbe • EWTN Niepokalanów',
      location: 'Niepokalanów, Poland • World Center of Prayer for Peace',
      scheduleBadge: 'LIVE 24/7 • MORNING, AFTERNOON & EVENING',
      streamUrl: undefined as string | undefined,
      embedUrl: 'https://www.youtube.com/embed/Orc7lHFSqNY?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=Orc7lHFSqNY',
      portalUrl: 'https://ewtn.pl/adoracja/',
      description: 'Official EWTN 24/7 Perpetual Eucharistic Adoration before the "Star of the Immaculata" monstrance in the Chapel of Perpetual Adoration at St. Maximilian Kolbe\'s Sanctuary.'
    },
    {
      id: 'ewtn-adoration-skd-usa',
      epgChannelId: '',
      label: 'St. Katharine Drexel Perpetual Adoration Chapel',
      location: 'United States • 24/7 Parish Exposition of the Blessed Sacrament',
      scheduleBadge: 'LIVE 24/7 • MORNING, AFTERNOON & EVENING',
      streamUrl: undefined as string | undefined,
      embedUrl: 'https://www.youtube.com/embed/f7Lc65byuDI?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=f7Lc65byuDI',
      portalUrl: 'https://www.youtube.com/watch?v=f7Lc65byuDI',
      description: 'Continuous 24-hour American parish Eucharistic Adoration chapel with real-time clock overlay — active throughout both North American mornings and evenings.'
    },
    {
      id: 'ewtn-adoration-irondale',
      epgChannelId: 'adoration',
      label: irondaleAdorationLive
        ? 'Our Lady of the Angels Chapel • EWTN Irondale (Live Daytime Feed)'
        : 'Our Lady of the Angels Chapel (EWTN) • St. Ignatius Manresa Evening Relay',
      location: irondaleAdorationLive
        ? 'Irondale, Alabama • EWTN Chapel (9:30 AM – 6:00 PM ET)'
        : 'Irondale (9:30 AM–6 PM ET) • Evening Relay: St. Ignatius Chapel, Manresa',
      scheduleBadge: irondaleAdorationLive
        ? 'LIVE NOW • MORNING & AFTERNOON (9:30 AM–6:00 PM ET)'
        : '9:30 AM–6 PM ET (IRONDALE) • EVENING & NIGHT RELAY ACTIVE NOW',
      streamUrl: irondaleAdorationLive
        ? 'https://cdn3.wowza.com/1/Y09GU2RCUG9EbVRr/WlpHUVVx/hls/live/playlist.m3u8'
        : undefined,
      embedUrl: irondaleAdorationLive
        ? undefined
        : 'https://www.youtube.com/embed/W4WApqZDbks?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=W4WApqZDbks',
      portalUrl: 'https://www.ewtn.com/live/adoration',
      description: irondaleAdorationLive
        ? 'Streaming live directly from EWTN\'s Our Lady of the Angels Chapel in Irondale, Alabama (daily exposition 9:30 AM – 6:00 PM ET).'
        : 'EWTN\'s Irondale Chapel camera broadcasts daily from 9:30 AM to 6:00 PM ET. During evening and overnight hours, this channel automatically relays 24/7 Perpetual Adoration from the Chapel of St. Ignatius of Loyola in Manresa.'
    },
    {
      id: 'ewtn-adoration-shalom',
      epgChannelId: '',
      label: 'Shalom World Perpetual Adoration Chapel',
      location: 'Global Catholic Prayer Ministry • 24/7 Live Adoration',
      scheduleBadge: 'LIVE 24/7 • MORNING, AFTERNOON & EVENING',
      streamUrl: undefined as string | undefined,
      embedUrl: 'https://www.youtube.com/embed/GlGkFWPKomU?autoplay=1&rel=0',
      youtubeUrl: 'https://www.youtube.com/watch?v=GlGkFWPKomU',
      portalUrl: 'https://www.youtube.com/watch?v=GlGkFWPKomU',
      description: 'Unite in 24-hour silent adoration and intercessory prayer before the Real Presence of Jesus in the Most Holy Eucharist — live morning, noon, and night.'
    }
  ], [irondaleAdorationLive]);

  const [selectedTvChannelId, setSelectedTvChannelId] = useState<string>('ewtn-us-global');
  const [selectedAdorationId, setSelectedAdorationId] = useState<string>('ewtn-adoration-melbourne');
  const [ewtnStageKey, setEwtnStageKey] = useState<number>(0);
  const [isEwtnTvPlaying, setIsEwtnTvPlaying] = useState<boolean>(false);
  const [shouldAutoPlayTv, setShouldAutoPlayTv] = useState<boolean>(false);
  const [tvPlaySignal, setTvPlaySignal] = useState<number>(0);

  const handleWatchEwtnTvChannel = useCallback((channelId: string) => {
    setShouldAutoPlayTv(true);
    setEwtnHubTab('tv');
    if (selectedTvChannelId === channelId) {
      setTvPlaySignal(prev => prev + 1);
    } else {
      setIsEwtnTvPlaying(false);
      setSelectedTvChannelId(channelId);
    }
  }, [selectedTvChannelId]);

  // Fetch live EWTN EPG schedule and verify live stream URLs
  useEffect(() => {
    let mounted = true;
    const fetchEpg = async () => {
      try {
        const res = await fetch('/api/ewtn-epg');
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            if (data?.channels) {
              setEwtnEpgMap(data.channels);
            }
            if (typeof data?.irondaleAdorationLive === 'boolean') {
              setIrondaleAdorationLive(data.irondaleAdorationLive);
            }
          }
        }
      } catch {
        // Keep verified Wowza HLS stream URLs on network timeout
      }
    };
    fetchEpg();
    const interval = setInterval(fetchEpg, 3 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const ewtnStageVideo = useMemo(() => {
    if (ewtnHubTab === 'adoration') {
      const chapel = ewtnAdorationChapels.find(c => c.id === selectedAdorationId) || ewtnAdorationChapels[0];
      return {
        id: chapel.id,
        title: `${chapel.label} • 24/7 Eucharistic Adoration`,
        subtitle: chapel.location,
        streamUrl: chapel.streamUrl,
        fallbackStreamUrl: undefined as string | undefined,
        embedUrl: chapel.embedUrl,
        portalUrl: chapel.portalUrl,
        youtubeUrl: chapel.youtubeUrl
      };
    }
    const ch = ewtnTvChannels.find(c => c.id === selectedTvChannelId) || ewtnTvChannels[0];
    const nowProg = ewtnEpgMap[ch.epgChannelId]?.nowPlaying || (ch.altEpgChannelId ? ewtnEpgMap[ch.altEpgChannelId]?.nowPlaying : undefined);
    return {
      id: ch.id,
      title: nowProg ? `${ch.label} — Live Now: ${nowProg.title}` : `${ch.label} • Live 24/7 Broadcast`,
      subtitle: nowProg?.subtitle ? `${ch.location} • "${nowProg.subtitle}"` : ch.location,
      streamUrl: ch.streamUrl,
      fallbackStreamUrl: ch.fallbackStreamUrl,
      embedUrl: undefined as string | undefined,
      portalUrl: ch.portalUrl,
      youtubeUrl: ch.youtubeUrl
    };
  }, [ewtnHubTab, selectedTvChannelId, selectedAdorationId, ewtnTvChannels, ewtnAdorationChapels, ewtnEpgMap]);

  const [selectedRadioId, setSelectedRadioId] = useState<'english' | 'classics' | 'gbie' | 'philippines' | 'spanish'>('english');
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioMuted, setIsRadioMuted] = useState(false);
  const [radioVolume, setRadioVolume] = useState(0.85);
  const [radioError, setRadioError] = useState(false);
  const radioAudioRef = useRef<HTMLAudioElement | null>(null);

  const ewtnRadioStations = useMemo(() => [
    {
      id: 'english' as const,
      epgChannelId: 'radio-english',
      name: 'EWTN Global Catholic Radio (US & English 24/7)',
      subtitle: 'Live Catholic Talk, Daily Mass, Morning Glory, Called to Communion & Papal Coverage',
      streamUrl: ewtnEpgMap['radio-english']?.mediaUrl || 'https://ewtn-ice.streamguys1.com/english-aac',
      proxyStreamUrl: '/api/ewtn-radio?stream=english-aac',
      portalUrl: 'https://www.ewtn.com/live/radio/radio-english'
    },
    {
      id: 'classics' as const,
      epgChannelId: 'radio-extra',
      name: 'EWTN Radio Extra & Classics (Archbishop Sheen)',
      subtitle: '24/7 Ven. Fulton J. Sheen, Mother Angelica Live Classics, Sacred Retreats & Devotions',
      streamUrl: ewtnEpgMap['radio-extra']?.mediaUrl || 'https://ewtn-ice.streamguys1.com/classics-aac',
      proxyStreamUrl: '/api/ewtn-radio?stream=classics-aac',
      portalUrl: 'https://www.ewtn.com/live/radio/radio-extra'
    },
    {
      id: 'gbie' as const,
      epgChannelId: 'radio-gbie',
      name: 'EWTN Radio Great Britain & Ireland (24/7)',
      subtitle: 'Live Catholic Talk Radio, Holy Rosary & Liturgies for Great Britain and Ireland',
      streamUrl: ewtnEpgMap['radio-gbie']?.mediaUrl || 'https://ewtn-ice.streamguys1.com/sky-aac',
      proxyStreamUrl: '/api/ewtn-radio?stream=sky-aac',
      portalUrl: 'https://www.ewtn.com/live/radio/radio-gbie'
    },
    {
      id: 'philippines' as const,
      epgChannelId: 'radio-philippines',
      name: 'EWTN Radio Philippines & Asia (24/7)',
      subtitle: '24/7 Catholic Radio tailored for the Philippines and Asia-Pacific time zones',
      streamUrl: ewtnEpgMap['radio-philippines']?.mediaUrl || 'https://ewtn-ice.streamguys1.com/philippines-aac',
      proxyStreamUrl: '/api/ewtn-radio?stream=philippines-aac',
      portalUrl: 'https://www.ewtn.com/live/radio/radio-philippines'
    },
    {
      id: 'spanish' as const,
      epgChannelId: 'radio-catolica-mundial',
      name: 'EWTN Radio Católica Mundial (Español 24/7)',
      subtitle: 'Transmisión en vivo las 24 horas: Santa Misa, Santo Rosario y formación católica',
      streamUrl: ewtnEpgMap['radio-catolica-mundial']?.mediaUrl || 'https://ewtn-ice.streamguys1.com/spanish-aac',
      proxyStreamUrl: '/api/ewtn-radio?stream=spanish-aac',
      portalUrl: 'https://www.ewtn.com/live/radio/radio-catolica-mundial'
    }
  ], [ewtnEpgMap]);

  const currentRadioStation = ewtnRadioStations.find(s => s.id === selectedRadioId) || ewtnRadioStations[0];

  useEffect(() => {
    if (radioAudioRef.current) {
      radioAudioRef.current.volume = isRadioMuted ? 0 : radioVolume;
    }
  }, [radioVolume, isRadioMuted]);

  const startRadioStream = (station: (typeof ewtnRadioStations)[number]) => {
    const audio = radioAudioRef.current;
    if (!audio) return;
    setRadioError(false);
    audio.pause();
    audio.src = station.streamUrl;
    audio.load();
    audio
      .play()
      .then(() => {
        setIsRadioPlaying(true);
      })
      .catch(() => {
        // Fallback to server-side audio stream proxy
        audio.src = station.proxyStreamUrl;
        audio.load();
        audio
          .play()
          .then(() => {
            setIsRadioPlaying(true);
          })
          .catch(() => {
            setRadioError(true);
            setIsRadioPlaying(false);
          });
      });
  };

  const handleToggleRadio = (stationId?: 'english' | 'classics' | 'gbie' | 'philippines' | 'spanish') => {
    const targetId = stationId || selectedRadioId;
    const targetStation = ewtnRadioStations.find(s => s.id === targetId) || ewtnRadioStations[0];

    if (stationId && stationId !== selectedRadioId) {
      setSelectedRadioId(stationId);
      startRadioStream(targetStation);
      return;
    }

    if (!radioAudioRef.current) return;

    if (isRadioPlaying) {
      radioAudioRef.current.pause();
      setIsRadioPlaying(false);
    } else {
      startRadioStream(targetStation);
    }
  };

  // =========================================================================
  // INSTAGRAM STATE
  // =========================================================================
  const [selectedIgSource, setSelectedIgSource] = useState<CatholicInstagramSource>(CATHOLIC_INSTAGRAM_SOURCES[0]);
  const [igAllShortcodes, setIgAllShortcodes] = useState<string[]>(CATHOLIC_INSTAGRAM_SOURCES[0].defaultShortcodes);
  const [igPageOffset, setIgPageOffset] = useState<number>(0);
  const [, setIgPosts] = useState<CatholicStaticSocialPost[]>([]);
  const [, setIgProfilePic] = useState<string>('');
  const [isLoadingIg, setIsLoadingIg] = useState<boolean>(false);
  const [customIgInput, setCustomIgInput] = useState<string>('');
  const [igRefreshKey, setIgRefreshKey] = useState<number>(0);

  // Compute the 6 displayed shortcodes from igAllShortcodes and igPageOffset
  const igShortcodes = useMemo(() => {
    if (igAllShortcodes.length <= 6) return igAllShortcodes;
    const result: string[] = [];
    for (let i = 0; i < 6; i++) {
      result.push(igAllShortcodes[(igPageOffset + i) % igAllShortcodes.length]);
    }
    return result;
  }, [igAllShortcodes, igPageOffset]);

  // Fetch live Instagram data (posts + shortcodes + profile pic) for selected account
  const fetchInstagramShortcodes = useCallback(async (source: CatholicInstagramSource, rotatePool = false) => {
    setIsLoadingIg(true);
    if (!rotatePool) {
      setIgAllShortcodes(source.defaultShortcodes);
      setIgPageOffset(0);
    }
    try {
      const res = await fetch(
        `/api/catholic-instagram?username=${encodeURIComponent(source.username)}&_t=${Date.now()}`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        if (typeof data.profilePicUrl === 'string') {
          setIgProfilePic(data.profilePicUrl);
        }
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setIgPosts(data.posts);
        }
        const brokenSet = new Set(['DfagCq8D3sp', 'DfYQhEYAB8J', 'DfWDi7HDNuW', 'DfPX9L3D8mF']);
        const liveCodes = Array.isArray(data.shortcodes) ? data.shortcodes : [];
        const merged = Array.from(new Set([...liveCodes, ...source.defaultShortcodes])).filter(c => !brokenSet.has(c));
        if (merged.length > 0) {
          setIgAllShortcodes(merged);
          if (rotatePool && merged.length > 6) {
            setIgPageOffset(prev => (prev + 3) % merged.length);
          }
        }
      } else if (rotatePool) {
        setIgAllShortcodes(current => {
          if (current.length > 6) {
            setIgPageOffset(prev => (prev + 3) % current.length);
          }
          return current;
        });
      }
    } catch {
      if (rotatePool) {
        setIgAllShortcodes(current => {
          if (current.length > 6) {
            setIgPageOffset(prev => (prev + 3) % current.length);
          }
          return current;
        });
      }
    } finally {
      setIsLoadingIg(false);
    }
  }, []);

  useEffect(() => {
    setIgPosts([]);
    fetchInstagramShortcodes(selectedIgSource, false);
    const interval = setInterval(() => {
      fetchInstagramShortcodes(selectedIgSource, false);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedIgSource, fetchInstagramShortcodes]);

  const handleCustomInstagramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customIgInput.trim();
    if (!trimmed) return;

    const postMatch = trimmed.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i);
    if (postMatch && postMatch[1]) {
      const code = postMatch[1];
      setIgAllShortcodes(prev => [code, ...prev.filter(c => c !== code)]);
      setIgPageOffset(0);
      setCustomIgInput('');
      return;
    }

    const cleanUser = trimmed
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .replace(/^@/, '')
      .split('/')[0]
      .replace(/[^a-zA-Z0-9._]/g, '');

    if (cleanUser) {
      const customSource: CatholicInstagramSource = {
        id: `ig-custom-${cleanUser}`,
        name: `@${cleanUser}`,
        username: cleanUser,
        category: 'Custom Catholic Account',
        description: `Live Instagram feed from @${cleanUser}`,
        profileUrl: `https://www.instagram.com/${cleanUser}/`,
        defaultShortcodes: []
      };
      setCustomIgSources(prev =>
        prev.some(s => s.username.toLowerCase() === cleanUser.toLowerCase()) ? prev : [customSource, ...prev]
      );
      setSelectedIgSource(customSource);
      setCustomIgInput('');
    }
  };

  // =========================================================================
  // CHRISTENDOM STATE
  // =========================================================================
  const [selectedChannelId, setSelectedChannelId] = useState<string>('all');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [videoSearchQuery, setVideoSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<ChristendomVideo | null>(null);
  const [activeInPageVideo, setActiveInPageVideo] = useState<ChristendomVideo | null>(null);
  const christendomPlayerRef = useRef<HTMLDivElement | null>(null);
  const [christendomVideos, setChristendomVideos] = useState<ChristendomVideo[]>(CHRISTENDOM_VIDEOS);
  const [isLoadingChristendom, setIsLoadingChristendom] = useState<boolean>(false);
  const [christendomOffset, setChristendomOffset] = useState<number>(0);

  const fetchChristendomVideos = useCallback(async (rotatePool = false) => {
    setIsLoadingChristendom(true);
    try {
      const res = await fetch(`/api/christendom-videos?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const liveVideos: ChristendomVideo[] = Array.isArray(data.videos) ? data.videos : [];
        if (liveVideos.length > 0) {
          // Interleave across channels so "All Channels" shows a balanced mix of all 8 channels
          const seenYoutubeIds = new Set<string>();
          const seenTitles = new Set<string>();
          const combined: ChristendomVideo[] = [];

          // Group live videos by channelId and interleave round-robin
          const byChannel: Record<string, ChristendomVideo[]> = {};
          for (const v of [...liveVideos, ...CHRISTENDOM_VIDEOS]) {
            const normTitle = v.title.trim().toLowerCase();
            if (!v.youtubeId || seenYoutubeIds.has(v.youtubeId) || seenTitles.has(normTitle)) continue;
            seenYoutubeIds.add(v.youtubeId);
            seenTitles.add(normTitle);
            if (!byChannel[v.channelId]) byChannel[v.channelId] = [];
            byChannel[v.channelId].push(v);
          }

          const channelKeys = Object.keys(byChannel);
          const maxLen = Math.max(0, ...channelKeys.map(k => byChannel[k].length));
          for (let i = 0; i < maxLen; i++) {
            for (const k of channelKeys) {
              if (byChannel[k][i]) {
                combined.push(byChannel[k][i]);
              }
            }
          }

          if (combined.length > 0) {
            setChristendomVideos(combined);
            if (rotatePool) {
              setChristendomOffset(prev => (prev + 3) % combined.length);
            }
          }
        } else if (rotatePool) {
          setChristendomOffset(prev => prev + 3);
        }
      } else if (rotatePool) {
        setChristendomOffset(prev => prev + 3);
      }
    } catch {
      if (rotatePool) {
        setChristendomOffset(prev => prev + 3);
      }
    } finally {
      setIsLoadingChristendom(false);
    }
  }, []);

  useEffect(() => {
    fetchChristendomVideos(false);
    const interval = setInterval(() => {
      fetchChristendomVideos(false);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchChristendomVideos]);

  const videoCategories = useMemo(() => {
    return [
      'All',
      'Theology & Homilies',
      'Sacred Scripture',
      'Church History',
      'Apologetics & Culture',
      'Sacred Liturgy & Chant',
      'Documentaries'
    ];
  }, []);

  const filteredVideos = useMemo(() => {
    const matching = christendomVideos.filter(v => {
      const matchesChannel = selectedChannelId === 'all' || v.channelId === selectedChannelId;
      if (!matchesChannel) return false;

      const matchesCategory = selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
      if (!matchesCategory) return false;

      if (!videoSearchQuery.trim()) return true;
      const q = videoSearchQuery.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    });

    if (matching.length <= 1 || christendomOffset === 0) return matching;
    const shift = christendomOffset % matching.length;
    return [...matching.slice(shift), ...matching.slice(0, shift)];
  }, [christendomVideos, selectedChannelId, selectedVideoCategory, videoSearchQuery, christendomOffset]);

  const activeChannel = useMemo(() => {
    if (selectedChannelId === 'all') return null;
    return CHRISTENDOM_CHANNELS.find(c => c.id === selectedChannelId) || null;
  }, [selectedChannelId]);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 transition-all duration-300">
      {/* Top Banner Rectangle */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 via-stone-850 to-stone-800 text-stone-100 flex flex-col justify-between rounded-xl">
          <div className="space-y-1.5">
            {/* Line 1: Badge & Subtitle */}
            <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-500 text-amber-950">
                <CatholicSocialShareIcon className="w-3.5 h-3.5" />
                <span>CATHOLIC SOCIAL &amp; MEDIA</span>
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-serif whitespace-nowrap truncate">
                Curated Posts from Faithful Catholic Apostolates &amp; Christendom
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-snug break-words">
              EWTN, Catholic Instagram &amp; Christendom.com
            </h2>
          </div>

          {/* Line 3: Platform Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mt-auto pt-3 border-t border-stone-700/60">
            <span className="text-xs font-serif text-stone-300 hidden sm:inline">
              Filter Media Channels:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActivePlatform('all')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap ${
                  activePlatform === 'all'
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                All Feeds
              </button>
              <button
                onClick={() => setActivePlatform('favorites')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activePlatform === 'favorites'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 border-amber-200 shadow-sm'
                    : 'bg-[#1C120C]/90 text-amber-300 border-amber-500/50 hover:border-amber-300/80 hover:text-amber-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${activePlatform === 'favorites' ? 'fill-stone-950' : 'fill-amber-400/70'}`} />
                <span>Favorites ({favoriteIds.length})</span>
              </button>
              <button
                onClick={() => setActivePlatform('ewtn')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap ${
                  activePlatform === 'ewtn'
                    ? 'bg-amber-600 text-stone-950 border-amber-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                EWTN Hub
              </button>
              <button
                onClick={() => setActivePlatform('instagram')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap ${
                  activePlatform === 'instagram'
                    ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white border-pink-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                Instagram
              </button>
              <button
                onClick={() => setActivePlatform('christendom')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap ${
                  activePlatform === 'christendom'
                    ? 'bg-gradient-to-r from-red-700 to-amber-600 text-white border-red-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                Christendom
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-Jump Favorite Feeds Bar (Visible in All Feeds mode) */}
      {activePlatform === 'all' && favoriteIds.length > 0 && (
        <div className="rounded-xl bg-[#FAF5EE]/90 border border-amber-800/25 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-900 mr-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>Favorite Feeds:</span>
            </span>
            {favoriteIds.slice(0, 6).map(favId => {
              let label = favId;
              let onJump = () => setActivePlatform('favorites');
              if (favId.startsWith('ewtn-tv:')) {
                const cid = favId.slice(8);
                const ch = ewtnTvChannels.find(c => c.id === cid);
                label = ch ? ch.label.replace(/\s*\(.*\)/, '') : 'EWTN TV';
                onJump = () => {
                  if (ch) {
                    handleWatchEwtnTvChannel(ch.id);
                  } else {
                    setEwtnHubTab('tv');
                  }
                  setActivePlatform('ewtn');
                };
              } else if (favId.startsWith('ewtn-radio:')) {
                const rid = favId.slice(11) as typeof selectedRadioId;
                const st = ewtnRadioStations.find(s => s.id === rid);
                label = st ? st.name.replace(/\s*\(.*\)/, '') : 'EWTN Radio';
                onJump = () => {
                  if (st) {
                    setEwtnHubTab('radio');
                    handleToggleRadio(st.id);
                  }
                  setActivePlatform('ewtn');
                };
              } else if (favId.startsWith('ewtn-adoration:')) {
                const aid = favId.slice(15);
                const ap = ewtnAdorationChapels.find(c => c.id === aid);
                label = ap ? ap.label.split('•')[0].trim() : 'Adoration';
                onJump = () => {
                  if (ap) {
                    setEwtnHubTab('adoration');
                    setSelectedAdorationId(ap.id);
                  }
                  setActivePlatform('ewtn');
                };
              } else if (favId.startsWith('ig:')) {
                const uname = favId.slice(3);
                const ig = [...customIgSources, ...CATHOLIC_INSTAGRAM_SOURCES].find(s => s.username === uname);
                label = ig ? `IG · ${ig.name}` : `@${uname}`;
                onJump = () => {
                  if (ig) setSelectedIgSource(ig);
                  setActivePlatform('instagram');
                };
              } else if (favId.startsWith('christendom:')) {
                const cid = favId.slice(12);
                const ch = CHRISTENDOM_CHANNELS.find(c => c.id === cid);
                label = ch ? ch.name.replace(/\s*\(.*\)/, '') : 'Christendom';
                onJump = () => {
                  if (ch) setSelectedChannelId(ch.id);
                  setActivePlatform('christendom');
                };
              }
              return (
                <button
                  key={favId}
                  type="button"
                  onClick={onJump}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-amber-100/80 border border-amber-700/25 text-[11px] font-serif font-medium text-stone-800 cursor-pointer transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setActivePlatform('favorites')}
            className="text-[11px] font-cinzel font-bold text-amber-900 hover:text-amber-700 underline underline-offset-2 cursor-pointer shrink-0"
          >
            View All Favorites ({favoriteIds.length})
          </button>
        </div>
      )}

      {/* Hidden HTML5 Audio Element for EWTN 24/7 Live Radio */}
      <audio
        ref={radioAudioRef}
        preload="none"
        onEnded={() => setIsRadioPlaying(false)}
        onError={() => {
          const audio = radioAudioRef.current;
          if (audio && audio.src && !audio.src.includes('/api/ewtn-radio')) {
            audio.src = currentRadioStation.proxyStreamUrl;
            audio.load();
            audio
              .play()
              .then(() => {
                setRadioError(false);
                setIsRadioPlaying(true);
              })
              .catch(() => {
                setRadioError(true);
                setIsRadioPlaying(false);
              });
            return;
          }
          if (isRadioPlaying) setRadioError(true);
          setIsRadioPlaying(false);
        }}
      />

      {/* =====================================================================
          0A. FAVORITE FEEDS HUB (UNIFIED CROSS-PLATFORM FAVORITES VIEW)
          ===================================================================== */}
      {activePlatform === 'favorites' && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-800/25 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#3A2210] to-[#241307] px-4 py-4 sm:px-6 border-b border-amber-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-amber-400 text-stone-950 font-cinzel text-[11px] font-bold tracking-wider uppercase shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-stone-950" />
                  <span>Favorite Feeds</span>
                </span>
                <span className="text-xs font-cinzel font-bold uppercase tracking-widest text-amber-200/90">
                  Your Pinned Apostolates &amp; Channels
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                Your Favorite Catholic Feeds ({favoriteIds.length})
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif">
                Star any EWTN live channel or adoration chapel, Instagram feed, or Christendom creator to pin it here for instant daily access.
              </p>
            </div>

            {favoriteIds.length === 0 && (
              <button
                type="button"
                onClick={() => setFavoriteIds(DEFAULT_FAVORITE_FEEDS)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-cinzel font-bold cursor-pointer shrink-0 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-stone-950" />
                <span>Restore Starter Favorites</span>
              </button>
            )}
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {favoriteIds.length === 0 ? (
              <div className="py-10 px-4 text-center rounded-xl bg-white border border-amber-900/15 space-y-3">
                <Bookmark className="w-8 h-8 text-amber-700/70 mx-auto" />
                <h4 className="font-cinzel text-base font-bold text-stone-900">No Favorite Feeds Pinned Yet</h4>
                <p className="text-xs sm:text-sm font-serif text-stone-600 max-w-md mx-auto">
                  Click the star (<Star className="w-3.5 h-3.5 inline text-amber-600" />) button on any EWTN channel, Instagram account, or Christendom creator to pin your favorite feeds here.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setFavoriteIds(DEFAULT_FAVORITE_FEEDS)}
                    className="px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-cinzel font-bold cursor-pointer"
                  >
                    Pin Recommended Catholic Feeds
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePlatform('all')}
                    className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold cursor-pointer"
                  >
                    Browse All Feeds
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Pinned Feed Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
                  {favoriteIds.map(favId => {
                    let badge = 'Feed';
                    let badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
                    let title = favId;
                    let subtitle = '';
                    let actionLabel = 'Open Feed';
                    let externalUrl: string | undefined;
                    let onOpen = () => setActivePlatform('all');

                    if (favId.startsWith('ewtn-tv:')) {
                      const cid = favId.slice(8);
                      const ch = ewtnTvChannels.find(c => c.id === cid);
                      if (!ch) return null;
                      badge = 'EWTN Live TV';
                      badgeClass = 'bg-amber-100 text-amber-950 border-amber-300';
                      title = ch.label;
                      subtitle = ch.location;
                      actionLabel = 'Watch Live TV';
                      externalUrl = ch.portalUrl;
                      onOpen = () => {
                        handleWatchEwtnTvChannel(ch.id);
                        setActivePlatform('ewtn');
                      };
                    } else if (favId.startsWith('ewtn-radio:')) {
                      const rid = favId.slice(11) as typeof selectedRadioId;
                      const st = ewtnRadioStations.find(s => s.id === rid);
                      if (!st) return null;
                      badge = 'EWTN Live Radio';
                      badgeClass = 'bg-amber-100 text-amber-950 border-amber-300';
                      title = st.name;
                      subtitle = st.subtitle;
                      actionLabel = selectedRadioId === st.id && isRadioPlaying ? 'Pause Radio' : 'Listen Live';
                      externalUrl = st.portalUrl;
                      onOpen = () => {
                        setEwtnHubTab('radio');
                        handleToggleRadio(st.id);
                        setActivePlatform('ewtn');
                      };
                    } else if (favId.startsWith('ewtn-adoration:')) {
                      const aid = favId.slice(15);
                      const ap = ewtnAdorationChapels.find(c => c.id === aid);
                      if (!ap) return null;
                      badge = '24/7 Adoration';
                      badgeClass = 'bg-stone-200 text-stone-900 border-stone-300';
                      title = ap.label;
                      subtitle = ap.location;
                      actionLabel = 'Enter Chapel';
                      externalUrl = ap.portalUrl;
                      onOpen = () => {
                        setEwtnHubTab('adoration');
                        setSelectedAdorationId(ap.id);
                        setActivePlatform('ewtn');
                      };
                    } else if (favId.startsWith('ig:')) {
                      const uname = favId.slice(3);
                      const ig = [...customIgSources, ...CATHOLIC_INSTAGRAM_SOURCES].find(s => s.username === uname);
                      if (!ig) return null;
                      badge = 'Instagram';
                      badgeClass = 'bg-pink-100 text-pink-900 border-pink-300';
                      title = ig.name;
                      subtitle = `@${ig.username} • ${ig.category}`;
                      actionLabel = 'Open Instagram Feed';
                      externalUrl = ig.profileUrl;
                      onOpen = () => {
                        setSelectedIgSource(ig);
                        setActivePlatform('instagram');
                      };
                    } else if (favId.startsWith('christendom:')) {
                      const cid = favId.slice(12);
                      const ch = CHRISTENDOM_CHANNELS.find(c => c.id === cid);
                      if (!ch) return null;
                      badge = 'Christendom';
                      badgeClass = 'bg-red-100 text-red-900 border-red-300';
                      title = ch.name;
                      subtitle = `${ch.handle} • ${ch.category}`;
                      actionLabel = 'Watch Talks';
                      externalUrl = ch.christendomUrl;
                      onOpen = () => {
                        setSelectedChannelId(ch.id);
                        setActivePlatform('christendom');
                      };
                    } else {
                      return null;
                    }

                    return (
                      <div
                        key={favId}
                        className="p-4 rounded-xl bg-white border border-amber-900/20 hover:border-amber-600/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`px-2 py-0.5 rounded-xs text-[10px] font-cinzel font-bold uppercase tracking-wider border ${badgeClass}`}>
                              {badge}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleFavorite(favId)}
                              className="p-1 rounded-md hover:bg-amber-50 text-amber-500 cursor-pointer"
                              title="Remove from Favorite Feeds"
                              aria-label={`Remove ${title} from favorites`}
                            >
                              <Star className="w-4 h-4 fill-amber-500" />
                            </button>
                          </div>
                          <h4 className="font-cinzel text-sm font-bold text-stone-900 leading-snug">
                            {title}
                          </h4>
                          <p className="text-xs font-serif text-stone-600 line-clamp-2">
                            {subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={onOpen}
                            className="px-3 py-1.5 rounded-lg bg-[#241307] hover:bg-[#3A1D0D] text-amber-200 text-xs font-cinzel font-bold cursor-pointer transition-colors"
                          >
                            {actionLabel}
                          </button>
                          {externalUrl && (
                            <a
                              href={externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-serif text-stone-600 hover:text-amber-900"
                            >
                              <span>Source</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Latest Videos from Favorite Christendom Creators */}
                {favoriteIds.some(id => id.startsWith('christendom:')) && (
                  <div className="space-y-3 pt-2 border-t border-amber-900/15">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-amber-950">
                        Talks from Your Favorite Christendom Creators
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActivePlatform('christendom')}
                        className="text-xs font-cinzel font-bold text-red-800 hover:underline cursor-pointer"
                      >
                        Open Christendom Hub
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {christendomVideos.filter(v => favoriteIds.includes(`christendom:${v.channelId}`)).slice(0, 4).map(video => (
                        <div
                          key={`fav-vid-${video.id}`}
                          className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between text-left"
                        >
                          <div
                            onClick={() => setActiveVideo(video)}
                            className="relative aspect-video bg-stone-950 cursor-pointer group"
                          >
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              loading="lazy"
                              onLoad={(e) => {
                                const target = e.currentTarget;
                                const hq = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                                if (target.naturalWidth <= 120 && target.src !== hq) {
                                  target.src = hq;
                                }
                              }}
                              onError={(e) => {
                                const target = e.currentTarget;
                                const hq = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                                if (target.src !== hq) {
                                  target.src = hq;
                                }
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
                                <Play className="w-4 h-4 fill-white ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <div className="p-3 space-y-1.5">
                            <div className="text-[10px] font-cinzel font-bold uppercase text-amber-800 truncate">
                              {video.channelName}
                            </div>
                            <h5
                              onClick={() => setActiveVideo(video)}
                              className="font-serif font-bold text-xs text-stone-900 line-clamp-2 cursor-pointer hover:text-amber-900"
                            >
                              {video.title}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          0C. EWTN GLOBAL CATHOLIC NETWORK HUB (TV • RADIO • 24/7 ADORATION)
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'ewtn') && (
        <section className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#17120E] via-[#1F1610] to-[#120D0A] border border-amber-500/40 shadow-xl text-stone-100">
          {/* Enhanced EWTN Banner */}
          <div className="px-5 pt-4 pb-4 sm:px-6 bg-gradient-to-r from-stone-900 via-[#2A160B] to-stone-900 border-b border-amber-500/35 flex flex-col justify-between gap-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-amber-500 text-stone-950 font-cinzel text-[11px] font-bold tracking-wider uppercase shadow-xs shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span>EWTN Global Network</span>
                  </span>
                  <span className="text-xs font-cinzel font-bold uppercase tracking-widest text-amber-300/95">
                    Eternal Word Television Network · Founded by Mother Angelica
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 tracking-normal leading-snug">
                  EWTN Live Television, Global Catholic Radio &amp; 24/7 Adoration
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-serif max-w-3xl">
                  Watch live regional television feeds from Irondale, listen to 24/7 worldwide Catholic radio, or unite in Perpetual Eucharistic Adoration across international sanctuaries.
                </p>
              </div>

              <a
                href="https://www.ewtn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border border-[#8B5A2B]/60 hover:border-[#D4A373]/80 text-xs font-cinzel font-semibold transition-all self-start shrink-0 shadow-xs"
                title="Open Official EWTN Website (ewtn.com)"
              >
                <span>ewtn.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>

            {/* Bottom Control Row: 3-Mode EWTN Broadcast Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-amber-500/20">
              <span className="text-xs font-serif text-amber-200/80 hidden sm:inline">
                Select EWTN Broadcast Stream:
              </span>

              <div className="flex flex-wrap items-center gap-1.5 bg-[#120B07]/90 p-1 rounded-lg border border-[#8B5A2B]/50 shadow-inner">
                <button
                  type="button"
                  onClick={() => setEwtnHubTab('tv')}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    ewtnHubTab === 'tv'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>EWTN Television</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShouldAutoPlayTv(false);
                    setIsEwtnTvPlaying(false);
                    setTvPlaySignal(0);
                    setEwtnHubTab('radio');
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    ewtnHubTab === 'radio'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>EWTN Radio</span>
                  {isRadioPlaying && <span className="text-[10px] font-mono uppercase">(Playing)</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShouldAutoPlayTv(false);
                    setIsEwtnTvPlaying(false);
                    setTvPlaySignal(0);
                    setEwtnHubTab('adoration');
                  }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    ewtnHubTab === 'adoration'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>24/7 Adoration</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Embedded 16:9 Live Video Player for EWTN Television & EWTN 24/7 Adoration */}
            {(ewtnHubTab === 'tv' || ewtnHubTab === 'adoration') && (
              <div className="rounded-xl overflow-hidden border border-amber-500/35 bg-black shadow-lg">
                <EwtnLiveVideoPlayer
                  key={`${ewtnStageVideo.id}-${ewtnStageKey}`}
                  streamUrl={ewtnStageVideo.streamUrl}
                  fallbackStreamUrl={ewtnStageVideo.fallbackStreamUrl}
                  embedUrl={ewtnStageVideo.embedUrl}
                  title={ewtnStageVideo.title}
                  subtitle={ewtnStageVideo.subtitle}
                  portalUrl={ewtnStageVideo.portalUrl}
                  autoPlay={ewtnHubTab === 'adoration' || shouldAutoPlayTv}
                  playSignal={ewtnHubTab === 'tv' ? tvPlaySignal : 0}
                  onPlayingChange={ewtnHubTab === 'tv' ? setIsEwtnTvPlaying : undefined}
                />

                <div className="p-3.5 sm:p-4 bg-stone-950/95 border-t border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-400 block">
                      {ewtnStageVideo.subtitle}
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                      {ewtnStageVideo.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">

                    <button
                      type="button"
                      onClick={() => {
                        setIsEwtnTvPlaying(false);
                        setEwtnStageKey(prev => prev + 1);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reload</span>
                    </button>
                    <a
                      href={ewtnStageVideo.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-amber-900/80 hover:bg-amber-800 text-amber-100 border border-amber-500/50 text-xs font-cinzel font-bold flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Tv className="w-3.5 h-3.5 text-amber-300" />
                      <span>EWTN HD Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={ewtnStageVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-red-800/80 hover:bg-red-700 text-white border border-red-500/50 text-xs font-sans font-semibold flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>YouTube Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: EWTN LIVE TELEVISION REGIONAL CHANNELS */}
            {ewtnHubTab === 'tv' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                {ewtnTvChannels.map(channel => {
                  const isActiveChannel = selectedTvChannelId === channel.id;
                  const epgInfo =
                    ewtnEpgMap[channel.epgChannelId] ||
                    (channel.altEpgChannelId ? ewtnEpgMap[channel.altEpgChannelId] : undefined);
                  const nowPlaying = epgInfo?.nowPlaying;
                  const upNext = epgInfo?.upNext;
                  return (
                    <div
                      key={channel.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                        isActiveChannel
                          ? 'bg-amber-950/55 border-amber-400 shadow-md'
                          : 'bg-black/45 border-amber-500/25 hover:border-amber-400/60'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-400 block">
                            {channel.location}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-red-900/70 text-red-200 border border-red-500/40 text-[10px] font-cinzel font-bold uppercase tracking-wider shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            <span>LIVE 24/7</span>
                          </span>
                        </div>
                        <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                          {channel.label}
                        </h4>
                        {nowPlaying ? (
                          <div className="p-2.5 rounded-lg bg-black/50 border border-amber-500/25 space-y-0.5">
                            <div className="text-[11px] font-cinzel font-bold text-amber-300">
                              On Air Now: {nowPlaying.title}
                            </div>
                            {nowPlaying.subtitle && nowPlaying.subtitle !== nowPlaying.title && (
                              <div className="text-xs font-serif italic text-stone-200">
                                “{nowPlaying.subtitle}”
                              </div>
                            )}
                            {upNext && (
                              <div className="text-[11px] font-serif text-stone-400 pt-0.5">
                                Up Next: {upNext.title}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs font-serif text-stone-300 leading-relaxed">
                            {channel.schedule}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => handleWatchEwtnTvChannel(channel.id)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                            isActiveChannel && isEwtnTvPlaying
                              ? 'bg-amber-600 text-stone-950'
                              : 'bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-500/40'
                          }`}
                        >
                          <Tv className="w-3.5 h-3.5 shrink-0" />
                          <span>{isActiveChannel && isEwtnTvPlaying ? 'Playing Above' : 'Watch Live'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(`ewtn-tv:${channel.id}`)}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs font-cinzel font-bold cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                            isFavorite(`ewtn-tv:${channel.id}`)
                              ? 'bg-amber-400 text-stone-950 border-amber-200'
                              : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-stone-600'
                          }`}
                          title="Favorite EWTN TV Channel"
                        >
                          <Star className={`w-3.5 h-3.5 ${isFavorite(`ewtn-tv:${channel.id}`) ? 'fill-stone-950' : ''}`} />
                          <span>{isFavorite(`ewtn-tv:${channel.id}`) ? 'Favorited' : 'Favorite'}</span>
                        </button>
                        <a
                          href={channel.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 text-xs font-sans font-medium flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                          title={`Open ${channel.label} official stream`}
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3 text-amber-400 shrink-0" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: EWTN GLOBAL CATHOLIC RADIO (LIVE 24/7 AUDIO PLAYER) */}
            {ewtnHubTab === 'radio' && (
              <div className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {ewtnRadioStations.map(station => {
                    const isSelected = selectedRadioId === station.id;
                    const isThisPlaying = isSelected && isRadioPlaying;
                    const radioEpg = ewtnEpgMap[station.epgChannelId];
                    const nowPlaying = radioEpg?.nowPlaying;
                    const upNext = radioEpg?.upNext;
                    return (
                      <div
                        key={station.id}
                        onClick={() => handleToggleRadio(station.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-400 shadow-md'
                            : 'bg-black/40 hover:bg-black/60 border-white/15'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-400">
                              24/7 Live Radio Stream
                            </span>
                            <span className={`text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-xs border ${
                              isThisPlaying
                                ? 'bg-red-900/80 text-red-100 border-red-400/50 animate-pulse'
                                : 'bg-stone-900 text-amber-200 border-amber-500/30'
                            }`}>
                              {isThisPlaying ? 'ON AIR NOW' : 'LIVE 24/7'}
                            </span>
                          </div>
                          <h4 className="font-cinzel text-sm font-bold text-white">
                            {station.name}
                          </h4>
                          {nowPlaying ? (
                            <div className="p-2 rounded-lg bg-black/50 border border-amber-500/25 space-y-0.5">
                              <div className="text-[11px] font-cinzel font-bold text-amber-300">
                                On Air: {nowPlaying.title}
                              </div>
                              {nowPlaying.subtitle && nowPlaying.subtitle !== nowPlaying.title && (
                                <div className="text-xs font-serif italic text-stone-200 line-clamp-2">
                                  “{nowPlaying.subtitle}”
                                </div>
                              )}
                              {upNext && (
                                <div className="text-[11px] font-serif text-stone-400 pt-0.5">
                                  Up Next: {upNext.title}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs font-serif text-stone-300 leading-relaxed">
                              {station.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-300">
                            {isThisPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span>{isThisPlaying ? 'Pause Radio' : 'Listen Live'}</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                toggleFavorite(`ewtn-radio:${station.id}`);
                              }}
                              className={`p-1 rounded border cursor-pointer transition-colors ${
                                isFavorite(`ewtn-radio:${station.id}`)
                                  ? 'bg-amber-400 text-stone-950 border-amber-200'
                                  : 'bg-stone-800 text-amber-300 border-stone-600 hover:bg-stone-700'
                              }`}
                              title="Favorite EWTN Radio Station"
                            >
                              <Star className={`w-3 h-3 ${isFavorite(`ewtn-radio:${station.id}`) ? 'fill-stone-950' : ''}`} />
                            </button>
                            <a
                              href={station.portalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-[11px] font-sans text-stone-300 hover:text-amber-200 flex items-center gap-1"
                            >
                              <span>Official Player</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Active Radio Controls Deck */}
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleRadio()}
                      className="w-11 h-11 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                      aria-label={isRadioPlaying ? 'Pause EWTN Radio' : 'Play EWTN Radio'}
                    >
                      {isRadioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <div className="space-y-0.5">
                      <div className="text-xs font-cinzel font-bold text-amber-300">
                        {currentRadioStation.name}
                      </div>
                      <p className="text-xs font-serif text-stone-300">
                        {radioError
                          ? 'Browser blocked direct audio stream — click Official EWTN Radio Player on the right.'
                          : isRadioPlaying
                            ? 'Streaming live EWTN Catholic Radio audio (plays while you browse Catholic Socials).'
                            : 'Click Play to start the live 24/7 EWTN Catholic Radio broadcast.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 bg-stone-900 px-3 py-1.5 rounded-lg border border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsRadioMuted(prev => !prev)}
                        className="text-amber-300 hover:text-white cursor-pointer"
                        aria-label={isRadioMuted ? 'Unmute radio' : 'Mute radio'}
                      >
                        {isRadioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isRadioMuted ? 0 : radioVolume}
                        onChange={e => {
                          setIsRadioMuted(false);
                          setRadioVolume(parseFloat(e.target.value));
                        }}
                        className="w-20 accent-amber-500 cursor-pointer"
                        aria-label="EWTN Radio Volume"
                      />
                    </div>

                    <a
                      href={currentRadioStation.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-amber-900/70 hover:bg-amber-800 text-amber-100 border border-amber-500/40 text-xs font-cinzel font-bold flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Radio className="w-3.5 h-3.5 text-amber-300" />
                      <span>Official EWTN Radio Player</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EWTN 24/7 PERPETUAL EUCHARISTIC ADORATION */}
            {ewtnHubTab === 'adoration' && (
              <div className="space-y-4 text-left">
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#3A2112] via-[#2A180D] to-[#3A2112] border border-[#8B5A2B]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-4 h-4 text-[#D4A373] shrink-0" />
                    <p className="text-xs font-serif text-[#FAF5EE]">
                      <strong className="font-cinzel text-[#E8D8C6]">24/7 Morning, Afternoon &amp; Evening Coverage:</strong> Five chapels stream Perpetual Adoration 24 hours a day (Morning &amp; Evening), and EWTN&apos;s Irondale Chapel streams live 9:30 AM – 6:00 PM ET with an automatic Evening Relay after 6:00 PM ET.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#EFE5D8] border border-[#C8B094] text-[10px] font-cinzel font-bold text-[#3B2314] whitespace-nowrap shrink-0">
                    6 DISTINCT LIVE CHAPELS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ewtnAdorationChapels.map(chapel => {
                    const isActiveChapel = selectedAdorationId === chapel.id;
                    return (
                      <div
                        key={chapel.id}
                        className={`p-5 rounded-xl border transition-all flex flex-col justify-between gap-3.5 ${
                          isActiveChapel
                            ? 'bg-gradient-to-br from-white via-[#FAF5EE] to-[#E6D7C3] border-[#8B5A2B] ring-2 ring-amber-400/60 shadow-[0_8px_24px_rgba(78,47,26,0.22)]'
                            : 'bg-gradient-to-br from-white/95 via-[#FAF5EE]/95 to-[#EFE5D8]/95 border-[#D6C2AC] hover:border-[#8B5A2B] shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <span className="text-[10.5px] font-cinzel font-bold uppercase tracking-wider text-[#5C3A21]">
                              {chapel.location}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#EFE5D8] border border-[#C8B094] text-[9.5px] font-cinzel font-bold text-[#3B2314] tracking-wider uppercase">
                              {chapel.scheduleBadge}
                            </span>
                          </div>
                          <h4 className="font-cinzel text-base font-bold text-[#2A180D]">
                            {chapel.label}
                          </h4>
                          <p className="text-xs font-serif text-[#4E2F1A] leading-relaxed">
                            {chapel.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#D6C2AC]/80">
                          <button
                            type="button"
                            onClick={() => setSelectedAdorationId(chapel.id)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                              isActiveChapel
                                ? 'bg-[#3B2314] text-[#FAF5EE] border border-[#2A180D]'
                                : 'bg-[#5C3A21] hover:bg-[#3B2314] text-[#FAF5EE] border border-[#4E2F1A]'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5 text-[#D4A373]" />
                            <span>{isActiveChapel ? 'Playing Above' : 'Watch Live Adoration'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(`ewtn-adoration:${chapel.id}`)}
                            className={`px-2.5 py-2 rounded-lg border text-xs font-cinzel font-bold cursor-pointer flex items-center gap-1 whitespace-nowrap transition-colors ${
                              isFavorite(`ewtn-adoration:${chapel.id}`)
                                ? 'bg-amber-400 text-stone-950 border-amber-600'
                                : 'bg-white hover:bg-[#F5EDE2] text-[#3B2314] border-[#C8B094]'
                            }`}
                            title="Favorite Adoration Chapel"
                          >
                            <Star className={`w-3.5 h-3.5 ${isFavorite(`ewtn-adoration:${chapel.id}`) ? 'fill-stone-950' : ''}`} />
                            <span>{isFavorite(`ewtn-adoration:${chapel.id}`) ? 'Favorited' : 'Favorite'}</span>
                          </button>
                          <a
                            href={chapel.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg bg-white hover:bg-[#F5EDE2] text-[#3B2314] border border-[#C8B094] text-xs font-cinzel font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors"
                          >
                            <span>Portal</span>
                            <ExternalLink className="w-3 h-3 text-[#70482B]" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          1. CATHOLIC INSTAGRAM SECTION
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'instagram') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#3A1D0D] to-[#241307] px-4 py-3 sm:px-5 sm:py-3.5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC INSTAGRAM
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {selectedIgSource.name} <span className="text-amber-300 font-serif text-sm font-normal">(@{selectedIgSource.username})</span>
              </h3>
              <p className="text-xs text-stone-300 font-serif">
                {selectedIgSource.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(`ig:${selectedIgSource.username}`)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-cinzel font-bold cursor-pointer transition-colors ${
                  isFavorite(`ig:${selectedIgSource.username}`)
                    ? 'bg-amber-400 text-stone-950 border-amber-200'
                    : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/15'
                }`}
                title="Favorite this Instagram Feed"
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite(`ig:${selectedIgSource.username}`) ? 'fill-stone-950' : ''}`} />
                <span>{isFavorite(`ig:${selectedIgSource.username}`) ? 'Favorited' : 'Favorite Feed'}</span>
              </button>

              <button
                onClick={() => {
                  setIgRefreshKey(prev => prev + 1);
                  fetchInstagramShortcodes(selectedIgSource, true);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                title="Refresh & Cycle Instagram Feed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingIg ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <a
                href={selectedIgSource.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>@{selectedIgSource.username}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-3.5">
            {/* Account Selector Bar (Compact arranged buttons) */}
            <div className="rounded-lg bg-[#241307]/[0.025] border border-amber-900/10 p-1.5 sm:p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-1.5 shadow-xs">
              <div className="flex flex-wrap items-center gap-1">
                {[...customIgSources, ...CATHOLIC_INSTAGRAM_SOURCES].map(src => {
                  const starred = isFavorite(`ig:${src.username}`);
                  return (
                    <button
                      key={src.id}
                      onClick={() => setSelectedIgSource(src)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                        selectedIgSource.username === src.username
                          ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                      }`}
                    >
                      {starred && <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 shrink-0" />}
                      <span>{src.name}</span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleCustomInstagramSubmit} className="flex items-center gap-1 shrink-0">
                <input
                  type="text"
                  value={customIgInput}
                  onChange={e => setCustomIgInput(e.target.value)}
                  placeholder="Add @username or Post URL..."
                  className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-36 sm:w-48 placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-800 hover:bg-amber-900 text-amber-50 text-[11px] font-cinzel font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Load</span>
                </button>
              </form>
            </div>

            {/* Single Unified Catholic Instagram Viewer (Two Rows × Three Columns = 6 Posts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {igShortcodes.slice(0, 6).map((code, idx) => (
                <div
                  key={`ig-post-${code}-${igRefreshKey}`}
                  className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <iframe
                    src={`https://www.instagram.com/p/${code.trim()}/embed/captioned/`}
                    title={`Instagram Post ${idx + 1} from @${selectedIgSource.username}`}
                    className="w-full h-[580px] border-0"
                    loading="eager"
                    allow="encrypted-media"
                  />
                  <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-serif text-stone-600">
                    <span className="font-semibold text-stone-700">
                      @{selectedIgSource.username} • <span className="text-amber-800 font-cinzel text-[11px]">Post {idx + 1} of 6</span>
                    </span>
                    <a
                      href={`https://www.instagram.com/p/${code}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold"
                    >
                      <span>View on Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          2. CHRISTENDOM SECTION
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'christendom') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          {/* Header Rectangle */}
          <div className="bg-gradient-to-r from-[#241307] via-[#381111] to-[#1C0D08] px-4 py-3.5 sm:px-5 sm:py-4 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-600 text-white font-cinzel text-[10px] font-bold tracking-widest uppercase shadow-xs">
                  <Tv className="w-3 h-3" />
                  <span>CHRISTENDOM</span>
                </span>
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC MEDIA &amp; LECTURES
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {activeChannel ? (
                  <>
                    {activeChannel.name}{' '}
                    <span className="text-amber-300 font-serif text-sm font-normal">
                      ({activeChannel.handle})
                    </span>
                  </>
                ) : (
                  'Christendom.com'
                )}
              </h3>
              <p className="text-xs text-stone-300 font-serif">
                {activeChannel
                  ? activeChannel.description
                  : 'Talks, homilies, apologetics, sacred liturgy, and theological documentaries from faithful Catholic creators.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activeChannel && (
                <button
                  type="button"
                  onClick={() => toggleFavorite(`christendom:${activeChannel.id}`)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-cinzel font-bold cursor-pointer transition-colors ${
                    isFavorite(`christendom:${activeChannel.id}`)
                      ? 'bg-amber-400 text-stone-950 border-amber-200'
                      : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/15'
                  }`}
                  title="Favorite this Christendom Creator"
                >
                  <Star className={`w-3.5 h-3.5 ${isFavorite(`christendom:${activeChannel.id}`) ? 'fill-stone-950' : ''}`} />
                  <span>{isFavorite(`christendom:${activeChannel.id}`) ? 'Favorited' : 'Favorite Channel'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  fetchChristendomVideos(true);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                title="Refresh Christendom Channels & Videos"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingChristendom ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              {selectedChannelId !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedChannelId('all');
                    setSelectedVideoCategory('All');
                    setVideoSearchQuery('');
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                  title="Show All Channels"
                >
                  <span>All Channels</span>
                </button>
              )}

              <a
                href={activeChannel ? activeChannel.christendomUrl : 'https://www.christendom.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-cinzel font-bold tracking-wider transition-colors shadow-sm"
              >
                <span>Christendom.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 sm:p-5 space-y-4">
            {/* Embedded Christendom Featured / Active Video Player */}
            {activeInPageVideo && (
              <div 
                ref={christendomPlayerRef}
                className="rounded-xl overflow-hidden border border-amber-500/40 bg-black shadow-xl"
              >
                <div className="relative w-full bg-black aspect-[16/9] min-h-[300px] sm:min-h-[400px] md:min-h-[480px]">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeInPageVideo.youtubeId}?autoplay=1`}
                    title={activeInPageVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                </div>

                <div className="p-3.5 sm:p-4 bg-stone-950/95 border-t border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={activeInPageVideo.channelAvatar}
                      alt={activeInPageVideo.channelName}
                      className="w-9 h-9 rounded-full object-cover border border-amber-500/40 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0 text-left">
                      <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-400 block truncate">
                        {activeInPageVideo.channelName} • {activeInPageVideo.category}
                      </span>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-white truncate">
                        {activeInPageVideo.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveInPageVideo(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-600 text-xs font-sans flex items-center gap-1 cursor-pointer"
                      title="Close video player"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Catholic Channel Selector Bar */}
            <div className="rounded-lg bg-[#241307]/[0.025] border border-amber-900/10 p-1.5 sm:p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-2 shadow-xs">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedChannelId('all');
                    setChristendomOffset(0);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                    selectedChannelId === 'all'
                      ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                  }`}
                >
                  All Channels ({christendomVideos.length})
                </button>
                {CHRISTENDOM_CHANNELS.map(ch => {
                  const isSelected = selectedChannelId === ch.id;
                  const starred = isFavorite(`christendom:${ch.id}`);
                  const shortName = ch.name.replace(/\s*\(.*\)/, '');
                  const channelCount = christendomVideos.filter(v => v.channelId === ch.id).length;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChannelId(ch.id);
                        setChristendomOffset(0);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                      }`}
                    >
                      {starred && <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 shrink-0" />}
                      <img
                        src={ch.avatarUrl}
                        alt=""
                        className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span>{shortName} ({channelCount})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Video Input */}
              <div className="relative shrink-0 pt-0.5 xl:pt-0">
                <Search className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={videoSearchQuery}
                  onChange={e => setVideoSearchQuery(e.target.value)}
                  placeholder="Search Catholic talks &amp; lectures..."
                  className="pl-7 pr-2.5 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-36 sm:w-52 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              {videoCategories.map(cat => {
                const isSelected = selectedVideoCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedVideoCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-cinzel font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-900 text-amber-100 border-amber-800 shadow-xs'
                        : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Videos Grid */}
            {filteredVideos.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-serif text-stone-600">
                  No Catholic presentations found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedChannelId('all');
                    setSelectedVideoCategory('All');
                    setVideoSearchQuery('');
                  }}
                  className="px-3 py-1 rounded-md bg-[#241307] text-amber-200 text-xs font-cinzel cursor-pointer"
                >
                  Show All Videos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredVideos.map(video => (
                  <div
                    key={video.id}
                    className="group rounded-xl bg-white border border-stone-200 hover:border-amber-600/60 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Video Thumbnail with Duration & Play Button */}
                      <div
                        onClick={() => setActiveVideo(video)}
                        className="relative aspect-video w-full overflow-hidden bg-stone-950 cursor-pointer"
                        title={`Watch "${video.title}"`}
                      >
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          loading="lazy"
                          onLoad={(e) => {
                            const target = e.currentTarget;
                            const hq = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                            if (target.naturalWidth <= 120 && !target.src.includes('hqdefault.jpg')) {
                              target.src = hq;
                            }
                          }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            const hq = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                            const mq = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                            if (!target.src.includes('hqdefault.jpg') && !target.src.includes('mqdefault.jpg')) {
                              target.src = hq;
                            } else if (target.src.includes('hqdefault.jpg')) {
                              target.src = mq;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Duration Pill */}
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-medium">
                          {video.duration}
                        </div>

                        {/* Category Tag */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-amber-200 text-[10px] font-cinzel font-bold uppercase tracking-wider">
                          {video.category}
                        </div>
                      </div>

                      {/* Video Meta Info */}
                      <div className="p-3.5 space-y-2">
                        <div className="flex items-start gap-2.5">
                          <img
                            src={video.channelAvatar}
                            alt={video.channelName}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-8 h-8 rounded-full object-cover border border-amber-500/40 shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 flex-1">
                            <h4
                              onClick={() => setActiveVideo(video)}
                              className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-950 transition-colors line-clamp-2 leading-snug cursor-pointer"
                            >
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] font-serif text-stone-600 mt-1">
                              <span className="truncate">{video.channelName}</span>
                              {video.verified && (
                                <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-serif text-stone-400">
                              <span>{video.views}</span>
                              <span>•</span>
                              <span>{video.publishedAt}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] font-serif text-stone-600 line-clamp-2 leading-relaxed pt-1 border-t border-stone-100">
                          {video.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-3.5 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2 text-xs font-serif">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 font-cinzel font-bold cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-red-700" />
                        <span>Watch Video</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(`christendom:${video.channelId}`)}
                          className={`p-1 rounded border cursor-pointer transition-colors ${
                            isFavorite(`christendom:${video.channelId}`)
                              ? 'bg-amber-100 border-amber-400 text-amber-600'
                              : 'bg-white border-stone-200 text-stone-400 hover:text-amber-600'
                          }`}
                          title={`Favorite ${video.channelName}`}
                        >
                          <Star className={`w-3 h-3 ${isFavorite(`christendom:${video.channelId}`) ? 'fill-amber-500' : ''}`} />
                        </button>
                        <a
                          href={video.christendomUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-900 text-[11px] font-serif"
                        >
                          <span>Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          3. ACTIVE VIDEO THEATER MODAL (PORTALED TO DOCUMENT BODY)
          ===================================================================== */}
      {activeVideo && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#18120E] text-stone-100 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#241307] border-b border-amber-500/30 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-cinzel text-[10px] font-bold tracking-wider uppercase shrink-0">
                  Christendom.com
                </span>
                <span className="font-serif text-xs sm:text-sm text-amber-200 truncate">
                  {activeVideo.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Close Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black shrink-0">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Scrollable Video Details */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-cinzel text-base sm:text-xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-stone-300 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{activeVideo.views}</span>
                    </span>
                    <span>•</span>
                    <span>{activeVideo.publishedAt}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/40 text-[10px]">
                      {activeVideo.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 font-semibold">
                    <ThumbsUp className="w-3 h-3 text-amber-400" />
                    <span>{activeVideo.likes}</span>
                  </span>
                </div>
              </div>

              {/* Channel Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeVideo.channelAvatar}
                    alt={activeVideo.channelName}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-cinzel font-bold text-sm text-white truncate">
                        {activeVideo.channelName}
                      </h4>
                      {activeVideo.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] font-serif text-stone-400">
                      Catholic Creator on Christendom.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeVideo.christendomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-cinzel font-bold tracking-wider transition-colors shrink-0"
                  >
                    <span>Open on Christendom</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800 text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                {activeVideo.description}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
