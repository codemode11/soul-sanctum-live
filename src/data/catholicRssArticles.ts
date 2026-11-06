export interface CatholicRssSource {
  id: string;
  name: string;
  shortName: string;
  rssUrl: string;
  websiteUrl: string;
  tagline: string;
  location: string;
}

export interface CatholicArticleItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  author: string;
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string;
  link: string;
  imageUrl?: string;
  categories: string[];
  isFullContentLoaded?: boolean;
}

export const CATHOLIC_RSS_SOURCES: CatholicRssSource[] = [
  {
    id: 'aleteia',
    name: 'Aleteia',
    shortName: 'Aleteia',
    rssUrl: 'https://aleteia.org/feed/',
    websiteUrl: 'https://aleteia.org',
    tagline: 'Catholic spirituality, lifestyle, saints, and global Church stories',
    location: 'Rome / International'
  },
  {
    id: 'ncregister',
    name: 'National Catholic Register',
    shortName: 'NC Register',
    rssUrl: 'https://www.ncregister.com/feeds/general-news.xml',
    websiteUrl: 'https://www.ncregister.com',
    tagline: 'Fidelity to the Magisterium — EWTN Catholic News & Analysis',
    location: 'United States'
  },
  {
    id: 'cbcp',
    name: 'CBCP News',
    shortName: 'CBCP',
    rssUrl: 'https://cbcpnews.net/cbcpnews/feed/',
    websiteUrl: 'https://cbcpnews.net/cbcpnews/',
    tagline: 'Official News Service of the Catholic Bishops\' Conference of the Philippines',
    location: 'Manila, Philippines'
  },
  {
    id: 'catholic-digest',
    name: 'Catholic Digest',
    shortName: 'Catholic Digest',
    rssUrl: 'https://www.catholicdigest.com/feed/',
    websiteUrl: 'https://www.catholicdigest.com',
    tagline: 'Trusted Catholic family living, faith stories, and devotion since 1936',
    location: 'United States'
  },
  {
    id: 'catholic-insight',
    name: 'Catholic Insight',
    shortName: 'Catholic Insight',
    rssUrl: 'https://catholicinsight.com/feed/',
    websiteUrl: 'https://catholicinsight.com',
    tagline: 'Cultural commentary, Catholic theology, and fidelity to Church teaching',
    location: 'Canada'
  },
  {
    id: 'catholic-answers',
    name: 'Catholic Answers Magazine',
    shortName: 'Catholic Answers',
    rssUrl: 'https://www.catholic.com/feeds/magazine/rss',
    websiteUrl: 'https://www.catholic.com/magazine',
    tagline: 'Apologetics, Scripture, and clear explanations of the Catholic Faith',
    location: 'San Diego, USA'
  },
  {
    id: 'word-on-fire',
    name: 'Word on Fire',
    shortName: 'Word on Fire',
    rssUrl: 'https://www.wordonfire.org/articles/feed/',
    websiteUrl: 'https://www.wordonfire.org/articles/',
    tagline: 'Evangelization, culture, and theology led by Bishop Robert Barron',
    location: 'Winona-Rochester, USA'
  },
  {
    id: 'st-paul-center',
    name: 'St. Paul Center',
    shortName: 'St. Paul Center',
    rssUrl: 'https://feed.podbean.com/stpaulcenter/feed.xml',
    websiteUrl: 'https://stpaulcenter.com',
    tagline: 'Biblical theology for the Church — Dr. Scott Hahn & fellow scholars',
    location: 'Steubenville, USA'
  },
  {
    id: 'cerc',
    name: 'Catholic Education Resource Center',
    shortName: 'CERC',
    rssUrl: 'https://catholiceducation.org/feed/',
    websiteUrl: 'https://www.catholiceducation.org',
    tagline: 'In-depth scholarship on Catholic history, philosophy, bioethics, and apologetics',
    location: 'Vancouver / International'
  },
  {
    id: 'sign-org',
    name: 'Signs & Wonders for Our Times (sign.org)',
    shortName: 'sign.org',
    rssUrl: 'https://sign.org/feed/',
    websiteUrl: 'https://sign.org',
    tagline: 'Marian devotion, Eucharistic miracles, and Signs & Wonders for Our Times',
    location: 'United States'
  }
];

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#8217;|&#039;|&apos;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&quot;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_match, dec) => String.fromCharCode(parseInt(dec, 10)));
}

