import React, { useState } from 'react';

export interface SacramentDetail {
  id: string;
  name: string;
  latinName: string;
  group: 'Initiation' | 'Healing' | 'Service';
  matter: string; // The physical material / sensible sign
  form: string; // The spoken liturgical formula
  ordinaryMinister: string;
  effects: string[];
  scripturalInstitution: string;
  catechismRef: string;
  indelibleCharacter: boolean;
  description: string;
}

export const SACRAMENTS_DATA: SacramentDetail[] = [
  {
    id: 'sacrament-baptism',
    name: 'Holy Baptism',
    latinName: 'Baptismus',
    group: 'Initiation',
    matter: 'True water poured thrice over the head (or triple immersion).',
    form: '"[Name], I baptize you in the name of the Father, and of the Son, and of the Holy Spirit."',
    ordinaryMinister: 'Bishop, Priest, or Deacon (in danger of death, any person with the Church\'s intention).',
    effects: [
      'Remission of original sin and all personal sins and temporal punishments.',
      'Infusion of sanctifying grace, theological virtues (faith, hope, charity), and gifts of the Holy Spirit.',
      'Birth as an adopted child of the Father, member of the Mystical Body of Christ, and temple of the Spirit.',
      'Imprints an indelible spiritual mark (character) upon the soul; can never be repeated.'
    ],
    scripturalInstitution: 'Matthew 28:19–20 ("Go therefore and make disciples of all nations, baptizing them..."); John 3:5',
    catechismRef: 'CCC 1213–1284',
    indelibleCharacter: true,
    description: 'The gateway to life in the Spirit and the door which gives access to the other sacraments. Through Baptism we are freed from sin and reborn as sons and daughters of God.'
  },
  {
    id: 'sacrament-confirmation',
    name: 'Confirmation',
    latinName: 'Confirmatio',
    group: 'Initiation',
    matter: 'Anointing with Sacred Chrism on the forehead with the laying on of the hand.',
    form: '"Be sealed with the Gift of the Holy Spirit."',
    ordinaryMinister: 'The Bishop (or a priest delegated by the Bishop or canon law).',
    effects: [
      'Full outpouring of the Holy Spirit as once granted to the Apostles on Pentecost.',
      'Rooting us more deeply in divine filiation (adoption as sons of God).',
      'Uniting us more firmly to Christ and increasing the seven gifts of the Holy Spirit.',
      'Rendering our bond with the Catholic Church more perfect and granting special strength to profess the Faith boldly.',
      'Imprints an indelible spiritual mark upon the soul; cannot be repeated.'
    ],
    scripturalInstitution: 'Acts 8:14–17 (Peter and John laying hands on the baptized); Acts 19:6; Isaiah 11:2',
    catechismRef: 'CCC 1285–1321',
    indelibleCharacter: true,
    description: 'Necessary for the completion of baptismal grace. By the sacrament of Confirmation, the baptized are more perfectly bound to the Church and enriched with a special strength of the Holy Spirit.'
  },
  {
    id: 'sacrament-eucharist',
    name: 'The Holy Eucharist',
    latinName: 'Eucharistia',
    group: 'Initiation',
    matter: 'Wheaten bread and natural grape wine (mixed with a few drops of water).',
    form: 'The words of consecration spoken in persona Christi: "This is my Body... This is the Chalice of my Blood..."',
    ordinaryMinister: 'Validly ordained Priest or Bishop.',
    effects: [
      'Substantial union with Jesus Christ: Body, Blood, Soul, and Divinity (Transubstantiation).',
      'Preserves, increases, and renews the life of grace received at Baptism.',
      'Separates us from sin, cleanses venial sins, and preserves from future mortal sins.',
      'Unites the faithful into one mystical body, the Church, and pledges future resurrection.'
    ],
    scripturalInstitution: 'Matthew 26:26–28; Luke 22:19–20; 1 Corinthians 11:23–26; John 6:51–58',
    catechismRef: 'CCC 1322–1419',
    indelibleCharacter: false,
    description: 'The source and summit of the entire Christian life. In the blessed Eucharist is contained the whole spiritual good of the Church, namely Christ Himself, our Pasch.'
  },
  {
    id: 'sacrament-penance',
    name: 'Penance and Reconciliation (Confession)',
    latinName: 'Paenitentia',
    group: 'Healing',
    matter: 'The penitent\'s acts: Contrition (sorrow for sin), Confession of all mortal sins by kind and number, and Satisfaction (firm purpose of amendment and doing penance).',
    form: 'The priest\'s words of sacramental absolution: "God, the Father of mercies... I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit."',
    ordinaryMinister: 'Validly ordained Priest or Bishop possessing jurisdiction / faculties.',
    effects: [
      'Reconciliation with God by which the penitent recovers sanctifying grace lost by mortal sin.',
      'Reconciliation with the Church, restoring the communion broken or damaged by sin.',
      'Remission of eternal punishment incurred by mortal sins and partial remission of temporal punishments.',
      'Restoration of peace, serenity of conscience, and spiritual strength for Christian combat.'
    ],
    scripturalInstitution: 'John 20:21–23 ("Receive the Holy Spirit. If you forgive the sins of any, they are forgiven; if you retain the sins of any, they are retained."); Matthew 16:19',
    catechismRef: 'CCC 1422–1498',
    indelibleCharacter: false,
    description: 'Those who approach the sacrament of Penance obtain pardon from God\'s mercy for the offense committed against Him, and are, at the same time, reconciled with the Church.'
  },
  {
    id: 'sacrament-anointing',
    name: 'Anointing of the Sick',
    latinName: 'Unctio Infirmorum',
    group: 'Healing',
    matter: 'Anointing with the Oil of the Sick (blessed by the bishop on Holy Thursday) on the forehead and hands.',
    form: '"Through this holy anointing may the Lord in his love and mercy help you with the grace of the Holy Spirit. May the Lord who frees you from sin save you and raise you up."',
    ordinaryMinister: 'Only Priests (bishops and presbyters).',
    effects: [
      'The uniting of the sick person to the Passion of Christ for his own good and that of the whole Church.',
      'Strengthening, peace, and courage to endure humanely the sufferings of illness or old age.',
      'The forgiveness of sins if the sick person was not able to obtain it through Confession.',
      'The restoration of bodily health if it is conducive to the salvation of his soul.',
      'Preparation for passing over to eternal life (the Last Rites).'
    ],
    scripturalInstitution: 'James 5:14–15 ("Is any among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord..."); Mark 6:13',
    catechismRef: 'CCC 1499–1532',
    indelibleCharacter: false,
    description: 'By the sacred anointing of the sick and the prayer of the priests the whole Church commends those who are ill to the suffering and glorified Lord, that He may raise them up and save them.'
  },
  {
    id: 'sacrament-holy-orders',
    name: 'Holy Orders',
    latinName: 'Ordo',
    group: 'Service',
    matter: 'The imposition of hands by the Bishop upon the head of the ordinand.',
    form: 'The solemn consecratory prayer of ordination proper to each degree (Episcopate, Presbyterate, Diaconate).',
    ordinaryMinister: 'Validly consecrated Bishop (three bishops for the consecration of a Bishop).',
    effects: [
      'Configures the recipient to Christ as Priest, Teacher, and Pastor, giving the sacred power to act in persona Christi Capitis.',
      'Confers the sacramental grace proper to the exercise of the ordained ministry.',
      'Imprints an indelible spiritual character upon the soul, making him a priest forever according to the order of Melchizedek; cannot be repeated or revoked.'
    ],
    scripturalInstitution: 'Luke 22:19 ("Do this in remembrance of me"); 2 Timothy 1:6; Titus 1:5; Acts 6:6',
    catechismRef: 'CCC 1536–1600',
    indelibleCharacter: true,
    description: 'The sacrament through which the mission entrusted by Christ to His Apostles continues to be exercised in the Church until the end of time: the three degrees of Bishop, Priest, and Deacon.'
  },
  {
    id: 'sacrament-matrimony',
    name: 'Holy Matrimony',
    latinName: 'Matrimonium',
    group: 'Service',
    matter: 'The mutual surrender and acceptance of one another by the baptized man and woman through their free, irrevocable consent.',
    form: 'The exchange of matrimonial consent: "I take you to be my wife/husband... to have and to hold from this day forward..."',
    ordinaryMinister: 'The spouses themselves (in the Latin Church) administer the sacrament to each other; the priest or deacon assists as the Church\'s official witness.',
    effects: [
      'A perpetual and exclusive bond sealed by God Himself which can never be dissolved (*consummatum et ratum*).',
      'Sacramental grace to love each other with the sacrificial love wherewith Christ loved the Church, to sanctify each other, and to raise children for God\'s Kingdom.',
      'Elevation of natural human marriage to a supernatural sign of the covenant between Christ and His Bride, the Church.'
    ],
    scripturalInstitution: 'Matthew 19:4–6 ("What therefore God has joined together, let not man put asunder"); Ephesians 5:25, 31–32; John 2:1–11 (Wedding at Cana)',
    catechismRef: 'CCC 1601–1666',
    indelibleCharacter: false,
    description: 'The matrimonial covenant, by which a man and a woman establish between themselves a partnership of the whole of life, is by its nature ordered toward the good of the spouses and the procreation and education of offspring.'
  }
];

