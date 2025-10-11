import { useState, useEffect } from "react";
import { X } from "lucide-react";
import snugMascot from "@/assets/snug-mascot.png";

const PARENTING_FACTS = [
  "Babies are born with about 300 bones, but adults have only 206. Many bones fuse together as children grow. (Source: NIH)",
  "Newborns can only see about 8-12 inches away—perfect for seeing their parent's face during feeding. (Source: AAP)",
  "Babies dream! REM sleep starts in the womb around 23 weeks. (Source: Sleep Foundation)",
  "A baby's brain doubles in size in the first year. It reaches 80% of adult size by age 3. (Source: CDC)",
  "Babies recognize their mother's voice from birth because they heard it in the womb. (Source: WHO)",
  "Skin-to-skin contact regulates a baby's heart rate, temperature, and breathing. (Source: WHO)",
  "Babies have taste buds all over their mouth, not just on their tongue. (Source: AAP)",
  "The first social smile appears around 6-8 weeks and is a major developmental milestone. (Source: CDC)",
  "Tummy time helps prevent flat spots on the head and builds neck and shoulder muscles. (Source: AAP)",
  "Babies prefer high-contrast patterns, especially black and white, in early months. (Source: AAP)",
  "Reading to babies from birth builds language skills and creates bonding time. (Source: AAP)",
  "A baby's cry can reach 100-120 decibels—as loud as a rock concert! (Source: NIH)",
  "Babies learn language through 'baby talk' (parentese). Exaggerated tones help them learn. (Source: AAP)",
  "Every baby has a unique tongue print, just like fingerprints. (Source: Medical Research)",
  "The soft spots (fontanels) on a baby's head allow the brain to grow. They close by 18 months. (Source: AAP)",
  "Babies blink only 1-2 times per minute vs. adults who blink 10-20 times. (Source: Pediatric Research)",
  "Responsive caregiving in the first year shapes brain architecture for life. (Source: Harvard CDC)",
  "Babies can breathe and swallow at the same time until about 6 months old. (Source: AAP)",
  "The average baby goes through 2,700 diapers in the first year. (Source: Parenting Statistics)",
  "White noise can help babies sleep because it mimics sounds from the womb. (Source: Sleep Foundation)",
  "Babies are born with a strong grasp reflex—they can support their own weight briefly! (Source: AAP)",
  "A baby's first poop (meconium) is made from materials ingested in the womb. (Source: AAP)",
  "Babies have three times more taste buds than adults and prefer sweet flavors. (Source: AAP)",
  "Singing to your baby, even off-key, supports language development and bonding. (Source: AAP)",
  "Babies can recognize emotions in voices by 5 months, even in languages they don't know. (Source: Developmental Research)",
  "The startle reflex (Moro reflex) is a survival instinct from our evolutionary past. (Source: AAP)",
  "Babies prefer their mother's smell from birth and find it comforting. (Source: WHO)",
  "Massaging your baby can improve sleep, reduce crying, and support digestion. (Source: AAP)",
  "Babies learn best through play—it's their 'work' and builds brain connections. (Source: AAP)",
  "By 6 months, babies should double their birth weight; by 1 year, triple it. (Source: WHO)",
  "Teething usually starts around 6 months but can vary from 3-12 months. (Source: AAP)",
  "Babies have a natural swimming reflex and can hold their breath underwater until 6 months. (Source: Pediatric Research)",
  "The first year requires about 1,800 hours of feeding time—that's 75 full days! (Source: Breastfeeding Research)",
  "Babies learn self-soothing around 3-4 months when they can find their hands. (Source: Sleep Foundation)",
  "A baby's immune system is immature at birth—breastfeeding provides crucial antibodies. (Source: WHO)",
  "Babies can recognize faces from birth and show preference for faces over objects. (Source: Developmental Psychology)",
  "The AAP recommends exclusive breastfeeding for 6 months, then with solids until 12+ months. (Source: AAP)",
  "Babies cry an average of 2-3 hours per day in the first 6 weeks, peaking around 6 weeks. (Source: AAP)",
  "Crawling usually begins between 6-10 months, but some babies skip it entirely. (Source: CDC)",
  "Babies can distinguish all sounds in all languages until about 6 months. (Source: Language Research)",
  "Room-sharing (not bed-sharing) reduces SIDS risk by up to 50%. (Source: AAP)",
  "Introducing allergenic foods early (around 6 months) may reduce allergy risk. (Source: AAP)",
  "Babies regulate their temperature through their head, which is why hats matter. (Source: WHO)",
  "The first tooth is usually a bottom front tooth, appearing around 6 months. (Source: AAP)",
  "Babies need vitamin D supplements if exclusively breastfed. (Source: AAP)",
  "Separation anxiety typically starts around 8 months—it's a sign of healthy attachment. (Source: CDC)",
  "Babies have a rooting reflex that helps them find the breast for feeding. (Source: WHO)",
  "By 12 months, most babies can understand 50+ words but only say a few. (Source: CDC)",
  "Iron-fortified cereals or iron-rich foods are important starting at 6 months. (Source: AAP)",
  "Babies learn object permanence around 8 months—realizing things exist even when hidden. (Source: Developmental Psychology)",
  "Taking care of yourself helps you take care of your baby better. Parental self-care matters. (Source: WHO)",
  "Every baby develops at their own pace. Milestones are guidelines, not rigid rules. (Source: CDC)",
  "Responsive feeding—watching baby's hunger cues—is better than scheduled feeding. (Source: AAP)",
  "Back sleeping reduces SIDS risk by 50%. Always place baby on back to sleep. (Source: AAP)",
  "Babies need 14-17 hours of sleep per day in the first 3 months. (Source: Sleep Foundation)",
  "The 'fourth trimester' (0-3 months) is an adjustment period for both baby and parents. (Source: Pediatric Research)",
  "Swaddling can help newborns sleep but should stop when they start rolling. (Source: AAP)",
  "Babies can see color by 3 months but prefer bold, contrasting patterns. (Source: AAP)",
  "A baby's gut microbiome is established in the first 1,000 days of life. (Source: WHO)",
  "Crying is a baby's primary communication tool—they're not trying to manipulate you. (Source: AAP)",
  "The 5 S's (swaddle, side, shush, swing, suck) can calm a crying baby. (Source: Dr. Harvey Karp/AAP)",
  "Breastfed babies' poop can change color and consistency often—it's usually normal. (Source: AAP)",
  "Baby-led weaning allows babies to self-feed starting around 6 months. (Source: WHO)",
  "Babies need tummy time while awake from day one to build strength. (Source: AAP)",
  "The grasp reflex is so strong that newborns can hang from a bar briefly. (Source: Pediatric Research)",
  "Babies prefer looking at human faces over anything else in their environment. (Source: Developmental Research)",
  "Growth spurts often occur around 2-3 weeks, 6 weeks, 3 months, and 6 months. (Source: WHO)",
  "Babies learn through repetition—hearing the same story 100 times helps them learn. (Source: AAP)",
  "Postpartum depression affects 1 in 7 mothers—it's common and treatable. (Source: CDC)",
  "Babies can sense their parent's stress—your calm helps them feel secure. (Source: AAP)",
  "Baby blues affect 80% of mothers in the first 2 weeks—it usually resolves on its own. (Source: WHO)",
  "Pacifier use during sleep may reduce SIDS risk. (Source: AAP)",
  "Babies should have 6-8 wet diapers per day after the first week. (Source: AAP)",
  "The pincer grasp (thumb and finger) develops around 9 months—a major milestone. (Source: CDC)",
  "Babies learn cause and effect through play—dropping toys is learning, not mischief. (Source: AAP)",
  "The 'witching hour' (evening fussiness) is common and usually peaks around 6 weeks. (Source: AAP)",
  "Babies' eyes are usually their final color by 6-9 months. (Source: AAP)",
  "First words typically appear around 12 months, but can range from 10-15 months. (Source: CDC)",
  "Babies can drown in less than 2 inches of water—never leave them alone in a bath. (Source: AAP)",
  "The AAP recommends keeping babies rear-facing in car seats until at least age 2. (Source: AAP)",
  "Babies need fluoride supplements if local water isn't fluoridated, starting at 6 months. (Source: AAP)",
  "Gentle sleep training can begin around 4-6 months when babies can self-soothe. (Source: Sleep Foundation)",
  "Babies learn emotional regulation by watching their parents manage emotions. (Source: AAP)",
  "The startle reflex usually disappears by 4-6 months. (Source: AAP)",
  "Babies prefer their mother's heartbeat—it's familiar and comforting from the womb. (Source: WHO)",
  "Hand-eye coordination develops around 4 months when babies start reaching for objects. (Source: CDC)",
  "Babies can recognize themselves in a mirror around 18 months. (Source: Developmental Psychology)",
  "The AAP recommends limiting screen time to zero for babies under 18 months. (Source: AAP)",
  "Babies need practice with lumpy foods by 9-10 months to develop chewing skills. (Source: WHO)",
  "Stranger anxiety typically emerges around 8 months—it's a normal developmental phase. (Source: CDC)",
  "Babies can identify their name being called around 6-7 months. (Source: CDC)",
  "The babbling stage (around 6-9 months) is practice for real speech. (Source: AAP)",
  "Babies learn about 10 new words per day between 18 months and 2 years. (Source: Language Research)",
  "Co-regulation (calming baby through your calm presence) teaches self-regulation. (Source: AAP)",
  "Babies explore objects with their mouth—it's sensory learning, not just teething. (Source: AAP)",
  "The 'mama' and 'dada' stage around 9-12 months is about sound play, not naming yet. (Source: CDC)",
  "Babies need exposure to 30 million words by age 3 for optimal language development. (Source: Research)",
  "Sleep regressions often occur at 4, 8, 12, and 18 months due to developmental leaps. (Source: Sleep Foundation)",
  "Babies can follow simple commands like 'wave bye-bye' around 10-12 months. (Source: CDC)",
  "The average baby takes their first steps between 9-15 months. (Source: CDC)",
  "Babies need opportunities to practice new skills repeatedly to master them. (Source: AAP)",
  "Childproofing should begin before baby becomes mobile, around 6-8 months. (Source: AAP)",
  "Babies test boundaries—consistency in responses helps them learn rules. (Source: AAP)",
  "The terrible twos actually start around 18 months as independence emerges. (Source: CDC)",
  "Babies learn empathy by observing how parents respond to others' emotions. (Source: Research)",
  "Attachment parenting (responsive, nurturing care) builds secure attachment. (Source: WHO)",
  "Babies benefit from routine but need flexibility—balance structure with baby's needs. (Source: AAP)",
  "Parallel play (playing alongside but not with others) is normal until about age 2. (Source: CDC)",
  "Babies need safe spaces to explore and make mistakes—that's how they learn. (Source: AAP)",
  "Sign language can help pre-verbal babies communicate, reducing frustration. (Source: Research)",
  "Babies thrive on predictable caregivers—consistency builds security. (Source: WHO)",
  "The quality of parent-child interaction matters more than quantity of time. (Source: Harvard CDC)",
  "Babies need exposure to diverse foods by 12 months to accept variety later. (Source: WHO)",
  "Positive reinforcement is more effective than punishment for babies and toddlers. (Source: AAP)",
  "Babies learn by imitation—they watch and copy everything you do. (Source: CDC)",
  "Outdoor time benefits baby's vitamin D, circadian rhythm, and sensory development. (Source: AAP)",
  "Babies need to hear 'no' sparingly—redirect and distract instead when possible. (Source: AAP)",
  "The first year lays the foundation for lifelong learning, health, and relationships. (Source: WHO)",
  "Responsive parenting (meeting baby's needs promptly) doesn't spoil them. (Source: AAP)",
  "Babies need opportunities for unstructured free play every day. (Source: AAP)",
  "Narrating your day to baby ('Now we're changing your diaper') builds vocabulary. (Source: AAP)",
  "Babies learn emotional vocabulary when you name their feelings ('You're frustrated'). (Source: Research)",
  "Musical play (singing, instruments) supports cognitive and emotional development. (Source: AAP)",
  "Babies need chances to problem-solve—don't rush to solve everything for them. (Source: AAP)",
  "Messy play (finger painting, sensory bins) is crucial for sensory development. (Source: AAP)",
  "Babies learn social skills through parent interaction first, then with peers. (Source: CDC)",
  "Transitional objects (loveys) provide comfort and security, especially for sleep. (Source: AAP)",
  "Babies need to experience safe struggles—overprotecting limits growth. (Source: Research)",
  "Reading the same book repeatedly helps babies predict and learn patterns. (Source: AAP)",
  "Babies benefit from hearing multiple languages from birth—it doesn't confuse them. (Source: Research)",
  "Physical affection (hugs, kisses) releases oxytocin and supports brain development. (Source: Research)",
  "Babies learn trust when their needs are consistently met in the first year. (Source: Erikson/AAP)",
  "Dance and movement with your baby build coordination and bonding. (Source: AAP)",
  "Babies need 'serve and return' interactions—respond when they reach out. (Source: Harvard CDC)",
  "Gentle discipline focuses on teaching, not punishing babies. (Source: AAP)",
  "Babies learn from natural consequences within safe limits. (Source: AAP)",
  "Comparing your baby to others doesn't help—every child develops uniquely. (Source: CDC)",
  "Babies need exposure to nature—it reduces stress and supports development. (Source: Research)",
  "The first relationship (with primary caregiver) shapes all future relationships. (Source: Attachment Research)",
  "Babies need both stimulation and downtime—watch for overstimulation cues. (Source: AAP)",
  "Your baby's personality emerges in the first year—temperament is partly innate. (Source: Research)",
  "Babies need you to take care of yourself—parental burnout affects them too. (Source: WHO)",
  "Building a support network helps you be a better parent. (Source: WHO)",
  "Asking for help is a sign of strength, not weakness, in parenting. (Source: CDC)",
  "Perfect parenting doesn't exist—'good enough' parenting is what babies need. (Source: Winnicott/AAP)",
  "Babies are resilient—one bad day doesn't undo months of good parenting. (Source: AAP)",
  "Parental intuition is real—trust your instincts about your baby. (Source: Research)",
  "Babies need you at your best—prioritize sleep when possible. (Source: Sleep Foundation)",
  "The days are long but the years are short—this phase is temporary. (Source: Parenting Wisdom)",
  "Celebrating small wins helps combat parental fatigue and stress. (Source: Mental Health Research)",
  "Babies don't need perfection—they need presence, patience, and love. (Source: AAP)",
  "Your mental health is as important as your baby's—seek help if needed. (Source: WHO)",
  "Building traditions and rituals creates security for babies. (Source: Research)",
  "Babies need a 'village'—accept help from trusted family and friends. (Source: WHO)",
  "Parenting styles vary across cultures—find what works for your family. (Source: WHO)",
  "Babies benefit when parents model healthy relationships and communication. (Source: AAP)",
  "You're doing better than you think—trust the process. (Source: Parenting Wisdom)",
  "Babies need boundaries and love in equal measure. (Source: AAP)",
  "The investment you make in the first year pays dividends for a lifetime. (Source: WHO)",
  "Every baby is different—what worked for your friend might not work for you. (Source: AAP)",
  "Babies need consistency across caregivers for security and learning. (Source: AAP)",
  "You're not alone—millions of parents are navigating these same challenges. (Source: WHO)",
  "Forgive yourself for mistakes—parenting is learning by doing. (Source: Mental Health Research)",
  "Babies need predictability in their day but flexibility in how you achieve it. (Source: AAP)",
  "The relationship with your co-parent matters—babies sense conflict. (Source: Research)",
  "Taking breaks from your baby doesn't make you a bad parent. (Source: WHO)",
  "Babies need to see you make mistakes and recover—it teaches resilience. (Source: Research)",
  "Your baby doesn't need the latest gadgets—your attention is the best toy. (Source: AAP)",
  "Parenting is a marathon, not a sprint—pace yourself. (Source: Parenting Wisdom)",
  "Babies need you to model self-compassion and self-care. (Source: Mental Health Research)",
  "The early investment in responsive parenting prevents problems later. (Source: Research)",
  "Your love is enough—you don't need to be perfect. (Source: AAP)",
  "Babies need to feel your calm confidence, even when you're unsure. (Source: AAP)",
  "This too shall pass—phases are temporary, development is ongoing. (Source: Developmental Psychology)",
  "You're the expert on your baby—trust what you know. (Source: Parenting Wisdom)",
  "Babies need caregivers who are 'good enough,' not perfect. (Source: Winnicott)",
  "Celebrating baby's milestones also means celebrating your growth as a parent. (Source: Parenting Wisdom)",
  "The bond with your baby strengthens with time—give yourself grace. (Source: Attachment Research)",
  "Every moment with your baby is shaping their future—and yours. (Source: WHO)",
  "The sleepless nights won't last forever, but the memories will. (Source: Parenting Wisdom)",
  "Your baby is learning from you every day, even when it doesn't feel like it. (Source: AAP)",
  "You're exactly the parent your baby needs. (Source: Parenting Wisdom)",
  "This journey is unique to you and your baby—embrace it. (Source: WHO)",
  "Your baby will remember how you made them feel, not the perfect routine. (Source: Maya Angelou/Parenting)",
  "Tomorrow is a new day to try again—parenting is full of second chances. (Source: Parenting Wisdom)",
  "You're building a human being—that's the most important work there is. (Source: WHO)",
  "The fact that you're seeking information shows you care—that's what matters most. (Source: Parenting Wisdom)",
];

const FloatingSnugBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const showRandomFact = () => {
      const randomFact = PARENTING_FACTS[Math.floor(Math.random() * PARENTING_FACTS.length)];
      setCurrentFact(randomFact);
      setIsVisible(true);
      
      // Random countdown between 30-90 seconds
      const randomCountdown = Math.floor(Math.random() * 61) + 30;
      setCountdown(randomCountdown);
    };

    // Show first fact after 10 seconds
    const initialTimer = setTimeout(showRandomFact, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (countdown > 0 && isVisible) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isVisible) {
      // Hide current fact and schedule next one
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        // Show next fact after 30-90 seconds
        const nextFactDelay = Math.floor(Math.random() * 61000) + 30000;
        setTimeout(() => {
          const randomFact = PARENTING_FACTS[Math.floor(Math.random() * PARENTING_FACTS.length)];
          setCurrentFact(randomFact);
          setIsVisible(true);
          const randomCountdown = Math.floor(Math.random() * 61) + 30;
          setCountdown(randomCountdown);
        }, nextFactDelay);
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [countdown, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-slide-in-right">
      <div className="relative max-w-sm">
        <div className="bg-card border-2 border-primary/20 rounded-2xl shadow-float p-4 pr-12">
          <div className="flex gap-3 items-start">
            <img 
              src={snugMascot} 
              alt="Snug Bear" 
              className="w-12 h-12 object-contain flex-shrink-0 animate-bounce-gentle"
            />
            <div>
              <p className="text-sm leading-relaxed text-foreground">
                {currentFact}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Next tip in {countdown}s
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingSnugBot;
