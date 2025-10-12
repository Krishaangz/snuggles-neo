import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const UPLIFTING_QUOTES = [
  "Every day with your baby is a new adventure filled with small miracles.",
  "You're doing an amazing job. Trust yourself, you know your baby best.",
  "The days are long, but the years are short. Cherish every moment.",
  "Your love is the most powerful thing your baby will ever need.",
  "It's okay to have bad days. Tomorrow is always a fresh start.",
  "Being a parent means being brave enough to let your heart walk outside your body.",
  "You're not just raising a baby, you're shaping a future.",
  "Small moments create the most beautiful memories.",
  "Your baby doesn't need perfection, they need your presence.",
  "Every smile, every giggle, every tiny milestone—celebrate them all.",
  "You are enough. You have always been enough. You will always be enough.",
  "The love between parent and child is life's greatest masterpiece.",
  "Trust the timing of your baby's development. Every child blooms differently.",
  "You're teaching your baby how to love by showing them they are loved.",
  "It's the ordinary moments that become extraordinary memories.",
  "Your patience today is building your child's confidence for tomorrow.",
  "There is no way to be a perfect parent, but a million ways to be a good one.",
  "You're learning together, growing together, and that's beautiful.",
  "The greatest gift you can give your child is a happy, healthy you.",
  "Your baby chose you to be their parent. That's pretty special.",
  "Every challenge you overcome makes you a stronger parent.",
  "You're creating a safe haven of love for your little one.",
  "The bond you're building today will last a lifetime.",
  "Your baby's first teacher is you, and you're doing wonderfully.",
  "It's okay to ask for help. Strong parents build strong support networks.",
  "You're not just surviving, you're thriving—even when it doesn't feel like it.",
  "Every night you stay up, every tear you wipe, every song you sing—it all matters.",
  "Your baby sees you as their whole world, and that's magical.",
  "The love you give today shapes the person your child becomes tomorrow.",
  "You're writing your baby's story one gentle moment at a time.",
  "It's okay to take breaks. Self-care isn't selfish, it's necessary.",
  "Your baby doesn't need expensive toys, they need your attention and affection.",
  "The patience you practice now teaches your child resilience for life.",
  "Every day you're doing better than you think you are.",
  "Your baby's smile is proof that you're doing something right.",
  "The sleepless nights won't last forever, but the memories will.",
  "You're building a foundation of trust that will support your child for years.",
  "It's the little things—the cuddles, the stories, the lullabies—that matter most.",
  "Your baby doesn't judge you for your mistakes. They see only love.",
  "The journey of parenthood is unpredictable, but you're navigating it beautifully.",
  "Every time you comfort your baby, you're teaching them they're safe.",
  "You're learning to be a parent the same way your baby learns to be a person: one step at a time.",
  "The chaos of today becomes the nostalgia of tomorrow.",
  "Your baby is lucky to have someone who cares as much as you do.",
  "It's okay to feel overwhelmed. What matters is that you keep going.",
  "You're creating a childhood your baby will cherish forever.",
  "The way you hold your baby, the way you speak to them—it all becomes their inner voice.",
  "Every day is a chance to create new joys and overcome new challenges.",
  "Your baby learns love from watching you love them.",
  "The moments that feel mundane now will be the ones you miss most.",
  "You're teaching your child that it's okay to be human, to make mistakes, and to try again.",
  "Your baby's laughter is the universe's way of saying you're doing great.",
  "The investment you make today pays dividends in your child's future.",
  "You don't have to be perfect. You just have to be present.",
  "Your baby is growing, and so are you as a parent. That's beautiful.",
  "The love you pour into your child today will echo through generations.",
  "You're creating a home filled with warmth, safety, and unconditional love.",
  "Every milestone, big or small, is worth celebrating.",
  "Your baby doesn't need you to have all the answers, just to be there.",
  "The strength you show today teaches your child how to face their own challenges.",
  "You're not alone. Millions of parents are walking this path with you.",
  "Your baby sees you as their hero, and they're right.",
  "It's okay to feel unsure. Confidence comes with time and experience.",
  "The love you give your baby is the greatest gift they'll ever receive.",
  "You're building a relationship that will last a lifetime, one day at a time.",
  "Every snuggle, every kiss, every 'I love you' becomes part of who they are.",
  "Your baby doesn't remember the messy house. They remember feeling loved.",
  "You're doing the most important work in the world: raising a human being.",
  "The way you respond to your baby's needs teaches them empathy and compassion.",
  "It's okay to have moments of doubt. What matters is your unwavering love.",
  "Your baby's trust in you is the most precious gift you'll ever receive.",
  "You're creating memories that will warm your heart for decades.",
  "The kindness you show yourself teaches your child self-compassion.",
  "Every day with your baby is a gift, even the challenging ones.",
  "You're learning to be the parent your child needs, and that's incredible.",
  "The love story between you and your baby is the most beautiful one ever told.",
  "Your baby doesn't need a Pinterest-perfect life. They need you.",
  "You're teaching your child that love is patient, kind, and unconditional.",
  "The journey is messy, exhausting, and absolutely worth it.",
  "Your baby's future is bright because they have you.",
  "Every time you show up, you're showing your baby what commitment looks like.",
  "You're creating a legacy of love, one small moment at a time.",
  "The bond you share with your baby is unbreakable and irreplaceable.",
  "You're not just raising a child, you're raising a future friend, confidant, and joy.",
  "Your baby is learning about the world through your eyes. Show them beauty.",
  "It's okay to feel tired. You're doing the work of two or three people every day.",
  "The way you love your baby teaches them how to love themselves.",
  "You're creating a safe space where your baby can grow and flourish.",
  "Every day you're planting seeds that will grow into a beautiful future.",
  "Your baby's giggles are proof that you're creating happiness.",
  "The patience you practice now becomes your child's inner strength later.",
  "You're writing a love story that will be told through generations.",
  "Your baby doesn't need you to be superhuman. They need you to be you.",
  "The way you navigate challenges teaches your baby resilience.",
  "You're creating a foundation of security that will support your child always.",
  "Every day you're proving that love is the most powerful force in the universe.",
  "Your baby is learning what home feels like from being with you.",
  "The moments you think are insignificant are the ones your child will remember.",
  "You're teaching your baby that they are worthy of love just by existing.",
  "The journey of parenthood transforms you in the most beautiful ways.",
  "Your baby's first word, first step, first everything—you're there for it all.",
  "You're creating a childhood that will be the foundation of a happy life.",
  "The love you give is multiplied in ways you can't even imagine.",
  "Your baby doesn't need a perfect parent. They need a real one.",
  "You're building a relationship based on trust, love, and understanding.",
  "Every challenge you face together makes your bond stronger.",
  "Your baby is learning about unconditional love from you.",
  "The way you care for your baby teaches them how to care for others.",
  "You're creating moments of pure joy in the midst of everyday life.",
  "Your baby's happiness is a reflection of the love you provide.",
  "The investment of time and love you make today creates tomorrow's memories.",
  "You're teaching your child that home is not a place, it's a feeling.",
  "Every night you put your baby to bed, you're giving them the gift of security.",
  "Your baby is learning what it means to be cherished.",
  "The way you respond to your baby's cries teaches them they matter.",
  "You're creating a story of love that will be retold for years to come.",
  "Your baby doesn't need you to be anyone else. They need you.",
  "The patience you show today becomes your child's inner calm tomorrow.",
  "You're building a legacy of love, one gentle touch at a time.",
  "Every day you're showing your baby that they are loved beyond measure.",
  "Your baby is growing up surrounded by love, and that's everything.",
  "The way you hold your baby teaches them they are safe in this world.",
  "You're creating a childhood filled with warmth, laughter, and security.",
  "Your baby doesn't remember the struggles. They remember the love.",
  "The bond you're forming now will be a source of strength for life.",
  "You're teaching your child what it means to be truly loved.",
  "Every day with your baby is a chance to create something beautiful.",
  "Your baby sees you as perfect, even when you don't feel that way.",
  "The love you give today plants seeds of confidence for tomorrow.",
  "You're creating a home where your baby feels valued and cherished.",
  "Every moment you spend with your baby is an investment in their future.",
  "Your baby is learning about the world, and you're their favorite teacher.",
  "The way you love your baby sets the tone for all their future relationships.",
  "You're building a foundation of love that nothing can shake.",
  "Every day you're proving that the greatest power in the world is love.",
  "Your baby is lucky to have you, and you're lucky to have them.",
  "The journey is challenging, but you're never walking it alone.",
  "You're creating a life full of love, and that's the greatest achievement.",
  "Your baby's trust in you is sacred. You're honoring it every day.",
  "The way you care for your baby teaches them how to care for themselves.",
  "You're writing a story of unconditional love, one day at a time.",
  "Every smile you bring to your baby's face is a victory worth celebrating.",
  "Your baby doesn't need perfection. They need presence, patience, and love.",
  "The bond you share is unique, precious, and unbreakable.",
  "You're doing the most important work in the world, and you're doing it beautifully.",
  "Your baby is learning what love looks like from watching you.",
  "The moments you create today become the memories that last forever.",
  "You're teaching your child that they are worthy of love, attention, and care.",
  "Every day you show up is another day you're making a difference.",
  "Your baby's world is brighter because you're in it.",
  "The love you give today echoes through your child's entire life.",
  "You're creating a legacy of kindness, compassion, and unconditional love.",
  "Your baby doesn't need you to be flawless. They need you to be loving.",
  "The patience you practice is shaping your child's emotional foundation.",
  "You're building a relationship that will be a source of joy for both of you.",
  "Every day is a new opportunity to show your baby how much they're loved.",
  "Your baby is learning about trust, security, and love from you.",
  "The way you navigate parenthood teaches your child how to navigate life.",
  "You're creating a childhood that will be remembered with warmth and joy.",
  "Your baby sees the world as beautiful because you're showing them beauty.",
  "The investment you make in your baby today pays returns forever.",
  "You're teaching your child that love is the most important thing.",
  "Every day you're creating moments that will become treasured memories.",
  "Your baby doesn't need fancy things. They need you, and you're enough.",
  "The bond you're building is the foundation of your child's emotional health.",
  "You're showing your baby what unconditional love truly means.",
  "Every challenge you overcome together strengthens your relationship.",
  "Your baby is learning resilience from watching you face each day.",
  "The way you love your baby is teaching them how to love themselves.",
  "You're creating a safe haven where your child can always return.",
  "Every moment of care you provide is building your child's future.",
  "Your baby is lucky to be raised by someone who loves them so deeply.",
  "The journey of parenthood is transforming you both in beautiful ways.",
  "You're doing an incredible job, even when it doesn't feel like it.",
  "Your baby's happiness is the greatest testament to your love.",
  "The way you parent today creates the adult your child becomes tomorrow.",
  "You're building a future filled with love, one day at a time.",
  "Every day you're proving that love is the answer to everything.",
  "Your baby is growing up knowing they are cherished, and that's everything.",
  "The love you give is the greatest gift your child will ever receive.",
  "You're creating a story of love that will inspire generations.",
  "Your baby doesn't need you to be perfect. They need you to be present.",
  "The bond you share is the most precious thing in the world.",
  "You're doing the work of heroes every single day.",
  "Your baby is learning what home means from being with you.",
  "The way you care for your baby is creating their sense of self-worth.",
  "You're building a foundation of love that will last forever.",
  "Every day is another chapter in the beautiful story of your family.",
  "Your baby is blessed to have you, and you're blessed to have them.",
  "The love you give today shapes your child's entire life.",
  "You're creating magic in the ordinary moments.",
  "Your baby sees you as their whole world, and what a beautiful world it is.",
];

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuoteOfTheDay = () => {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem("quoteDate");
      
      if (savedDate !== today) {
        // New day, get new random quote
        const randomQuote = UPLIFTING_QUOTES[Math.floor(Math.random() * UPLIFTING_QUOTES.length)];
        setQuote(randomQuote);
        localStorage.setItem("quoteOfTheDay", randomQuote);
        localStorage.setItem("quoteDate", today);
      } else {
        // Same day, use saved quote
        const savedQuote = localStorage.getItem("quoteOfTheDay");
        if (savedQuote) {
          setQuote(savedQuote);
        } else {
          const randomQuote = UPLIFTING_QUOTES[Math.floor(Math.random() * UPLIFTING_QUOTES.length)];
          setQuote(randomQuote);
          localStorage.setItem("quoteOfTheDay", randomQuote);
        }
      }
    };

    getQuoteOfTheDay();
  }, []);

  if (!quote) return null;

  return (
    <Card className="mt-8 p-6 gradient-card shadow-soft border-2 border-primary/10 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-primary animate-pulse-ring" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary mb-2">Quote of the Day</h3>
          <p className="text-muted-foreground italic leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>
    </Card>
  );
};

export default QuoteOfTheDay;
