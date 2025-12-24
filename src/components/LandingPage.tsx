import React, { useState, useEffect, useRef } from 'react';
import { TreePine, Users, Link2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';

interface LandingPageProps {
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreateRoom, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [showJoin, setShowJoin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate elements in
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.landing-element',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15
      }
    );

    // Floating animation for decorative elements
    gsap.to('.float-element', {
      y: -15,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  }, []);

  const handleJoin = () => {
    if (roomCode.trim()) {
      onJoinRoom(roomCode.trim());
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-[15%] left-[10%] text-7xl opacity-25 animate-float" style={{ animationDelay: '0s' }}>🎄</div>
        <div className="float-element absolute top-[25%] right-[15%] text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="float-element absolute bottom-[30%] left-[20%] text-5xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>🎁</div>
        <div className="float-element absolute bottom-[20%] right-[10%] text-6xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>❄️</div>
        <div className="float-element absolute top-[60%] left-[5%] text-4xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🔔</div>
        <div className="float-element absolute top-[40%] right-[25%] text-5xl opacity-15 animate-float" style={{ animationDelay: '2.5s' }}>🎅</div>
        <div className="float-element absolute bottom-[50%] left-[30%] text-4xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>🕯️</div>
        <div className="float-element absolute top-[70%] right-[5%] text-5xl opacity-15 animate-float" style={{ animationDelay: '1.2s' }}>🎀</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo / Icon */}
        <div className="landing-element mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full 
                          bg-secondary/30 border-2 border-secondary/50 glow-premium animate-glow-pulse">
            <TreePine className="w-14 h-14 text-primary drop-shadow-lg" />
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="landing-element text-5xl md:text-7xl font-display font-bold mb-4 text-glow-strong"
          style={{
            background: 'linear-gradient(135deg, hsl(42 100% 65%) 0%, hsl(38 100% 55%) 50%, hsl(42 100% 70%) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Decorate Together
        </h1>

        {/* Subtitle */}
        <p className="landing-element text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Create magical Christmas memories with friends and family. Decorate your tree in real-time,
          together from anywhere in the world.
        </p>

        {/* Actions */}
        <div className="landing-element flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={onCreateRoom}
            size="lg"
            className="w-full sm:w-auto px-10 py-7 text-lg font-semibold rounded-full 
                       bg-gradient-to-br from-primary via-[hsl(38,100%,55%)] to-primary
                       text-primary-foreground shadow-[0_10px_40px_hsl(42_90%_55%/0.5),0_4px_12px_hsl(42_90%_55%/0.4)]
                       hover:shadow-[0_15px_50px_hsl(42_90%_55%/0.6),0_6px_16px_hsl(42_90%_55%/0.5)]
                       hover:scale-110 active:scale-95 transition-all duration-500 
                       border-2 border-[hsl(42,100%,70%)] relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                       before:via-white/20 before:to-transparent before:translate-x-[-200%] 
                       hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            <TreePine className="w-5 h-5 mr-2" />
            Create a Tree
          </Button>

          <Button
            onClick={() => setShowJoin(!showJoin)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-10 py-7 text-lg font-semibold rounded-full 
                       border-2 border-primary/40 bg-card/40 backdrop-blur-xl
                       hover:bg-primary/20 hover:border-primary/60 hover:scale-110 
                       active:scale-95 transition-all duration-500
                       shadow-[0_8px_30px_hsl(220_30%_4%/0.4)]
                       hover:shadow-[0_12px_40px_hsl(42_90%_55%/0.3)]"
          >
            <Users className="w-5 h-5 mr-2" />
            Join a Tree
          </Button>
        </div>

        {/* Join room input */}
        {showJoin && (
          <div className="landing-element glass-premium rounded-3xl p-8 max-w-md mx-auto animate-bounce-in">
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              Enter the room code shared by your friend
            </p>
            <div className="flex gap-3">
              <Input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code..."
                className="text-center text-lg tracking-widest uppercase bg-muted/50 
                           border-primary/30 focus:border-primary/60 transition-colors
                           font-mono font-semibold"
                maxLength={6}
              />
              <Button
                onClick={handleJoin}
                disabled={!roomCode.trim()}
                className="px-8 bg-primary hover:bg-primary/90 font-semibold
                           shadow-lg hover:shadow-xl transition-all"
              >
                Join
              </Button>
            </div>
          </div>
        )}

        {/* Footer hint */}
        <p className="landing-element text-sm text-muted-foreground mt-12">
          ✨ No account needed • Share the magic instantly
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
