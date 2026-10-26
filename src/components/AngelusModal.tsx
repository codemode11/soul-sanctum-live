import React, { useState } from 'react';
import { Bell, Volume2, X, Sparkles, Music } from 'lucide-react';
import { bellSynth } from '../utils/audioSynth';
import { SacredReader } from '../utils/speech';

interface AngelusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AngelusModal: React.FC<AngelusModalProps> = ({ isOpen, onClose }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bellStatus, setBellStatus] = useState<string>('');

  if (!isOpen) return null;

  const handleTollBells = () => {
    bellSynth.playAngelusToll((status) => {
      setBellStatus(status);
    });
  };

  const handleGrandPeal = () => {
    bellSynth.playGrandCathedralPeal((status) => {
      setBellStatus(status);
    });
  };

  const handleReadAngelus = () => {
    if (isPlayingAudio) {
      SacredReader.stop();
      setIsPlayingAudio(false);
    } else {
      const speech = `The Angelus.
The Angel of the Lord declared unto Mary, and she conceived of the Holy Spirit. Hail Mary, full of grace...
Behold the handmaid of the Lord, be it done unto me according to thy word. Hail Mary...
And the Word was made flesh, and dwelt among us. Hail Mary...
Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.
Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.`;
      SacredReader.speak(speech, () => setIsPlayingAudio(false));
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-800 animate-bounce" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-900">
                Traditional 6am, 12pm and 6pm Prayer
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              The Angelus (Angelus Domini)
            </h3>
          </div>

          <button
            onClick={() => {
              SacredReader.stop();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>



        {/* Angelus Versicles and Responses */}
        <div className="space-y-4 font-serif-sacred text-stone-900 text-base leading-relaxed">
          <div className="space-y-1 pl-3 border-l-2 border-amber-800/40">
            <p><span className="font-bold font-cinzel text-amber-900">V.</span> The Angel of the Lord declared unto Mary.</p>
            <p className="font-medium"><span className="font-bold font-cinzel text-amber-900">R.</span> And she conceived of the Holy Spirit.</p>
            <p className="text-xs text-stone-500 italic mt-1">(Pray 1 Hail Mary)</p>
          </div>

          <div className="space-y-1 pl-3 border-l-2 border-amber-800/40">
            <p><span className="font-bold font-cinzel text-amber-900">V.</span> Behold the handmaid of the Lord.</p>
            <p className="font-medium"><span className="font-bold font-cinzel text-amber-900">R.</span> Be it done unto me according to thy word.</p>
            <p className="text-xs text-stone-500 italic mt-1">(Pray 1 Hail Mary)</p>
          </div>

          <div className="space-y-1 pl-3 border-l-2 border-amber-800/40">
            <p><span className="font-bold font-cinzel text-amber-900">V.</span> And the Word was made flesh. <span className="text-xs italic text-stone-500">(All genuflect or bow)</span></p>
            <p className="font-medium"><span className="font-bold font-cinzel text-amber-900">R.</span> And dwelt among us.</p>
            <p className="text-xs text-stone-500 italic mt-1">(Pray 1 Hail Mary)</p>
          </div>

          <div className="pt-2 text-sm text-stone-700">
            <p><span className="font-bold font-cinzel text-amber-900">V.</span> Pray for us, O holy Mother of God.</p>
            <p className="font-medium"><span className="font-bold font-cinzel text-amber-900">R.</span> That we may be made worthy of the promises of Christ.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 space-y-1">
            <span className="font-bold font-cinzel text-amber-950 block">Let us pray:</span>
            <p className="italic">
              Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-stone-200">
          <button
            onClick={handleReadAngelus}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isPlayingAudio ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-stone-700 hover:bg-stone-100'
            }`}
            title="Audio Narration"
            aria-label="Audio Narration"
          >
            <Volume2 className="w-4 h-4 text-amber-800" />
            <span>{isPlayingAudio ? 'Stop Narration' : 'Narrate Prayer'}</span>
          </button>

          <button
            onClick={() => {
              SacredReader.stop();
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold cursor-pointer transition-colors"
          >
            Amen
          </button>
        </div>

      </div>
    </div>
  );
};