export const SacramentsCatechismView: React.FC = () => {
  const [selectedSacrament, setSelectedSacrament] = useState<SacramentDetail>(SACRAMENTS_DATA[0]);
  const [activeGroup, setActiveGroup] = useState<'All' | 'Initiation' | 'Healing' | 'Service'>('All');

  const filtered = SACRAMENTS_DATA.filter(s => activeGroup === 'All' || s.group === activeGroup);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 text-amber-50 shadow-md border border-amber-900/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
            Septem Sacramenta • Channels of Divine Grace
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-normal">
          Catechism on the Seven Sacraments
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-serif max-w-2xl mt-1">
          "The sacraments are efficacious signs of grace, instituted by Christ and entrusted to the Church, by which divine life is dispensed to us." (CCC 1131)
        </p>

        {/* Group tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          {(['All', 'Initiation', 'Healing', 'Service'] as const).map(grp => (
            <button
              key={grp}
              onClick={() => setActiveGroup(grp)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-serif transition-all cursor-pointer ${
                activeGroup === grp
                  ? 'bg-amber-400 text-amber-950 shadow-sm font-bold'
                  : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
              }`}
            >
              {grp === 'All' ? 'All Seven Sacraments' : `Sacraments of ${grp}`}
            </button>
          ))}
        </div>
      </div>

      {/* Sacraments Selector Pills */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-stone-200 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filtered.map(s => {
          const isSelected = s.id === selectedSacrament.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSacrament(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Selected Sacrament Master Card */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-serif">
                Sacrament of {selectedSacrament.group}
              </span>
              {selectedSacrament.indelibleCharacter && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold uppercase tracking-wider font-serif" title="Imprints an unrepeatable spiritual seal">
                  Indelible Character
                </span>
              )}
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {selectedSacrament.name}
            </h4>
            <p className="text-xs text-amber-900 font-serif italic">
              {selectedSacrament.latinName} • {selectedSacrament.catechismRef}
            </p>
          </div>

          <span className="text-xs font-semibold text-stone-500 font-serif-sacred max-w-xs self-start sm:self-auto">
            {selectedSacrament.scripturalInstitution}
          </span>
        </div>

        {/* Short Summary */}
        <p className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed">
          {selectedSacrament.description}
        </p>

        {/* The 4 Essential Components: Matter, Form, Minister, Scripture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Matter */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
            <h5 className="text-sm font-bold font-serif text-amber-950 tracking-wide block">
              1. Sensible Matter (The Outward Sign)
            </h5>
            <p className="text-xs sm:text-sm text-stone-700 font-serif">
              {selectedSacrament.matter}
            </p>
          </div>

          {/* Form */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
            <h5 className="text-sm font-bold font-serif text-amber-950 tracking-wide block">
              2. Sacramental Form (The Spoken Words)
            </h5>
            <p className="text-xs sm:text-sm text-stone-800 font-serif italic font-medium">
              {selectedSacrament.form}
            </p>
          </div>

          {/* Minister */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
            <h5 className="text-sm font-bold font-serif text-amber-950 tracking-wide block">
              3. Ordinary Minister
            </h5>
            <p className="text-xs sm:text-sm text-stone-700 font-serif">
              {selectedSacrament.ordinaryMinister}
            </p>
          </div>

          {/* Scriptural Institution */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1">
            <h5 className="text-sm font-bold font-serif text-amber-950 tracking-wide block">
              4. Institution by Jesus Christ
            </h5>
            <p className="text-xs sm:text-sm text-stone-700 font-serif">
              {selectedSacrament.scripturalInstitution}
            </p>
          </div>

        </div>

        {/* Supernatural Effects and Graces */}
        <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-sm tracking-wide">
            <span>Spiritual Graces and Supernatural Effects (Ex Opere Operato)</span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-stone-800 font-serif-sacred">
            {selectedSacrament.effects.map((effect, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </div>

      </article>

    </div>
  );
};