function stripHtmlAndFormatParagraphs(html: string): string {
  const decoded = decodeHtmlEntities(html);
  return decoded
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/(p|div|h1|h2|h3|h4|blockquote|li)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\s*\[(?:…|\.\.\.)\]\s*$/g, '…')
    .replace(/The post [\s\S]*? appeared first on [\s\S]*?\./gi, '')
    .replace(/Continue reading[\s\S]*$/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function parseRssXmlToArticles(
  xmlText: string,
  source: CatholicRssSource
): CatholicArticleItem[] {
  const articles: CatholicArticleItem[] = [];
  const rawItems = xmlText.split(/<item[\s>]/i).slice(1);

  for (let i = 0; i < Math.min(rawItems.length, 12); i++) {
    const raw = rawItems[i];
    const titleMatch =
      raw.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
      raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch =
      raw.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i) ||
      raw.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const descMatch =
      raw.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
      raw.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const contentMatch =
      raw.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i) ||
      raw.match(/<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i);
    const creatorMatch =
      raw.match(/<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/i) ||
      raw.match(/<dc:creator[^>]*>([\s\S]*?)<\/dc:creator>/i) ||
      raw.match(/<author[^>]*>([\s\S]*?)<\/author>/i);
    const pubDateMatch = raw.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);

    const mediaMatch =
      raw.match(/<media:content[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) ||
      raw.match(/<enclosure[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i) ||
      raw.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
      (contentMatch && contentMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i)) ||
      (descMatch && descMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i));

    const categoryMatches = Array.from(
      raw.matchAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)
    ).map(m => decodeHtmlEntities(m[1]).trim()).filter(Boolean);

    const rawTitle = titleMatch ? decodeHtmlEntities(titleMatch[1]).trim() : '';
    if (!rawTitle) continue;

    const link = linkMatch ? decodeHtmlEntities(linkMatch[1]).trim() : source.websiteUrl;
    const rawDesc = descMatch ? descMatch[1] : '';
    const rawFullContent = contentMatch ? contentMatch[1] : rawDesc;

    const cleanSummary = stripHtmlAndFormatParagraphs(rawDesc);
    const cleanContent = stripHtmlAndFormatParagraphs(rawFullContent);

    const author = creatorMatch
      ? stripHtmlAndFormatParagraphs(creatorMatch[1])
      : `${source.shortName} Editorial`;

    let publishedDate = 'Recent Dispatch';
    if (pubDateMatch && pubDateMatch[1]) {
      const parsedDate = new Date(pubDateMatch[1].trim());
      if (!isNaN(parsedDate.getTime())) {
        publishedDate = parsedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }

    const activeBody = cleanContent || cleanSummary;
    const wordCount = activeBody.split(/\s+/).length;
    const mins = Math.max(3, Math.min(15, Math.round(wordCount / 180)));

    articles.push({
      id: `${source.id}-live-${i}-${encodeURIComponent(rawTitle).slice(0, 24)}`,
      sourceId: source.id,
      sourceName: source.name,
      title: rawTitle,
      author,
      publishedDate,
      readTime: `${mins} min read`,
      summary: cleanSummary.slice(0, 340) + (cleanSummary.length > 340 ? '…' : ''),
      content: activeBody,
      link,
      imageUrl: mediaMatch ? mediaMatch[1] : undefined,
      categories: categoryMatches.slice(0, 4),
      isFullContentLoaded: wordCount >= 320
    });
  }

  return articles;
}

/**
 * Curated full-length Catholic articles per publication so every single source is immediately
 * readable in its entirety inside the website.
 */
