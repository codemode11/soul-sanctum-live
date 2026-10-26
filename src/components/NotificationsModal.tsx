import React, { useState } from 'react';
import { 
  BellRing, 
  Clock, 
  Volume2, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';
import { NotificationPreference } from '../types';
import { loadNotificationPreferences, saveNotificationPreferences } from '../data/notifications';
import { bellSynth } from '../utils/audioSynth';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(loadNotificationPreferences);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testTriggered, setTestTriggered] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    setPreferences(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, enabled: !p.enabled };
    }));
  };

  const handleTimeChange = (id: string, newTime: string) => {
    setPreferences(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, time: newTime };
    }));
  };

  const handleSave = () => {
    saveNotificationPreferences(preferences);
    setSavedSuccess(true);
    bellSynth.playBeadChime();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestChime = () => {
    setTestTriggered(true);
    bellSynth.playNoonChimes();
    setTimeout(() => setTestTriggered(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-800" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-900">
                Liturgical Reminders
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              Customize Daily Notifications
            </h3>
            <p className="text-xs text-stone-600 font-serif-sacred">
              Select which sacred content you wish to be prompted for and set your preferred hours.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {preferences.map(pref => (
            <div
              key={pref.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                pref.enabled 
                  ? 'bg-amber-50/50 border-amber-300/80 shadow-2xs' 
                  : 'bg-stone-50 border-stone-200 opacity-70'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-cinzel text-sm font-bold text-stone-900">
                    {pref.title}
                  </h4>
                  {pref.enabled && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  {pref.description}
                </p>
              </div>

              {/* Time Picker and Toggle */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-stone-300 text-xs">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="time"
                    value={pref.time}
                    disabled={!pref.enabled}
                    onChange={(e) => handleTimeChange(pref.id, e.target.value)}
                    className="font-medium text-stone-800 bg-transparent focus:outline-none disabled:opacity-50 cursor-pointer"
                  />
                </div>

                {/* Switch checkbox */}
                <button
                  onClick={() => handleToggle(pref.id)}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                    pref.enabled ? 'bg-amber-800' : 'bg-stone-300'
                  }`}
                  title={pref.enabled ? 'Enabled' : 'Disabled'}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    pref.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Test Chime and Save Toolbar */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={handleTestChime}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              testTriggered 
                ? 'bg-amber-100 text-amber-950 border-amber-400' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-800" />
            <span>{testTriggered ? 'Tolling Cathedral Bell...' : 'Test Chime Sound'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <ShieldCheck className="w-4 h-4" />}
              <span>{savedSuccess ? 'Preferences Saved!' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