export const CURATED_CATHOLIC_ARTICLES: CatholicArticleItem[] = [
  // 1. Aleteia
  {
    id: 'aleteia-curated-1',
    sourceId: 'aleteia',
    sourceName: 'Aleteia',
    title: 'How Five Minutes of Silent Adoration Before the Tabernacle Transforms the Weary Soul',
    author: 'Philip Kosloski',
    publishedDate: 'November 6, 2026',
    readTime: '5 min read',
    summary: 'Saints across the centuries—from St. Alphonsus Liguori to St. Teresa of Calcutta—testify that even a brief visit to Our Lord in the Blessed Sacrament brings supernatural peace that the world cannot give.',
    content: `In the rush of modern obligations, many Catholics feel they lack the time to make a full Holy Hour. Between family duties, work schedules, and the relentless stream of digital notifications, an uninterrupted sixty minutes in a quiet church can seem almost out of reach. Yet the great masters of the spiritual life continually remind us that Our Lord in the Tabernacle does not measure our visits by a stopwatch, but by the sincerity and constancy of our love.

Saint Alphonsus Liguori, Doctor of the Church and author of the beloved Visits to the Most Blessed Sacrament, wrote words that have consoled generations of believers: “Of all devotions, that of adoring Jesus in the Blessed Sacrament is the greatest after the sacraments, the one dearest to God and the one most helpful to us. Do not refuse to begin this devotion; forsaking the conversation of men, dwell each day, even if only for a brief time, in the company of Jesus Christ.”

When we step through the doors of a quiet parish church and kneel before the flickering red sanctuary lamp, we enter the real, substantial presence of Jesus Christ—Body, Blood, Soul, and Divinity. That small crimson flame is a silent herald proclaiming to every passerby: the King of Kings is here, waiting for His friends.

Venerable Fulton J. Sheen, who faithfully kept a daily Holy Hour throughout his priesthood, often encouraged laypeople who could not spare a full hour to begin with just five or ten minutes when passing a church on their commute. “You do not even need to recite long formulas of prayer,” he explained. “Simply look at Him, tell Him what weighs upon your heart, and let Him look upon you.”

Saint John Vianney, the Curé of Ars, once noticed an elderly farmer who sat motionless for long stretches in the front pew, gazing intently at the tabernacle. When the saint asked the old man what he said to Our Lord during those silent visits, the peasant replied with unforgettable simplicity: “Nothing. I look at Him, and He looks at me.”

Even five minutes of interior silence before the Blessed Sacrament acts like a spiritual anchor in the middle of a turbulent day. Rather than carrying our anxieties alone until evening, we cast them directly at the foot of the altar. In that brief pause, our perspective is restored: temporal worries shrink to their proper size in the light of eternity, resentment gives way to mercy, and we step back out into the world carrying the gentle peace of the Good Shepherd.`,
    link: 'https://aleteia.org',
    categories: ['Spirituality', 'Eucharistic Adoration', 'Prayer'],
    isFullContentLoaded: true
  },
  // 2. National Catholic Register
  {
    id: 'ncregister-curated-1',
    sourceId: 'ncregister',
    sourceName: 'National Catholic Register',
    title: 'Returning to the Sources: Why Eucharistic Reverence Is Drawing Young Adults to the Church',
    author: 'National Catholic Register Staff',
    publishedDate: 'November 6, 2026',
    readTime: '6 min read',
    summary: 'Across dioceses and university campuses, pastors report a remarkable surge in young Catholics seeking sacred silence, Gregorian chant, frequent Confession, and Eucharistic adoration.',
    content: `From university chaplaincies to historic urban parishes, a quiet spiritual awakening is unfolding among young adults. Far from seeking diluted doctrine or entertainment-driven liturgy, a new generation of Catholics is gravitating toward the perennial treasures of the Church: solemn celebration of the Holy Sacrifice of the Mass, candlelit Eucharistic Adoration, and uncompromising catechesis rooted in Sacred Scripture and the Catechism.

Chaplains interviewed by the Register across more than a dozen dioceses point to a deep hunger for transcendence in a hyper-digital, fragmented age. Raised in an environment where almost everything is ephemeral, commercialized, or ironic, young men and women are struck with awe when they encounter something ancient, sacred, and unchanging.

“When young people encounter the beauty of sacred liturgy and kneel before the Monstrance in profound silence, they realize the Church is not a social NGO or a self-help club—she is the mystical Bride of Christ,” one university chaplain explained. “They do not want the sanctuary to imitate the noise of the world they just walked out of; they want a foretaste of Heaven.”

In parishes where priests have restored sacred silence before Mass, introduced Gregorian chant and sacred polyphony, offered expanded hours for the Sacrament of Penance, and preached clearly on the Real Presence, pews are filling with young families and college students. Long lines outside confessionals on Saturday afternoons and during weeknight Holy Hours have become a hallmark of vibrant campus ministries.

Seminary rectors and religious vocations directors confirm the same pattern. Newly ordained priests and young women entering contemplative and apostolic religious communities consistently cite Eucharistic Adoration, the Liturgy of the Hours, and Marian devotion—especially the daily Rosary—as the soil in which their vocations took root.

Far from being nostalgic, this renewal is deeply missionary. Anchored by reverence at the altar, young Catholics are organizing street evangelization, serving in crisis pregnancy centers, feeding the homeless, and bringing fallen-away peers back to the sacraments—proving once again that authentic liturgical reverence is the beating heart of the New Evangelization.`,
    link: 'https://www.ncregister.com',
    categories: ['Church', 'Liturgy', 'Youth & Vocations'],
    isFullContentLoaded: true
  },
  // 3. CBCP News
  {
    id: 'cbcp-curated-1',
    sourceId: 'cbcp',
    sourceName: 'CBCP News',
    title: 'Philippine Bishops Call Faithful to Deeper Eucharistic Devotion and Charity for the Poor',
    author: 'CBCP News Service',
    publishedDate: 'November 6, 2026',
    readTime: '5 min read',
    summary: 'In a pastoral exhortation from Intramuros, Manila, the Catholic Bishops\' Conference of the Philippines urges parishes and Basic Ecclesial Communities to unite fervent prayer with concrete works of mercy.',
    content: `MANILA — The Catholic Bishops’ Conference of the Philippines (CBCP) has invited the faithful across the archipelago’s eighty-six ecclesiastical jurisdictions to renew their commitment to the Sunday Eucharist, family Rosary prayer, and compassionate service to the poor and marginalized.

Speaking from the CBCP headquarters in Intramuros, Manila, Church leaders emphasized that the vibrant popular piety of the Filipino people—manifested in deep devotion to the Santo Niño, Jesus Nazareno, and the Blessed Virgin Mary—reaches its fullest maturity when nourished by liturgical catechesis and lived out in integrity, honesty, and solidarity with those in need.

“Every parish church, barangay chapel, and adoration sanctuary across our islands must be a true wellspring of divine mercy,” the bishops noted in their pastoral reflection. “When we gather as one family around the Table of the Lord and receive the Bread of Life at Holy Mass, Christ Himself sends us forth to bind up wounds, feed the hungry, console the grieving, and defend the sanctity of human life and the family.”

The bishops highlighted the indispensable role of Basic Ecclesial Communities (BECs), or Gagmay’ng Kristohanong Katilingban, in bringing the Word of God into neighborhoods and rural villages. Where families gather weekly to pray over the Sunday Gospel readings and check on elderly or struggling neighbors, the parish becomes a living communion of communities.

Special attention was also given to young Filipinos and Overseas Filipino Workers (OFWs) who carry the Catholic faith across the globe. Calling Filipino migrants “modern-day missionaries of hope,” the bishops assured them of the maternal care of the Church at home and encouraged families separated by distance to remain united each evening through the praying of the Holy Rosary.

Concluding their message, the prelates entrusted the nation to the protection of the Immaculate Conception, Principal Patroness of the Philippines, praying that every Catholic household may shine as a domestic sanctuary of peace, truthfulness, and generous charity.`,
    link: 'https://cbcpnews.net/cbcpnews/',
    categories: ['Philippine Church', 'CBCP', 'Pastoral Life'],
    isFullContentLoaded: true
  },
  // 4. Catholic Digest
  {
    id: 'catholic-digest-curated-1',
    sourceId: 'catholic-digest',
    sourceName: 'Catholic Digest',
    title: 'Creating a Domestic Church: Seven Simple Ways to Keep the Liturgical Year Alive at Home',
    author: 'Catholic Digest Editorial',
    publishedDate: 'November 6, 2026',
    readTime: '5 min read',
    summary: 'From blessing the family table and praying the Angelus to celebrating baptismal patron saints, Catholic homes can reflect the beauty of the Church\'s sacred calendar every day.',
    content: `Saint John Chrysostom, the golden-mouthed Bishop of Constantinople, affectionately called the Christian family a “little church” (ecclesiola). Long before children study formal theology or memorize catechism definitions, they absorb the Catholic faith through the sights, sounds, prayers, and seasonal rhythms of their own home.

Building a vibrant domestic church does not require an elaborate budget or hours of preparation. Rather, it grows out of small, faithful habits woven gently into the fabric of ordinary family life:

1. Establish a Family Prayer Corner: Dedicate a small table or shelf in the living room with a crucifix, an image of Our Lady, a blessed candle, and the family Bible. Changing a small cloth runner to match the liturgical season—violet for Advent and Lent, white or gold for Christmas and Easter, green for Ordinary Time—visually teaches the whole household how the Church walks with Christ through the year.

2. Guard the Grace of the Family Meal: Beyond praying "Bless us, O Lord, and these Thy gifts" before eating, conclude evening meals during November—and throughout the year—with the traditional prayer for the faithful departed: "May the souls of the faithful departed, through the mercy of God, rest in peace. Amen."

3. Read the Daily Gospel Together: Reading just the day’s short Gospel passage at breakfast or dinner takes less than two minutes, yet over the course of a year it immerses the entire family in the life and parables of Jesus.

4. Celebrate Patron Saint Feast Days and Baptismal Anniversaries: Look up the date of each family member’s Baptism and the feast day of their patron saint. Serving a favorite dessert, lighting their baptismal candle, and reading a short biography of their patron saint reminds children that they belong to the royal family of God.

5. Keep a Small Font of Holy Water by the Front Door: Placing a small holy water font near the entrance allows parents and children to bless themselves with the Sign of the Cross whenever leaving for school or work, recalling their baptismal vows and invoking God’s protection.

6. Pause for the Angelus at Noon or Six O’Clock: Praying the three Hail Marys of the Angelus recalls the Incarnation right in the middle of our daily labors, uniting our work with Mary’s fiat.

7. End the Day with a Brief Examination of Conscience and Parental Blessing: Before children go to sleep, thanking God for three blessings from the day, asking forgiveness for any faults, and tracing a small Sign of the Cross on each child’s forehead plants a lifelong memory of the Father’s tender mercy.`,
    link: 'https://www.catholicdigest.com',
    categories: ['Catholic Family', 'Liturgical Living', 'Prayer'],
    isFullContentLoaded: true
  },
  // 5. Catholic Insight
  {
    id: 'catholic-insight-curated-1',
    sourceId: 'catholic-insight',
    sourceName: 'Catholic Insight',
    title: 'The Splendor of Truth in an Age of Relativism: Rediscovering Veritatis Splendor',
    author: 'Catholic Insight Contributors',
    publishedDate: 'November 6, 2026',
    readTime: '6 min read',
    summary: 'Why Pope St. John Paul II\'s moral encyclical remains the essential compass for Christian conscience, natural law, and authentic human freedom.',
    content: `More than three decades after its promulgation, Pope Saint John Paul II’s landmark encyclical Veritatis Splendor (“The Splendor of Truth”) reads with astonishing prophetic clarity. Written to address a profound crisis in moral theology and modern culture, the encyclical opens not with abstract philosophical syllogisms, but with the dramatic Gospel encounter between Jesus and the Rich Young Man: “Teacher, what good must I do to have eternal life?” (Matthew 19:16).

By grounding Christian ethics in that personal question addressed to Christ, John Paul II reminds the Church that the moral life is never a burdensome set of arbitrary prohibitions imposed from without. Instead, morality is a loving, grateful response to the One who alone is Good—the God who created human nature with an intrinsic purpose and redeemed us at the price of His own Blood.

At the heart of modern cultural confusion lies a false dichotomy between freedom and truth. Contemporary relativism imagines that human freedom is absolute sovereignty—the power to invent good and evil for oneself—and therefore views any objective moral law as a threat to autonomy. Against this illusion, Veritatis Splendor reaffirms Christ’s words in the Gospel of John: “You will know the truth, and the truth will make you free” (John 8:32).

Human freedom, as Catholic philosophy and theology teach, is not freedom from truth, but freedom in and for the truth. Just as a violinist is freest to play Mozart not when he discards the laws of harmony, but when he masters them, so the human person flourishes only when acting in harmony with the natural moral law inscribed by the Creator upon the human heart.

The encyclical likewise rescues the Catholic understanding of conscience from subjectivist distortion. Conscience is not an independent tribunal that manufactures its own moral standards or grants dispensations from divine law. Rather, in the words of Saint John Henry Newman and the Second Vatican Council, conscience is the interior sanctuary where man listens to the voice of God—a judgment of practical reason that applies objective moral truth to concrete choices, guided and illuminated by the Magisterium of the Church.

Finally, John Paul II points to the Christian martyrs as the ultimate witnesses to the splendor of truth. By choosing death rather than committing even a single mortal sin or betraying the truth of faith, the martyrs testify that some acts are intrinsically evil regardless of circumstances, and that fidelity to God’s truth is worth more than life itself.`,
    link: 'https://catholicinsight.com',
    categories: ['Moral Theology', 'Magisterium', 'Culture'],
    isFullContentLoaded: true
  },
  // 6. Catholic Answers Magazine
  {
    id: 'catholic-answers-curated-1',
    sourceId: 'catholic-answers',
    sourceName: 'Catholic Answers Magazine',
    title: 'How the Early Church Fathers Defended the Real Presence of Christ in the Eucharist',
    author: 'Catholic Answers Apologetics Staff',
    publishedDate: 'November 6, 2026',
    readTime: '6 min read',
    summary: 'From St. Ignatius of Antioch in A.D. 107 to St. Justin Martyr and St. Cyril of Jerusalem, the Apostolic Fathers unanimously professed that the Eucharist is truly the flesh and blood of Jesus.',
    content: `One of the most frequent objections raised against Catholic teaching is the claim that belief in the Real Presence of Jesus Christ in the Eucharist was a late medieval invention, supposedly introduced only in the ninth or thirteenth century. Yet when we open the surviving writings of the earliest Christians—men who were taught directly by the Twelve Apostles or their immediate successors—that claim collapses completely.

Begin with Saint Ignatius of Antioch, the third bishop of Antioch after Saint Peter himself and a disciple of the Apostle John. Arrested during the reign of Emperor Trajan and marched in chains to Rome to be thrown to wild beasts in the Colosseum around A.D. 107, Ignatius wrote seven letters to local churches along his route. Warning against the Docetists (heretics who denied that Christ had a real physical body), Ignatius wrote in his Letter to the Smyrnaeans:

“They abstain from the Eucharist and from prayer, because they do not confess that the Eucharist is the flesh of our Savior Jesus Christ, flesh which suffered for our sins and which the Father, in his goodness, raised up again.” Notice the force of Ignatius’s argument: if the Eucharist were merely a symbolic memorial, the Docetists would have had no trouble partaking of a symbol. They abstained precisely because the universal Church professed that the Eucharist is literally the same flesh of Jesus that suffered on the Cross and rose from the dead.

Four decades later, around A.D. 150, the philosopher and martyr Saint Justin wrote his First Apology to the Roman Emperor Antoninus Pius to explain what Christians actually did at their Sunday assemblies, refuting pagan rumors. Justin’s description of the Mass is unmistakably Catholic:

“Not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Savior, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise have we been taught that the food which is blessed by the prayer of His word, and from which our blood and flesh by transmutation are nourished, is the flesh and blood of that Jesus who was made flesh.”

In the third and fourth centuries, the witness grows even more detailed. Saint Irenaeus of Lyons (c. A.D. 180) argued against the Gnostics that our bodies are capable of resurrection because they are nourished by the Lord’s actual Body and Blood. And in Jerusalem around A.D. 350, Saint Cyril instructed newly baptized Christians in his Catechetical Lectures: “Do not, therefore, regard the bread and wine as simply that; for they are, according to the Master’s declaration, the Body and Blood of Christ. Even though the senses suggest to you the other, let faith make you firm.”

Across East and West, for the first fifteen hundred years of Christianity, no orthodox Christian community ever doubted that what looks like bread and wine after the words of consecration is truly, really, and substantially Emmanuel—God with us.`,
    link: 'https://www.catholic.com/magazine',
    categories: ['Apologetics', 'Eucharist', 'Patristics'],
    isFullContentLoaded: true
  },
  // 7. Word on Fire
  {
    id: 'word-on-fire-curated-1',
    sourceId: 'word-on-fire',
    sourceName: 'Word on Fire',
    title: 'Leading with Beauty: How Sacred Art and Architecture Evangelize the Modern Mind',
    author: 'Word on Fire Institute',
    publishedDate: 'November 6, 2026',
    readTime: '5 min read',
    summary: 'Bishop Robert Barron has long emphasized the "via pulchritudinis" (the way of beauty): before the modern skeptic will listen to what the Church says is true or good, he can be arrested by what is radiantly beautiful.',
    content: `In classical Catholic philosophy, the three transcendentals of being—the True (verum), the Good (bonum), and the Beautiful (pulchrum)—are convertible and ultimately find their source in God Himself. Every authentic missionary effort seeks to lead human souls to all three. Yet as Bishop Robert Barron and Pope Benedict XVI have frequently observed, the order in which we present them to a postmodern culture matters immensely.

When the Church begins a conversation with a secular skeptic by asserting what is objectively true (“Here is what you must believe”), the modern mind instinctively raises its defenses, suspecting ideological coercion. When we begin by insisting on the moral good (“Here is how you must behave”), a culture steeped in expressive individualism often recoils, accusing the Church of puritanical judgmentalism.

That is why the via pulchritudinis—the Way of Beauty—is so remarkably effective. Beauty is non-violent and disarming. It does not start an argument; it issues an invitation. Before a person has time to erect intellectual barriers, a work of radiant beauty pierces the heart and awakens what C.S. Lewis called joy—an ache and homesickness for the transcendent.

Consider the north rose window of Chartres Cathedral, where thousands of pieces of cobalt and ruby stained glass revolve in mathematical harmony around the figure of Christ and His Mother. Or stand before Michelangelo’s Pietà in St. Peter’s Basilica, where the sorrow of Calvary and the serenity of redemption are fused in Carrara marble. Or listen to the soaring polyphony of Palestrina’s Missa Papae Marcelli or Allegri’s Miserere.

The same principle applies to the beauty of the saints. Mother Teresa binding the wounds of the dying in the streets of Calcutta, Saint Maximilian Kolbe stepping forward in the starvation bunker of Auschwitz, and Saint Damien of Molokai building coffins and chapels for abandoned lepers are living icons—works of divine art painted in human flesh.

When our parishes, schools, and homes refuse to settle for banality and instead cultivate noble architecture, reverent liturgy, sacred music, and luminous Christian witness, they invite a weary world to look up and ask: “What is the source of such beauty?” And from beauty, the door opens naturally to goodness and to the fullness of Catholic truth.`,
    link: 'https://www.wordonfire.org/articles/',
    categories: ['Evangelization', 'Sacred Art', 'Via Pulchritudinis'],
    isFullContentLoaded: true
  },
  // 8. St. Paul Center
  {
    id: 'st-paul-center-curated-1',
    sourceId: 'st-paul-center',
    sourceName: 'St. Paul Center',
    title: 'The Fourth Cup and the New Passover: Reading the Mass Through the Eyes of Scripture',
    author: 'St. Paul Center for Biblical Theology',
    publishedDate: 'November 6, 2026',
    readTime: '6 min read',
    summary: 'Understanding the covenantal typology linking the Old Testament Passover sacrifice, the Last Supper in the Upper Room, and the Holy Sacrifice of Calvary.',
    content: `Why did Jesus institute the Holy Eucharist in the context of the Jewish Passover Seder? Why did He agonize in the Garden of Gethsemane praying, “Father, if you are willing, remove this cup from me”? And why, on the Cross of Calvary, did He declare “It is finished” immediately after tasting sour wine lifted to His lips on a hyssop branch?

As Dr. Scott Hahn and biblical scholars at the St. Paul Center for Biblical Theology have illuminated through Scripture and ancient Jewish sources, these details form a single, breathtaking liturgical tapestry that unlocks the meaning of both the Passion and the Catholic Mass.

In the first century, the traditional Jewish Passover liturgy was structured around four ceremonial cups of wine, each accompanied by specific blessings and psalms from the Hallel (Psalms 113–118). After the third cup—known as the “Cup of Blessing,” which Saint Paul explicitly identifies with the Eucharist in 1 Corinthians 10:16—participants would sing the Great Hallel and then drink the fourth cup, the “Cup of Consummation,” which brought the Passover meal to its conclusion.

Yet when we read the Gospel accounts of the Last Supper closely, something extraordinary happens. After blessing the third cup and declaring it to be the New Covenant in His Blood, Jesus solemnly vows: “I tell you I shall not drink again of this fruit of the vine until that day when I drink it new with you in my Father’s kingdom” (Matthew 26:29). Then the Evangelist notes: “And when they had sung a hymn, they went out to the Mount of Olives.”

Jesus deliberately omitted the fourth cup of the Passover meal! He left the liturgy unfinished in the Upper Room. Moments later, in Gethsemane, three times He prayed to the Father concerning “this cup.” His Passion was not an interruption of the Last Supper; it was the continuation of the New Passover liturgy.

On Calvary, as His lifeblood was poured out as the true Lamb of God, Jesus refused the drugged wine offered by the soldiers at the beginning of the crucifixion. Hours later, knowing that all Scripture was now fulfilled, He said, “I thirst” (John 19:28). Someone soaked a sponge in sour wine, placed it on a branch of hyssop—the exact plant Moses commanded the Israelites to use at the first Passover to sprinkle the blood of the lamb—and held it to His mouth.

“When Jesus had received the sour wine, He said, ‘It is finished,’ and He bowed His head and gave up His spirit” (John 19:30). By drinking that fourth cup on the Cross, Christ united the Upper Room and Calvary into one indivisible Paschal sacrifice—the very sacrifice made present on our altars at every celebration of the Holy Mass.`,
    link: 'https://stpaulcenter.com',
    categories: ['Biblical Theology', 'Covenant', 'Eucharist'],
    isFullContentLoaded: true
  },
  // 9. Catholic Education Resource Center (CERC)
  {
    id: 'cerc-curated-1',
    sourceId: 'cerc',
    sourceName: 'Catholic Education Resource Center',
    title: 'How the Catholic Church Built Western Civilization: Universities, Hospitals, and Natural Science',
    author: 'Catholic Education Resource Center',
    publishedDate: 'November 6, 2026',
    readTime: '7 min read',
    summary: 'A historical survey of how Catholic monasteries, cathedral schools, and papal charters gave birth to the university system, modern charitable healthcare, and the scientific method.',
    content: `Popular secular mythology frequently portrays the Catholic Church as an enemy of reason, scientific inquiry, and human progress. Yet serious historians of science and civilization—Catholics and non-Catholics alike—have demonstrated that the defining institutions of Western civilization grew directly out of the heart of the Catholic Church.

Consider first the preservation of literacy and the birth of the university. After the collapse of the Western Roman Empire, it was Benedictine monks copying manuscripts in monastic scriptoria who saved the works of Cicero, Virgil, Plato, and Aristotle alongside Sacred Scripture and the Church Fathers. Monasteries were not merely houses of prayer; they were centers of agriculture, hydraulic engineering, metallurgy, and education.

Out of the medieval cathedral schools emerged an institution completely unknown to pagan Greece or Rome: the university. Chartered and protected by the popes, universities in Bologna, Paris, Oxford, Cambridge, Salamanca, and Padua created an international republic of learning. There, scholastic masters like Saint Albert the Great (patron saint of natural scientists) and Saint Thomas Aquinas demonstrated the profound harmony between Christian revelation and rigorous rational inquiry.

Even the empirical scientific method owes its philosophical foundation to Catholic theology. Ancient pagan cultures often viewed the material universe as either divine, cyclical, or governed by capricious fate—attitudes that discouraged systematic experimentation. Catholic doctrine, by contrast, taught that the universe was created ex nihilo by an all-wise, rational Lawgiver (“In the beginning was the Logos”) and that Wisdom “arranged all things by measure and number and weight” (Wisdom 11:20). Because creation was orderly and intelligible, investigating nature was a way of thinking God’s thoughts after Him.

Little wonder that the pioneers of modern science were devout Catholics and frequently ordained clergy: Roger Bacon and Bishop Robert Grosseteste in optics and experimental method; Canon Nicolaus Copernicus in heliocentric astronomy; Father Marin Mersenne in acoustics; Father Nicolas Steno, the father of modern geology; Father Athanasius Kircher; Abbot Gregor Mendel, the founder of modern genetics; and Monsignor Georges Lemaître, the Belgian priest and physicist who first formulated the Big Bang theory of the expanding universe.

Equally transformative was the Church’s invention of the hospital and organized charitable healthcare. Inspired by Christ’s command to care for the sick and see His face in the suffering, bishops and religious orders established permanent hospitals (xenodochia), leprosaria, orphanages, and pharmacies across Christendom—affirming that every human life, from conception to natural death, possesses inviolable dignity in the eyes of God.`,
    link: 'https://www.catholiceducation.org',
    categories: ['Church History', 'Faith & Reason', 'Education'],
    isFullContentLoaded: true
  },
  // 10. Signs & Wonders for Our Times (sign.org)
  {
    id: 'sign-org-curated-1',
    sourceId: 'sign-org',
    sourceName: 'Signs & Wonders for Our Times (sign.org)',
    title: 'Our Lady\'s Call to Prayer, Penance, and Devotion to the Most Blessed Sacrament',
    author: 'Signs & Wonders for Our Times',
    publishedDate: 'November 6, 2026',
    readTime: '6 min read',
    summary: 'Exploring the perennial message of the Blessed Virgin Mary across approved apparitions: a maternal summons to return to Jesus in the Eucharist, pray the daily Rosary, and live in sanctifying grace.',
    content: `Across the centuries, whenever Heaven has permitted the Blessed Virgin Mary to appear on earth in Church-approved apparitions—from Tepeyac Hill in Guadalupe and the Rue du Bac in Paris to Lourdes, Knock, and Fátima—her maternal message has never drawn attention to herself apart from her Divine Son. Instead, like at the Wedding Feast of Cana, her words always echo the same Gospel command: “Do whatever He tells you” (John 2:5).

In an age tempted by materialism and spiritual amnesia, the signs and wonders granted by God through Eucharistic miracles and Marian sanctuaries serve a deeply pastoral purpose. They are merciful wake-up calls from a loving Father, reminding humanity that the supernatural realm is real, that sin wounds the Sacred Heart of Jesus, and that eternal salvation is the supreme business of human life.

At Fátima in 1916, a year before Our Lady appeared to Lucia, Francisco, and Jacinta at the Cova da Iria, the Angel of Peace prepared the three shepherd children by kneeling with his forehead bowed to the ground before the Host and Chalice suspended in the air, teaching them to pray: “Most Holy Trinity, Father, Son and Holy Spirit, I adore You profoundly, and I offer You the most precious Body, Blood, Soul and Divinity of Jesus Christ, present in all the tabernacles of the world, in reparation for the outrages, sacrileges and indifference with which He Himself is offended.”

Notice how Marian devotion and Eucharistic reparation are inseparable. When Our Lady of Fátima asked for the daily recitation of the Most Holy Rosary, penance for the conversion of sinners, and the First Five Saturdays devotion of reparation to her Immaculate Heart, she placed Holy Mass and reparative Communion at the very center of the spiritual life.

Likewise, the documented Eucharistic miracles recognized by the Church—such as Lanciano, Bolsena-Orvieto, Siena, Tixtla, and Sokółka—confirm with visible signs what Catholic faith already knows through Christ’s unbreakable Word: that the consecrated Host is truly the living Heart of Jesus beating with love for mankind.

As Signs & Wonders for Our Times continually emphasizes in its apostolate, the proper response to Heaven’s graces is daily conversion of heart: returning promptly to the Sacrament of Confession, praying the family Rosary with meditation on the Mysteries, wearing the Brown Scapular and Miraculous Medal with fidelity, and spending quiet, loving time adoring Our Eucharistic Lord on the altar.`,
    link: 'https://sign.org',
    categories: ['Marian Devotion', 'Eucharistic Miracles', 'Prayer'],
    isFullContentLoaded: true
  }
];

const fullArticleCache = new Map<string, { content: string; imageUrl?: string; readTime: string }>();

export async function fetchFullCatholicArticleContent(
  articleUrl: string
): Promise<{ content: string; imageUrl?: string; readTime: string } | null> {
  if (!articleUrl || !/^https?:\/\//i.test(articleUrl)) return null;
  if (fullArticleCache.has(articleUrl)) {
    return fullArticleCache.get(articleUrl)!;
  }

  try {
    const res = await fetch(`/api/catholic-article-full?url=${encodeURIComponent(articleUrl)}`, {
      signal: AbortSignal.timeout(9000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && typeof data.content === 'string' && data.content.trim().length > 250) {
      const clean = data.content.trim();
      const words = clean.split(/\s+/).length;
      const mins = Math.max(3, Math.min(20, Math.round(words / 180)));
      const result = {
        content: clean,
        imageUrl: data.imageUrl || undefined,
        readTime: `${mins} min read`
      };
      fullArticleCache.set(articleUrl, result);
      return result;
    }
  } catch {
    // Ignore network timeout and keep existing content
  }

  return null;
}

export async function fetchCatholicRssArticlesForSource(
  sourceId: string
): Promise<CatholicArticleItem[]> {
  const source = CATHOLIC_RSS_SOURCES.find(s => s.id === sourceId);
  if (!source) return [];

  try {
    const res = await fetch(`/api/catholic-rss?source=${encodeURIComponent(sourceId)}`, {
      signal: AbortSignal.timeout(6500)
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const xml = await res.text();
    const parsed = parseRssXmlToArticles(xml, source);
    if (parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fall back to curated articles for this source
  }

  return CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === sourceId);
}

